import { RedirectType, permanentRedirect } from "next/navigation";
import { LinkService } from "@/services/LinkService";
import { MatomoService } from "@/services/MatomoService";
import { unstable_after as after } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  const linksService = new LinkService();
  const dataForSlug = await linksService.getLink(slug);

  if (dataForSlug != null && dataForSlug.active) {
    after(async () => {
      const matomoService = new MatomoService(request);
      await matomoService.trackSlug(slug, {
        found: true,
        destination: dataForSlug.url,
      });
    });

    permanentRedirect(dataForSlug.url, RedirectType.replace);
    return;
  }

  after(async () => {
    const matomoService = new MatomoService(request);
    matomoService.trackSlug(slug, { found: false });
  });

  return new Response("Not found", {
    status: 404,
  });
}

export const runtime = "edge";
