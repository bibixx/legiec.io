declare module "matomo-tracker" {
  export default class MatomoTracker {
    constructor(siteId: string, url: string);

    track(options: any): void;
  }
}
