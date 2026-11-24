/* Number formatting shared by Astro (build) and the browser: separators come from the dictionary (t.number). */
export function formatNumber(value, { group, decimal }, decimals = 0) {
  const [whole, fraction] = value.toFixed(decimals).split('.');
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, group);
  return fraction ? `${grouped}${decimal}${fraction}` : grouped;
}
