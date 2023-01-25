import { Typography } from '@mui/material'
import { FC } from 'react'
import { useTimer } from 'react-timer-hook'

interface ITimer {
  setResendCountdownStart: Function
}
const Timer: FC<ITimer> = ({ setResendCountdownStart }) => {
  let expiryTimestamp = new Date()
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 59)

  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    onExpire: () => setResendCountdownStart(false)
  })

  return (
    <Typography
      display='inline-block'
      ml={0.5}
      color='primary'
    >
      {minutes}:{seconds}
    </Typography>
  )
}

export default Timer
