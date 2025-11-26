'use client';

import { useMemo, useRef } from 'react';

import { BookDemoButton, AuroraBackground } from '@/components/common';

import {
  Document,
  DocumentWithPencil,
  Handshake,
  BagWithDollar,
  CalculatorWithDollar,
  BlockWithSearch,
} from '@/components/icons/homeHero';

import { useBreakpoint, useSvgPathSequencer, useSvgPerimeterMarquee } from '@/hooks';

import configDesktop from '@/data/heroFlow.config.desktop.json';
import configLaptop from '@/data/heroFlow.config.laptop.json';

import './HeroFlow.scss';

export default function HeroFlow() {
  const { isLaptop } = useBreakpoint();

  const cfg = isLaptop ? configLaptop : configDesktop;

  const { scene, style, centerRect, cardSizes, cards } = cfg;

  // ===== Geometry
  const anchor = (r, side) => {
    switch (side) {
      case 'mid-right':
        return { x: r.x + r.w, y: r.y + r.h / 2 };
      case 'mid-left':
        return { x: r.x, y: r.y + r.h / 2 };
      case 'top-mid':
        return { x: r.x + r.w / 2, y: r.y };
      case 'bottom-mid':
        return { x: r.x + r.w / 2, y: r.y + r.h };
      default:
        return { x: r.x, y: r.y };
    }
  };

  const outer = useMemo(() => {
    const m = {};
    cards.forEach(c => {
      cardSizes.forEach(cs => {
        if (c.id === cs.id) {
          m[c.id] = { x: c.x, y: c.y, w: cs.outer.w, h: cs.outer.h };
        }
      });
    });
    return m;
  }, [cards, cardSizes]);

  const center = useMemo(
    () => ({ x: centerRect.x, y: centerRect.y, w: centerRect.width, h: centerRect.height }),
    [centerRect]
  );

  const pathHV = pts => {
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1],
        b = pts[i];
      if (a.x === b.x) d += ` V ${b.y}`;
      else if (a.y === b.y) d += ` H ${b.x}`;
      else d += ` L ${b.x} ${b.y}`;
    }
    return d;
  };

  // ===== OUTER perimeters
  const perimeters = useMemo(
    () =>
      cards.map(c => {
        const cs = cardSizes.find(item => item.id === c.id);
        const { x, y } = c,
          w = cs.outer.w,
          h = cs.outer.h;

        return { id: c.id, d: `M ${x} ${y} H ${x + w} V ${y + h} H ${x} Z` };
      }),
    [cards, cardSizes]
  );

  // ===== Segments (order and geometry)
  const segments = useMemo(() => {
    const c1 = outer['c1_leftTop'];
    const c2 = outer['c2_rightTop'];
    const c3 = outer['c3_rightMid'];
    const c4 = outer['c4_bottomRight'];
    const c5 = outer['c5_bottomLeft'];
    const c6 = outer['c6_leftBottom'];

    const c1_r = anchor(c1, 'mid-right');
    const c1_b = anchor(c1, 'bottom-mid');

    const c2_l = anchor(c2, 'mid-left');
    const c2_b = anchor(c2, 'bottom-mid');

    const c3_t = anchor(c3, 'top-mid');
    const c3_b = anchor(c3, 'bottom-mid');

    const c4_r = anchor(c4, 'mid-right');
    const c4_l = anchor(c4, 'mid-left');

    const c5_r = anchor(c5, 'mid-right');
    const c5_l = anchor(c5, 'mid-left');

    const c6_t = anchor(c6, 'top-mid');
    const c6_b = anchor(c6, 'bottom-mid');

    const centerLeft = { x: center.x, y: c1_r.y };
    const centerRight = { x: center.x + center.w, y: c2_l.y };

    const levelAtC4Right = { x: c3_b.x, y: c4_r.y };
    const levelAtC6Bottom = { x: c6_b.x, y: c5_l.y };

    const mk = (id, a, b) => {
      const axis = Math.abs(a.x - b.x) >= Math.abs(a.y - b.y) ? 'x' : 'y';
      const len = Math.hypot(b.x - a.x, b.y - a.y);
      return { id, d: pathHV([a, b]), axis, p0: a, p1: b, len };
    };

    return [
      mk('s1', c1_r, centerLeft),
      mk('s2', centerRight, c2_l),
      mk('s3', c2_b, c3_t),
      mk('s4a', c3_b, levelAtC4Right),
      mk('s4b', levelAtC4Right, c4_r),
      mk('s5', c4_l, c5_r),
      mk('s6a', c5_l, levelAtC6Bottom),
      mk('s6b', levelAtC6Bottom, c6_b),
      mk('s7', c6_t, c1_b),
    ];
  }, [outer, center]);

  // ====== refss to SVG
  const perimsRef = useRef(null);
  const connsRef = useRef(null);

  // ====== for perimeters
  useSvgPerimeterMarquee(perimsRef.current, {
    visiblePortion: 0.5, // 50% довжини видно
    speedPxPerSec: style.perimeterSpeedPxPerSec ?? 30,
    phaseDesync: 0.8,
  });

  // ====== for connections
  useSvgPathSequencer(
    connsRef.current,
    ['s1', 's2', 's3', 's4a', 's4b', 's5', 's6a', 's6b', 's7'],
    {
      drawMs: style.drawMs ?? 90,
      gapMs: style.gapMs ?? 60,
      hideDelayMs: style.hideDelayMs ?? 80000,
      fadeOutMs: style.fadeOutMs ?? 700,
      drawSpeedPxPerSec: style.drawSpeedPxPerSec ?? 60,
    }
  );

  // ===== Render
  const Card = ({ card, title, icon: Icon }) => {
    const cs = cardSizes.find(item => item.id === card.id);
    const OW = cs.outer.w,
      OH = cs.outer.h;
    const IW = cs.inner.w,
      IH = cs.inner.h;
    const padX = (OW - IW) / 2,
      padY = (OH - IH) / 2;
    return (
      <div className="heroFlow__outer" style={{ left: card.x, top: card.y, width: OW, height: OH }}>
        <div className="heroFlow__inner" style={{ left: padX, top: padY, width: IW, height: IH }}>
          <div className="heroFlow__inner__icon-wrapper">
            <Icon />
          </div>

          {title}
        </div>
      </div>
    );
  };

  return (
    <section className="heroFlow">
      <AuroraBackground>
        <div className="inner-container  heroFlow__gridArea">
          <header className="heroFlow__header">
            <h1 className="heroFlow__title">
              An Aggregated Tool for Your <br /> Insurance and Reinsurance Needs
            </h1>
            <p className="heroFlow__subtitle">
              Connecting cedants and reinsurers across MENA to streamline submissions, reduce <br />
              costs, and optimize access to capacity.
            </p>

            <BookDemoButton />
          </header>

          <div className="heroFlow__stage" style={{ width: scene.width, height: scene.height }}>
            {/* BOTTOM SVG: perimeters under cards*/}
            <svg
              ref={perimsRef}
              className="heroFlow__svgPerims"
              viewBox={`0 0 ${scene.width} ${scene.height}`}
              width={scene.width}
              height={scene.height}
              aria-hidden="true"
            >
              <defs>
                {/* Soft glow for perimeters*/}
                <filter
                  id="mintGlowPerim"
                  x="-60%"
                  y="-60%"
                  width="220%"
                  height="220%"
                  colorInterpolationFilters="sRGB"
                >
                  <feGaussianBlur in="SourceGraphic" stdDeviation="1.6" result="b" />
                  <feColorMatrix
                    in="b"
                    type="matrix"
                    values="
                  1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 0.85 0"
                    result="glow"
                  />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* UA: unique gradient for EACH perimeter (objectBoundingBox), ping-pong */}
                {perimeters.map(p => (
                  <linearGradient
                    key={`gp-${p.id}`}
                    id={`gp-${p.id}`}
                    gradientUnits="objectBoundingBox"
                    x1="0"
                    y1="0.5"
                    x2="1"
                    y2="0.5"
                  >
                    {(style.gradientStops?.length
                      ? style.gradientStops
                      : [
                          { offset: '0%', color: '#1AA47B' },
                          { offset: '45%', color: '#E4FFCE' },
                          { offset: '75%', color: '#3CE661' },
                          { offset: '100%', color: '#1AA47B' },
                        ]
                    ).map((s, i) => (
                      <stop key={i} offset={s.offset} stopColor={s.color} />
                    ))}
                    <animateTransform
                      attributeName="gradientTransform"
                      type="translate"
                      values="-0.35 0; 0.35 0; -0.35 0"
                      keyTimes="0; 0.5; 1"
                      dur="8000ms"
                      repeatCount="indefinite"
                      calcMode="spline"
                      keySplines=".25 .1 .25 1; .25 .1 .25 1"
                    />
                  </linearGradient>
                ))}
              </defs>

              {perimeters.map(p => (
                <path
                  key={p.id}
                  d={p.d}
                  data-perimeter
                  stroke={`url(#gp-${p.id})`} /* own full gradient on EVERY contour */
                  strokeWidth={style.perimeterStrokeWidth}
                  strokeLinecap="round"
                  fill="none"
                  filter="url(#mintGlowPerim)" /* for a soft halo */
                />
              ))}
            </svg>

            {/* MIDDLE LAYER: cards + center */}
            <div className="heroFlow__cardsLayer">
              <Card card={cfg.cards[0]} title="Digital Risk Data Submission" icon={Document} />
              <Card
                card={cfg.cards[5]}
                title="Automated Appetite Matching"
                icon={DocumentWithPencil}
              />
              <Card card={cfg.cards[1]} title="Binding & Document Issuance" icon={Handshake} />
              <Card card={cfg.cards[2]} title="Contract Terms Negotiation" icon={BagWithDollar} />
              <Card
                card={cfg.cards[4]}
                title="Reinsurance Risk Assessment"
                icon={CalculatorWithDollar}
              />
              <Card
                card={cfg.cards[3]}
                title="Reinsurance Capacity Offering"
                icon={BlockWithSearch}
              />
              <div
                className="heroFlow__center"
                style={{
                  left: centerRect.x,
                  top: centerRect.y,
                  width: centerRect.width,
                  height: centerRect.height,
                }}
              >
                <div className="heroFlow__center__image" />
              </div>
            </div>

            {/* TOP LAYER: connection + halo */}
            <svg
              ref={connsRef}
              className="heroFlow__svgConns"
              viewBox={`0 0 ${scene.width} ${scene.height}`}
              width={scene.width}
              height={scene.height}
              aria-hidden="true"
            >
              <defs>
                {segments.map(s => (
                  <linearGradient
                    key={`gc-${s.id}`}
                    id={`gc-${s.id}`}
                    gradientUnits="userSpaceOnUse"
                    x1={s.p0.x}
                    y1={s.p0.y}
                    x2={s.p1.x}
                    y2={s.p1.y} // full gradient exactly along the segment
                  >
                    {(style.gradientStops?.length
                      ? style.gradientStops
                      : [
                          { offset: '0%', color: '#1AA47B' },
                          { offset: '45%', color: '#E4FFCE' },
                          { offset: '75%', color: '#3CE661' },
                          { offset: '100%', color: '#1AA47B' },
                        ]
                    ).map((st, i) => (
                      <stop key={i} offset={st.offset} stopColor={st.color} />
                    ))}

                    {/* Ping-pong displacement along the AXIS of the segment - amplitude from the length of the segment */}
                    <animateTransform
                      attributeName="gradientTransform"
                      type="translate"
                      values={
                        s.axis === 'x'
                          ? `${-s.len * 0.35} 0; ${s.len * 0.35} 0; ${-s.len * 0.35} 0`
                          : `0 ${-s.len * 0.35}; 0 ${s.len * 0.35}; 0 ${-s.len * 0.35}`
                      }
                      keyTimes="0; 0.5; 1"
                      dur={`${style.gradientCycleMs ?? 8000}ms`}
                      repeatCount="indefinite"
                      calcMode="spline"
                      keySplines=".25 .1 .25 1; .25 .1 .25 1"
                    />
                  </linearGradient>
                ))}
              </defs>

              {segments.map(s => (
                <path
                  key={s.id}
                  d={s.d}
                  data-conn={s.id}
                  stroke={`url(#gc-${s.id})`}
                  strokeWidth={style.strokeWidth ?? 1}
                  strokeLinecap="round"
                  strokeLinejoin="miter"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
          </div>
        </div>
      </AuroraBackground>
    </section>
  );
}
