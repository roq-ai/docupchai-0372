import queryString from 'query-string';
import { SiteOwnerInterface, SiteOwnerGetQueryInterface } from 'interfaces/site-owner';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSiteOwners = async (
  query?: SiteOwnerGetQueryInterface,
): Promise<PaginatedInterface<SiteOwnerInterface>> => {
  return fetcher('/api/site-owners', {}, query);
};

export const createSiteOwner = async (siteOwner: SiteOwnerInterface) => {
  return fetcher('/api/site-owners', { method: 'POST', body: JSON.stringify(siteOwner) });
};

export const updateSiteOwnerById = async (id: string, siteOwner: SiteOwnerInterface) => {
  return fetcher(`/api/site-owners/${id}`, { method: 'PUT', body: JSON.stringify(siteOwner) });
};

export const getSiteOwnerById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/site-owners/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteSiteOwnerById = async (id: string) => {
  return fetcher(`/api/site-owners/${id}`, { method: 'DELETE' });
};
