/* Anchor id of a team member on the about page (#phil-isenmann); used as the author profile url of articles. */
export const memberId = (name) => name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
