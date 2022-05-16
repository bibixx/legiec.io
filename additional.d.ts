declare module 'is-valid-http-url' {
  const isUrl = (url: string) => boolean;

  export default isUrl;
}

declare module 'matomo-tracker' {
  export default class MatomoTracker {
    constructor(siteId: string, url: string);

    track(options: any): void;
  }
}
