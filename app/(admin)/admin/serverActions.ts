"use server";

import { LinkService } from "@/services/LinkService";
import { revalidatePath } from "next/cache";
import {
  createLinkValidator,
  deleteLinkValidator,
  updateLinkValidator,
} from "./validators";
import { withUserFacingErrorAndValidation } from "@/lib/middlewares";

export const updateLink = withUserFacingErrorAndValidation(
  updateLinkValidator,
  async ({ slug, data }) => {
    const linkService = new LinkService();
    await linkService.updateLink(slug, data);
    revalidatePath("/admin");
  }
);

export const createLink = withUserFacingErrorAndValidation(
  createLinkValidator,
  async ({ data }) => {
    const linkService = new LinkService();
    await linkService.createLink(data);
    revalidatePath("/admin");
  }
);

export const deleteLink = withUserFacingErrorAndValidation(
  deleteLinkValidator,
  async ({ slug }) => {
    const linkService = new LinkService();
    await linkService.deleteLink(slug);
    revalidatePath("/admin");
  }
);
