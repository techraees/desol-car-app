import slugify from "slugify";

export default function generateUniqueIdentifier(title) {
  return `${slugify(title)}`;
}