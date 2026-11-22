import { FORMS } from "./formSpecs";

export function searchForms(query, limit = 8) {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];

  return FORMS
    .map((form) => {
      const name = form.name.toLowerCase();
      const aliases = form.aliases.map((alias) => alias.toLowerCase());
      const category = form.category.toLowerCase();
      let score = 0;

      if (name === needle) score = 1000;
      else if (aliases.includes(needle)) score = 900;
      else if (name.includes(needle)) score = 700;
      else if (aliases.some((alias) => alias.includes(needle))) score = 600;
      else if (category.includes(needle)) score = 300;
      else return null;

      return { ...form, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
    .slice(0, limit);
}
