import { CircularProgress, Stack } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'

interface AuthContextValues {
  accessToken: string | null
  authUser: any
  setAuthUser: Function
  setAccessToken: Function
  clearAll: Function
}

export const AuthContext = React.createContext<AuthContextValues>(
  {} as AuthContextValues
)

interface AuthProviderProps {
  children: React.ReactNode
}
const publicRoutes = [
  '/signin',
  '/signup',
  '/reset-password',
  '/verify-email',
  '/forgot-password'
]
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [authUser, setAuthUser] = useState<any>(null)

  useEffect(() => {
    const checkAuth = () => {
      if (
        localStorage.getItem('authUser') &&
        localStorage.getItem('authUser') !== 'undefined'
      ) {
        setAuthUser(JSON.parse(localStorage.getItem('authUser') as string))
      }
      if (
        localStorage.getItem('accessToken') &&
        localStorage.getItem('accessToken') !== 'undefined'
      ) {
        setAccessToken(localStorage.getItem('accessToken'))
      }
    }
    window.addEventListener('storage', checkAuth)
    return () => {
      window.removeEventListener('storage', checkAuth)
    }
  }, [])

  useEffect(() => {
    try {
      if (
        !accessToken &&
        publicRoutes.indexOf(window.location.pathname) === -1
      ) {
        if (
          localStorage.getItem('authUser') &&
          localStorage.getItem('authUser') !== 'undefined'
        ) {
          setAuthUser(JSON.parse(localStorage.getItem('authUser') as string))
        }
        if (
          localStorage.getItem('accessToken') &&
          localStorage.getItem('accessToken') !== 'undefined'
        ) {
          setAccessToken(localStorage.getItem('accessToken'))
        } else {
          clearAll()
          window.location.replace('/signin')
        }
      }
      if (publicRoutes.indexOf(window.location.pathname) !== -1) {
        if (
          accessToken ||
          (localStorage.getItem('accessToken') &&
            localStorage.getItem('accessToken') !== 'undefined')
        ) {
          window.location.replace('/dashboard')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }, [accessToken])

  const clearAll = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('authUser')
    }
    setAccessToken(null)
    setAuthUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        authUser,
        setAuthUser,
        setAccessToken,
        clearAll
      }}
    >
      {!accessToken &&
      publicRoutes.indexOf(window.location.pathname) !== -1 &&
      !localStorage.getItem('accessToken') ? (
        children
      ) : accessToken &&
        publicRoutes.indexOf(window.location.pathname) === -1 ? (
        children
      ) : (
        <Stack
          display='flex'
          direction='column'
          alignItems='center'
          justifyContent='center'
          style={{ minHeight: '100vh' }}
        >
          <CircularProgress size='2rem' />
        </Stack>
      )}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
