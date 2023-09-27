import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getSiteOwnerById, updateSiteOwnerById } from 'apiSdk/site-owners';
import { siteOwnerValidationSchema } from 'validationSchema/site-owners';
import { SiteOwnerInterface } from 'interfaces/site-owner';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function SiteOwnerEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<SiteOwnerInterface>(
    () => (id ? `/site-owners/${id}` : null),
    () => getSiteOwnerById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: SiteOwnerInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateSiteOwnerById(id, values);
      mutate(updated);
      resetForm();
      router.push('/site-owners');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<SiteOwnerInterface>({
    initialValues: data,
    validationSchema: siteOwnerValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Site Owners',
              link: '/site-owners',
            },
            {
              label: 'Update Site Owner',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Site Owner
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.site_name}
            label={'Site Name'}
            props={{
              name: 'site_name',
              placeholder: 'Site Name',
              value: formik.values?.site_name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.site_description}
            label={'Site Description'}
            props={{
              name: 'site_description',
              placeholder: 'Site Description',
              value: formik.values?.site_description,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="last_login" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Last Login
            </FormLabel>
            <DatePicker
              selected={formik.values?.last_login ? new Date(formik.values?.last_login) : null}
              onChange={(value: Date) => formik.setFieldValue('last_login', value)}
            />
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/site-owners')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'site_owner',
    operation: AccessOperationEnum.UPDATE,
  }),
)(SiteOwnerEditPage);
