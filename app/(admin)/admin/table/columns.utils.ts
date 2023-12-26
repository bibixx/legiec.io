export function trimHttp(url: string) {
  return url.replace(/^https?:\/\//, "");
}

export function localeCompare(a: string, b: string) {
  return a.localeCompare(b);
}

export function getLocale() {
  return navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language;
}
