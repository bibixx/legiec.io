import { LinkService } from "@/services/LinkService";
import { notFound, permanentRedirect, RedirectType } from "next/navigation";

interface SlugProps {
  params: Promise<{ slug: string }>;
}
export default async function Slug(props: SlugProps) {
  const slug = (await props.params).slug;

  const linksService = new LinkService();
  const dataForSlug = await linksService.getLink(slug);

  if (dataForSlug != null && dataForSlug.active) {
    permanentRedirect(dataForSlug.url, RedirectType.replace);
    return;
  }

  notFound();
}
