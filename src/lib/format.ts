const escapeHtml = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        c
      ]!,
  );

/** Superscript isotope mass numbers, e.g. "129Xe" → <sup>129</sup>Xe. */
export const formatTitle = (title: string) =>
  escapeHtml(title).replace(
    /\b(\d{1,3})(Xe|He|F|C|Na|P|H)\b/g,
    '<sup>$1</sup>$2',
  );
