import { RedirectType, permanentRedirect } from "next/navigation";
import { LinkService } from "@/services/LinkService";
// import { MatomoService } from "@/services/MatomoService";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  // const matomoService = new MatomoService(request);

  const linksService = new LinkService();
  const dataForSlug = await linksService.getLink(slug);

  if (dataForSlug != null && dataForSlug.active) {
    // matomoService.trackSlug(slug, {
    //   found: true,
    //   destination: dataForSlug.url,
    // });

    permanentRedirect(dataForSlug.url, RedirectType.replace);
    return;
  }

  // matomoService.trackSlug(slug, { found: false });
  return new Response("Not found", {
    status: 404,
  });
}

export const runtime = "edge";
