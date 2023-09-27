import * as yup from 'yup';

export const administratorValidationSchema = yup.object().shape({
  role_name: yup.string().required(),
  permissions: yup.string().nullable(),
  last_login: yup.date().nullable(),
  user_id: yup.string().nullable().required(),
});
