function stripFromBeginning(part: string) {
  return part.replace(/^\/+/, "");
}
function stripFromEnd(part: string) {
  return part.replace(/\/+$/, "");
}
function stripFromBoth(part: string) {
  return stripFromBeginning(stripFromEnd(part));
}

export function joinPath(...elements: string[]) {
  const preparedElements: string[] = [];
  for (const element of elements) {
    if (element) {
      preparedElements.push(stripFromBoth(element));
    }
  }

  return preparedElements.join("/");
}
