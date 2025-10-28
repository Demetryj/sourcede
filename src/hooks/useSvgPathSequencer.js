'use client';

import { useEffect } from 'react';

/**
 * useSvgPathSequencer
 * Draws a sequence <path data-conn="..."> with dashoffset drawing and smooth fading.
 */
export function useSvgPathSequencer(svgLike, order, timings = {}) {
  useEffect(() => {
    const svgEl =
      svgLike && typeof svgLike === 'object' && 'current' in svgLike ? svgLike.current : svgLike;
    if (!svgEl) return;

    const DRAW_MS = timings.drawMs ?? 1200;
    const GAP_MS = timings.gapMs ?? 120;
    const HIDE_DELAY_MS = timings.hideDelayMs ?? 250;
    const FADE_OUT_MS = timings.fadeOutMs ?? 380;
    const SPEED_PX_S = timings.drawSpeedPxPerSec ?? 60;

    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const nextFrame = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

    const q = id => svgEl.querySelector(`[data-conn="${id}"]`);

    // Starting state: hide all lines without blinking
    svgEl.querySelectorAll('[data-conn]').forEach(el => {
      const len = el.getTotalLength?.() ?? 0;
      if (!el.dataset.stroke) el.dataset.stroke = el.getAttribute('stroke') || '';
      el.style.transition = 'none';
      el.style.opacity = '0';
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
      el.setAttribute('stroke', 'none'); // we remove it so that it does not blink
    });

    const hardHide = el => {
      const len = el.getTotalLength?.() ?? 0;
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
      el.style.opacity = '0';
      el.setAttribute('stroke', 'none');
    };

    const prepareShow = el => {
      const len = el.getTotalLength?.() ?? 0;
      if (el.dataset.stroke) el.setAttribute('stroke', el.dataset.stroke);
      el.style.transition = 'none';
      el.style.opacity = '1';
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
    };

    const tween = (from, to, duration, step) => {
      if (duration <= 0) {
        step(to);
        return () => {};
      }
      const start = performance.now();
      let raf = 0;
      const tick = now => {
        const t = Math.min(1, (now - start) / duration);
        step(from + (to - from) * t);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    };

    const drawOnce = async el => {
      if (el.__hideTimer) {
        clearTimeout(el.__hideTimer);
        el.__hideTimer = null;
      }
      if (el.__cancelDraw) {
        el.__cancelDraw();
        el.__cancelDraw = null;
      }
      if (el.__cancelFade) {
        el.__cancelFade();
        el.__cancelFade = null;
      }

      prepareShow(el);

      const len = el.getTotalLength?.() ?? 0;
      const duration = SPEED_PX_S > 0 ? (len / SPEED_PX_S) * 1000 : DRAW_MS;

      await nextFrame();

      await new Promise(resolve => {
        el.__cancelDraw = tween(len, 0, duration, v => {
          el.style.strokeDashoffset = `${v}`;
        });
        setTimeout(() => {
          el.__cancelDraw = null;
          resolve();
        }, duration);
      });

      el.__hideTimer = setTimeout(
        () => {
          const fadeMs = Math.max(0, FADE_OUT_MS);
          if (fadeMs === 0) {
            hardHide(el);
            el.__hideTimer = null;
            return;
          }
          el.__cancelFade = tween(1, 0, fadeMs, v => {
            el.style.opacity = String(v);
          });
          setTimeout(() => {
            el.__cancelFade = null;
            hardHide(el);
            el.__hideTimer = null;
          }, fadeMs);
        },
        Math.max(0, HIDE_DELAY_MS)
      );
    };

    let stopped = false;
    (async () => {
      while (!stopped) {
        for (const id of order) {
          if (stopped) break;
          const el = q(id);
          if (!el) continue;
          await drawOnce(el);
          await sleep(GAP_MS);
        }
      }
    })();

    return () => {
      stopped = true;
      svgEl.querySelectorAll('[data-conn]').forEach(el => {
        if (el.__hideTimer) {
          clearTimeout(el.__hideTimer);
          el.__hideTimer = null;
        }
        if (el.__cancelDraw) {
          el.__cancelDraw();
          el.__cancelDraw = null;
        }
        if (el.__cancelFade) {
          el.__cancelFade();
          el.__cancelFade = null;
        }
        hardHide(el);
      });
    };
  }, [
    svgLike && typeof svgLike === 'object' && 'current' in svgLike ? svgLike.current : svgLike,
    Array.isArray(order) ? order.join('|') : '',
    timings.drawMs,
    timings.gapMs,
    timings.hideDelayMs,
    timings.fadeOutMs,
    timings.drawSpeedPxPerSec,
  ]);
}
