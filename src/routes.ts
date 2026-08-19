export const routes = {
  home: "/",
  cv: "/cv/",
  writing: "/writing/",
  publications: "/publications/",
} as const;

export const mainPageRoutes = [routes.home, routes.cv, routes.writing] as const;

export const writingPath = (id: string) => `${routes.writing}${id}/`;

export const publicationPath = (id: string) => `/publication/${id}/`;
