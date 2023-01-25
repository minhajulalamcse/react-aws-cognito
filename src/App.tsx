import { Route, Routes } from 'react-router-dom'
import { ChangePasswordForm } from './components'
import { Dashboard } from './container'
import {
  MainPageTemplate,
  ResetPasswordPage,
  SignInPage,
  SignUpPage,
  VerifyEmailPage
} from './pages'

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<MainPageTemplate />}
      >
        <Route
          path='dashboard'
          element={<Dashboard />}
        />
        <Route
          path='change-password'
          element={<ChangePasswordForm />}
        />
      </Route>
      <Route
        path='/signup'
        element={<SignUpPage />}
      />
      <Route
        path='/signin'
        element={<SignInPage />}
      />
      <Route
        path='/verify-email'
        element={<VerifyEmailPage />}
      />
      <Route
        path='/reset-password'
        element={<ResetPasswordPage />}
      />
    </Routes>
  )
}

export default App
