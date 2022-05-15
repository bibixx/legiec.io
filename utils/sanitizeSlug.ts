import { SLUG_ALLOWED_CHARACTERS } from './validators/createUrl.utils';

const ALLOWED_CHARACTERS_REGEX = new RegExp(
  `[^${SLUG_ALLOWED_CHARACTERS}]`,
  'gi',
);

export const sanitizeSlug = (slug: string) => {
  return slug.replace(ALLOWED_CHARACTERS_REGEX, '');
};
