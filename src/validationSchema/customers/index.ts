import * as yup from 'yup';

export const customerValidationSchema = yup.object().shape({
  profile_visibility: yup.string().nullable(),
  profile_status: yup.string().nullable(),
  last_login: yup.date().nullable(),
  user_id: yup.string().nullable().required(),
});
