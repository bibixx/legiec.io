export const SLUG_ALLOWED_CHARACTERS = 'a-zA-Z0-9-._';
export const isValidSlug = (slug: string) =>
  new RegExp(`^[${SLUG_ALLOWED_CHARACTERS}]+$`).test(slug);
