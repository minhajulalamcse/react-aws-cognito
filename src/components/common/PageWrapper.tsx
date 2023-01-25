import { Box, styled } from '@mui/material'
import { FC } from 'react'

interface IPageWrapper {
  children: React.ReactNode
}
const PageWrapper: FC<IPageWrapper> = ({ children }) => {
  const Wrapper = styled(Box)(() => ({
    width: '100%',
    height: '100vh',
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }))
  return <Wrapper>{children}</Wrapper>
}

export default PageWrapper
