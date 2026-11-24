const images = import.meta.glob('../../../assets/avatars/*.webp', { eager: true, import: 'default' });

/* The team of the home mockup (t.mockups.coworker) with resolved portrait URLs; lena is its CoWorker. */
export function teamOf(t) {
  const m = t.mockups.coworker;
  const team = m.team.map((member) => ({ ...member, src: images[`../../../assets/avatars/${member.avatar}.webp`].src }));
  return { team, lena: team[m.coworker] };
}
