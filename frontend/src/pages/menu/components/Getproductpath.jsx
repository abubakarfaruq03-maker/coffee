

export const getProductPath = (item) => {
  if (!item || !item.title) return "/menu";

  const slug = item.title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") 
    .split(" ")
    .slice(0, 5) 
    .join("-");

  return `/menu/${item.id}/${slug}`;
};
