import React, { useState } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

interface Password {
  _id?: string,
  username?: string,
  for?: string,
  password?: string
}

const PasswordItem = ({ password, setPasswords, index }: { password: Password, setPasswords: React.Dispatch<React.SetStateAction<Password[]>>, index: number } ) => {
  let [showPassword, setShowPassword] = useState<boolean>(false)

  let toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  let copyPassword = () => {
    navigator.clipboard.writeText(password.password || '')
  }

  let deletePassword = async () => {
    let response = await fetch(`http://127.0.0.1:8000/passwords/delete/${password._id}`, { method: 'DELETE' })
    let data = await response.json()

    if(data.msg === 'success') {
      setPasswords(passwords => [
        ...passwords.slice(0, index),
        ...passwords.slice(index + 1, passwords.length)
      ])
    }
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
      <Tooltip title='delete password'>
        <IconButton size='small' onClick={deletePassword} sx={{ '&:hover': { backgroundColor: 'rgba(79, 255, 150, 0.4)' } }}>
          <DeleteOutlineIcon />
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default PasswordItem