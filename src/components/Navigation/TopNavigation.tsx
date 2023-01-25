import { Avatar, Box, Popover, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { signout } from '../../Auth'
import { useAuthContext } from '../../contexts/Authcontext'

const TopNavigation = () => {
  const { authUser, clearAll } = useAuthContext()

  const [name, setName] = useState<string>('')
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)

  useEffect(() => {
    setName(`${authUser.given_name} ${authUser.family_name}`)
  }, [authUser])

  const handleNameClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    try {
      await signout()
      clearAll()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Box
      p={3}
      sx={{ borderBottom: '1px solid #e6e6e6' }}
      display='flex'
      alignItems='center'
      justifyContent='flex-end'
    >
      <Box
        component='button'
        sx={{ cursor: 'pointer', border: 'none', background: 'none' }}
        onClick={handleNameClick}
      >
        <Avatar
          alt={name}
          src={name?.substring(0, 1)}
          sx={{ width: 32, height: 32 }}
        />
      </Box>
      <Popover
        sx={{ boxShadow: 'none' }}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Box py={1}>
          <Typography
            variant='subtitle2'
            color='secondary'
            px={2}
            pb={1}
            sx={{ whiteSpace: 'nowrap', borderBottom: '1px solid #e6e6e6' }}
          >
            {name}
          </Typography>
          <Typography
            mx={1}
            px={1}
            mt={1}
            borderRadius={1}
            variant='subtitle1'
            sx={{
              cursor: 'pointer',
              '&:hover': {
                background: '#e6e6e6'
              }
            }}
            onClick={handleLogout}
          >
            Logout
          </Typography>
        </Box>
      </Popover>
    </Box>
  )
}

export default TopNavigation
