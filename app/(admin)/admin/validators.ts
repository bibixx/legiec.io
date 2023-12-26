import { z } from "zod";

export const urlValidator = z.string().trim().min(1, "Must not be empty").url();
export const slugValidator = z.string().trim().min(1, "Must not be empty");
export const getSlugValidator = (usedSlugs: string[]) =>
  slugValidator.refine((v) => !usedSlugs.includes(v), {
    message: "Link with specified slug already exists",
  });
export const activeValidator = z.boolean();

export const getLinkDataValidator = (usedSlugs: string[]) =>
  z.object({
    url: urlValidator,
    slug: getSlugValidator(usedSlugs),
    active: activeValidator,
  });
export const updateLinkValidator = z.object({
  slug: z.string(),
  data: getLinkDataValidator([]).partial(),
});
export const createLinkValidator = z.object({
  data: getLinkDataValidator([]),
});
export const deleteLinkValidator = z.object({
  slug: z.string(),
});
export const emptyValidator = z.object({});
