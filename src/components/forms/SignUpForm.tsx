import { CognitoUser } from '@aws-amplify/auth'
import { Button, TextField, Typography } from '@mui/material'
import { Form, Formik, FormikHelpers } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { signUp } from '../../Auth'
import { ISignUpFormValues } from '../../interfaces/ISignUpFormValues'
import { saveInLocalStorage } from '../../utils'
import { LS_EMAIL } from '../../utils/constants'
import FormWrapper from '../common/FormWrapper'

const SignUpForm = () => {
  const navigate = useNavigate()

  const initialValues: ISignUpFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const validationSchema = yup.object().shape({
    firstName: yup.string().min(2).required('Required'),
    lastName: yup.string().min(2).required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Required')
  })

  const onSubmit = (
    values: ISignUpFormValues,
    actions: FormikHelpers<ISignUpFormValues>
  ) => {
    handleCreateUser(values, actions)
  }

  const handleCreateUser = async (
    values: ISignUpFormValues,
    actions: FormikHelpers<ISignUpFormValues>
  ) => {
    try {
      const user: CognitoUser = await signUp(values)
      saveInLocalStorage(LS_EMAIL, user.getUsername())
      actions.setSubmitting(false)
      navigate('/verify-email')
    } catch (error: any) {
      actions.setSubmitting(false)
      console.log(error)
    }
  }

  const handleSignInClick = () => {
    navigate('/signin')
  }
  return (
    <FormWrapper>
      <Typography
        variant='h5'
        mb={1}
        textAlign='center'
      >
        Sign Up
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
                label='First Name'
                size='medium'
                name='firstName'
                sx={{
                  border: '1px solid #FFF',
                  borderRadius: 1,
                  width: '100%',
                  mt: '12px'
                }}
                autoComplete='off'
                type='text'
                placeholder='First Name'
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              <TextField
                label='Last Name'
                size='medium'
                name='lastName'
                sx={{
                  border: '1px solid #FFF',
                  borderRadius: 1,
                  width: '100%',
                  mt: '12px'
                }}
                autoComplete='off'
                type='text'
                placeholder='Last Name'
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
              <TextField
                label='Email'
                size='medium'
                name='email'
                sx={{
                  border: '1px solid #FFF',
                  borderRadius: 1,
                  width: '100%',
                  mt: '12px'
                }}
                autoComplete='off'
                type='text'
                placeholder='Email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextField
                label='Password'
                size='medium'
                name='password'
                sx={{
                  border: '1px solid #FFF',
                  borderRadius: 1,
                  width: '100%',
                  mt: '12px'
                }}
                autoComplete='off'
                type='password'
                placeholder='Password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
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
              <Typography
                textAlign='center'
                mt={2}
              >
                Already have an account?
                <Typography
                  ml={1}
                  color='primary'
                  display='inline-block'
                  onClick={handleSignInClick}
                  sx={{ cursor: 'pointer' }}
                >
                  Sign In
                </Typography>
              </Typography>
            </Form>
          )
        }}
      </Formik>
    </FormWrapper>
  )
}

export default SignUpForm
