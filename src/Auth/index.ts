import { Auth } from 'aws-amplify'
import { IChangePassword } from '../interfaces/IChangePassword'
import { IResetPasswordStep2Form } from '../interfaces/IResetPasswordStep2Form'
import { ISignInFormValues } from '../interfaces/ISignInFormValues'
import { ISignUpFormValues } from '../interfaces/ISignUpFormValues'
import { IVerifyEmailValues } from '../interfaces/IVerifyEmailValues'
import { saveInLocalStorage } from '../utils'

export const signUp = async (values: ISignUpFormValues) => {
  const { firstName, lastName, email, password } = values
  try {
    const { user } = await Auth.signUp({
      username: email,
      password,
      attributes: {
        given_name: firstName,
        family_name: lastName
      }
    })
    return user
  } catch (error) {
    throw error
  }
}

export const resendConfirmationCode = async (email: string) => {
  try {
    await Auth.resendSignUp(email)
  } catch (error) {
    throw error
  }
}

export const confirmSignUp = async (values: IVerifyEmailValues) => {
  const { email, code } = values
  try {
    await Auth.confirmSignUp(email, code)
  } catch (error) {
    throw error
  }
}

export const signIn = async (values: ISignInFormValues) => {
  const { email, password } = values
  try {
    const user = await Auth.signIn(email, password)
    saveInLocalStorage(
      'accessToken',
      JSON.stringify(user.signInUserSession.accessToken.jwtToken)
    )
    saveInLocalStorage('authUser', JSON.stringify(user.attributes))
    window.dispatchEvent(new Event('storage'))
    return user
  } catch (error) {
    throw error
  }
}

export const getResetPasswordCodeByEmail = async (email: string) => {
  try {
    await Auth.forgotPassword(email)
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  } catch (error) {
    throw error
  }
}

export const resetPassword = async (values: IResetPasswordStep2Form) => {
  const { email, code, password } = values
  try {
    Auth.forgotPasswordSubmit(email, code, password)
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  } catch (error) {
    throw error
  }
}

export const signout = async () => {
  try {
    await Auth.signOut()
  } catch (error) {
    throw error
  }
}

export const changePassword = async (values: IChangePassword) => {
  const { oldPassword, newPassword } = values
  try {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        return Auth.changePassword(user, oldPassword, newPassword)
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  } catch (error) {
    throw error
  }
}
