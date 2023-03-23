import React, { useState } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'

interface Password {
  _id?: string,
  username?: string,
  for?: string,
  password?: string
}

const PasswordItem = ({ password }: { password: Password }) => {
  let [showPassword, setShowPassword] = useState<boolean>(false)

  let toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  let copyPassword = () => {
    navigator.clipboard.writeText(password.password || '')
  }

  return (
    <div className='pass-item'>
      <div className='pass-name'>{password.for}</div>
      <input className='pass-password' type={showPassword ? 'text' : 'password'} value={password.password} readOnly />
      <Tooltip title='show password'>
        <IconButton size='small' onClick={toggleShowPassword} sx={{ '&:hover': { backgroundColor: 'rgba(79, 255, 150, 0.4)' } }}>
          {showPassword ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
        </IconButton>
      </Tooltip>
      <Tooltip title='copy password'>
        <IconButton size='small' onClick={copyPassword} sx={{ '&:hover': { backgroundColor: 'rgba(79, 255, 150, 0.4)' } }}>
          <ContentCopyOutlinedIcon />
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default PasswordItem