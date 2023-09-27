interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Site Owner'],
  customerRoles: ['Customer'],
  tenantRoles: ['Site Owner', 'Administrator'],
  tenantName: 'Team',
  applicationName: 'docupchai',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Manage own profile.',
    'Change profile visibility.',
    'Change profile status.',
    'View own login history.',
  ],
  ownerAbilities: [
    'Manage user information',
    'Manage site information',
    'Manage team information',
    'Manage administrator information',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/89a56904-05eb-4b65-ba93-596c13036774',
};
