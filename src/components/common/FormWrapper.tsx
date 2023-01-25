import { Box, styled } from '@mui/material'
import { FC } from 'react'

interface IFormWrapper {
  children: React.ReactNode
}
const FormWrapper: FC<IFormWrapper> = ({ children }) => {
  const Wrapper = styled(Box)(() => ({
    maxWidth: '400px',
    width: '100%',
    borderRadius: '5px',
    padding: '20px',
    margin: '20px',
    border: '1px solid #e6e6e6'
  }))
  return <Wrapper>{children}</Wrapper>
}

export default FormWrapper
