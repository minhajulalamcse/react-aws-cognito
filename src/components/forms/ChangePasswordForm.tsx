import { Button, TextField, Typography } from '@mui/material'
import { Form, Formik, FormikHelpers } from 'formik'
import * as yup from 'yup'
import { changePassword } from '../../Auth'
import { IChangePassword } from '../../interfaces/IChangePassword'
import FormWrapper from '../common/FormWrapper'

const ChangePasswordForm = () => {
  const initialValues: IChangePassword = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }

  const validationSchema = yup.object().shape({
    oldPassword: yup.string().required('Required'),
    newPassword: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
      .required('Required')
  })

  const onSubmit = (
    values: IChangePassword,
    actions: FormikHelpers<IChangePassword>
  ) => {
    handleChangePassword(values, actions)
    console.log(values)
  }

  const handleChangePassword = async (
    values: IChangePassword,
    actions: FormikHelpers<IChangePassword>
  ) => {
    try {
      await changePassword(values)
      actions.setSubmitting(false)
    } catch (error: any) {
      actions.setSubmitting(false)
      console.log(error)
    }
  }

  return (
    <FormWrapper>
      <Typography
        variant='h5'
        mb={1}
        textAlign='center'
      >
        Change Password
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <TextField
                label='Old Password'
                size='medium'
                name='oldPassword'
                sx={{
                  border: '1px solid #FFF',
                  borderRadius: 1,
                  width: '100%',
                  mt: '12px'
                }}
                autoComplete='off'
                type='password'
                placeholder='Old Password'
                value={formik.values.oldPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.oldPassword &&
                  Boolean(formik.errors.oldPassword)
                }
                helperText={
                  formik.touched.oldPassword && formik.errors.oldPassword
                }
              />

              <TextField
                label='New Password'
                size='medium'
                name='newPassword'
                sx={{
                  border: '1px solid #FFF',
                  borderRadius: 1,
                  width: '100%',
                  mt: '12px'
                }}
                autoComplete='off'
                type='password'
                placeholder='New Password'
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.newPassword &&
                  Boolean(formik.errors.newPassword)
                }
                helperText={
                  formik.touched.newPassword && formik.errors.newPassword
                }
              />

              <TextField
                label='Confirm Password'
                size='medium'
                name='confirmPassword'
                sx={{
                  border: '1px solid #FFF',
                  borderRadius: 1,
                  width: '100%',
                  mt: '12px'
                }}
                autoComplete='off'
                type='password'
                placeholder='Confirm Password'
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />

              <Button
                disabled={!formik.isValid || formik.isSubmitting}
                type='submit'
                variant='contained'
                disableElevation
                fullWidth
                sx={{ mt: '12px' }}
              >
                Submit
              </Button>
            </Form>
          )
        }}
      </Formik>
    </FormWrapper>
  )
}

export default ChangePasswordForm
