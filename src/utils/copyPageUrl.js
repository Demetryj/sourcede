export const copyPageUrl = async () => {
  if (typeof window === 'undefined') return;

  const url = window.location.href;

  try {
    await navigator.clipboard.writeText(url);
    return;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = url;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, ta.value.length);
      document.execCommand('copy');
      document.body.removeChild(ta);
      return;
    } catch {
      //
    }
  }
};
