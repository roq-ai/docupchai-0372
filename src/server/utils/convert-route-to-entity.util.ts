const mapping: Record<string, string> = {
  administrators: 'administrator',
  customers: 'customer',
  'site-owners': 'site_owner',
  teams: 'team',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
