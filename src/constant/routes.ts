export enum AppRouteName {
  LISTS = 'Lists',
  ITEMS = 'Items',
  CATEGORIES = 'Categories'
}

interface AppRoute {
  title: string;
  name: string;
  path: string;
}

export type AppRoutes = Record<AppRouteName, Omit<AppRoute, 'name'>>;

export const appRoutes: AppRoutes = {
  [AppRouteName.LISTS]: {
    title: 'Shopping lists',
    path: '/lists'
  },
  [AppRouteName.ITEMS]: {
    title: 'Items',
    path: '/items'
  },
  [AppRouteName.CATEGORIES]: {
    title: 'Item categories',
    path: '/categories'
  }
};

const routesByPath: Record<string, AppRoute> = Object.entries(appRoutes).reduce(
  (acc, [name, route]) => ({
    ...acc,
    [route.path]: { ...route, name }
  }),
  {}
);

export function getRouteByPath(path: string) {
  const route = routesByPath[path];

  return route ? route : null;
}
