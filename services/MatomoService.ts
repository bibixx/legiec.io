import { joinPath } from "@/lib/joinPath";
import MatomoTracker from "matomo-tracker";

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL ?? "";
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID ?? "";
const MATOMO_TOKEN = process.env.MATOMO_TOKEN ?? "";

export class MatomoService {
  constructor(private req: Request) {}

  trackSlug(
    slug: string,
    result: { found: true; destination: string } | { found: false }
  ) {
    const matomo = new MatomoTracker(
      MATOMO_SITE_ID,
      joinPath(MATOMO_URL, "matomo.php")
    );

    const host = this.req.headers.get("x-forwarded-host") ?? "";
    const protocol = this.req.headers.get("x-forwarded-proto");
    const url = joinPath(`${protocol}://` + host, slug);

    const trackOptions = {
      url,
      ua: this.req.headers.get("user-agent"),
      lang: this.req.headers.get("accept-language"),
      cip: this.req.headers.get("x-real-ip"),
      urlref: this.req.headers.get("referer"),
      token_auth: MATOMO_TOKEN,
      cvar: JSON.stringify({
        notFound: !result.found,
        redirectTo: result.found ? result.destination : undefined,
      }),
    };

    matomo.track(trackOptions);
  }
}
