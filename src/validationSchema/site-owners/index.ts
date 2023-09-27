import * as yup from 'yup';

export const siteOwnerValidationSchema = yup.object().shape({
  site_name: yup.string().nullable(),
  site_description: yup.string().nullable(),
  last_login: yup.date().nullable(),
  user_id: yup.string().nullable().required(),
});
