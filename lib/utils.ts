/** Convert a label to a URL-safe anchor slug */
export function toAnchor(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
