import { createClient } from "@vercel/kv";
import { LinkData } from "types/LinkData";
import { mapAndStripNullable } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { concurrent } from "@/lib/concurrent";
import { UserFacingError } from "@/lib/middlewares";

type InputLinkData = Omit<LinkData, "date">;
interface DBLinkData {
  url: string;
  slug: string;
  active: boolean;
  date: string | null;
}

export class LinkService {
  private client = createClient({
    url: process.env.LINKS_KV_REST_API_URL!,
    token: process.env.LINKS_KV_REST_API_TOKEN!,
  });

  constructor() {}

  private getLinkKey(slug: string) {
    return `linkData_${slug}`;
  }

  private getLinkIndexKey() {
    return "linksIndex";
  }

  private revalidateSlug(slug: string) {
    return revalidatePath("/" + encodeURIComponent(slug));
  }

  public async updateLink(slug: string, data: Partial<InputLinkData>) {
    const link = await this.getLink(slug);
    if (link == null) {
      throw new UserFacingError(
        `Link with specified slug (${slug}) doesn't exist`
      );
    }

    const newLink = { ...link, ...data };
    const newSlug = newLink.slug;

    if (slug === newSlug) {
      await this.client.set<LinkData>(this.getLinkKey(newSlug), newLink);
      this.revalidateSlug(slug);
      return;
    }

    await concurrent({
      deleteLink: this.deleteLink(slug),
      createLink: this.createLink(newLink),
    });
  }

  public async createLink(data: InputLinkData) {
    const link = await this.getLink(data.slug);
    if (link != null) {
      throw new UserFacingError(
        `Link with specified slug (${data.slug}) already exist`
      );
    }

    const newLink: LinkData = { ...data, date: new Date() };
    await this.client.set<LinkData>(this.getLinkKey(data.slug), newLink);
    await this.client.sadd(this.getLinkIndexKey(), data.slug);
    this.revalidateSlug(data.slug);
  }

  public async deleteLink(slug: string) {
    const link = await this.getLink(slug);
    if (link == null) {
      throw new UserFacingError(
        `Link with specified slug (${slug}) doesn't exist`
      );
    }

    await this.client.del(this.getLinkKey(slug));
    await this.client.srem(this.getLinkIndexKey(), slug);
    this.revalidateSlug(slug);
  }

  public getLink(slug: string) {
    return this.client.get<LinkData>(this.getLinkKey(slug));
  }

  public async getAllLinks(): Promise<LinkData[]> {
    const slugs = await this.client.smembers(this.getLinkIndexKey());

    if (slugs == null || slugs.length === 0) {
      return [];
    }

    const dbLinkData = await this.client.mget<(DBLinkData | null)[]>(
      ...slugs.map((s) => this.getLinkKey(s))
    );
    return mapAndStripNullable(dbLinkData, (ld) => {
      if (ld == null) {
        return null;
      }

      return {
        ...ld,
        date: ld.date === null ? null : new Date(ld.date),
      };
    });
  }
}
