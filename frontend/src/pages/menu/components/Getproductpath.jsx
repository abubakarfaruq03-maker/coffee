// src/utils.js

export const getProductPath = (item) => {
  if (!item || !item.title) return "/menu";

  const slug = item.title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Remove special characters
    .split(" ")
    .slice(0, 5) // Take first 5 words
    .join("-");

  return `/menu/${item.id}/${slug}`;
};
