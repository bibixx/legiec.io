import { RedirectType, permanentRedirect } from "next/navigation";
import { LinkService } from "@/services/LinkService";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  const linksService = new LinkService();
  const dataForSlug = await linksService.getLink(slug);

  if (dataForSlug != null && dataForSlug.active) {
    permanentRedirect(dataForSlug.url, RedirectType.replace);
    return;
  }

  return new Response("Not found", {
    status: 404,
  });
}

export const runtime = "edge";
