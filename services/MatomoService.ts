import { joinPath } from "@/lib/joinPath";

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL ?? "";
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID ?? "";
const MATOMO_TOKEN = process.env.MATOMO_TOKEN ?? "";

export class MatomoService {
  private trackerUrl: string;
  private siteId: string;
  private token: string;

  constructor(
    private req: Request,
    trackerUrl?: string,
    siteId?: string,
    token?: string
  ) {
    const trackerUrlWithFallback = trackerUrl ?? MATOMO_URL;
    this.siteId = siteId ?? MATOMO_SITE_ID;
    this.token = token ?? MATOMO_TOKEN;

    if (
      !trackerUrlWithFallback.endsWith("matomo.php") &&
      !trackerUrlWithFallback.endsWith("piwik.php")
    ) {
      this.trackerUrl = joinPath(trackerUrlWithFallback, "matomo.php");
    } else {
      this.trackerUrl = trackerUrlWithFallback;
    }
  }

  trackSlug(
    slug: string,
    result: { found: true; destination: string } | { found: false }
  ) {
    const host = this.req.headers.get("x-forwarded-host") ?? "";
    const protocol = this.req.headers.get("x-forwarded-proto");
    const url = joinPath(`${protocol}://` + host, slug);

    const trackOptions = {
      url,
      ua: this.req.headers.get("user-agent"),
      lang: this.req.headers.get("accept-language"),
      cip: this.req.headers.get("x-real-ip"),
      urlref: this.req.headers.get("referer"),
      token_auth: this.token,
      cvar: JSON.stringify({
        notFound: !result.found,
        redirectTo: result.found ? result.destination : undefined,
      }),
    };

    return this.track(trackOptions);
  }

  /**
   * Executes the call to the Matomo tracking API
   *
   * For a list of tracking option parameters see
   * https://developer.matomo.org/api-reference/tracking-api
   *
   * @param {(String|Object)} options URL to track or options (must contain URL as well)
   */
  private track(options: { url: string }) {
    if (!this.trackerUrl) {
      return;
    }

    const target = new URL(this.trackerUrl);
    target.searchParams.set("idsite", this.siteId);
    target.searchParams.set("rec", "1");

    for (const [optionKey, optionValue] of Object.entries(options)) {
      target.searchParams.set(optionKey, optionValue);
    }

    return fetch(target);
  }
}
