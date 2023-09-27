import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SiteOwnerInterface {
  id?: string;
  user_id: string;
  site_name?: string;
  site_description?: string;
  last_login?: any;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface SiteOwnerGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  site_name?: string;
  site_description?: string;
}
