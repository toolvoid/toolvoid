// Toggle individual tools without changing their routes or SEO metadata.
export const MAINTENANCE_MODE = {
  hashtag: true,
  story: true,
};

export const isMaintenanceMode = (slug) => Boolean(MAINTENANCE_MODE[slug]);
