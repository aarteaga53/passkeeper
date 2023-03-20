import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import { ThemeProvider, createTheme } from '@mui/material';
import Home from './components/Home';

interface User {
  _id?: string,
  username?: string,
  email?: string,
  password?: string,
  iat?: number
}

function App() {
  let [token, setToken] = useState<string>('')
  let [user, setUser] = useState<User>({})
  let [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const theme = createTheme({
    palette: {
      primary: {
        main: '#ff7d26',
      },
      secondary: {
        main: '#26A8FF'
      }
    },
  })

  useEffect(() => {
    /**
     * keeps user logged in
     */
    let getToken = async () => {
      const data = window.localStorage.getItem('token')
  
      if(data) {
        setToken(JSON.parse(data))
        await getUser(data)
        setIsSignedIn(true)
      }
    }

    let getUser = async (temp: string) => {
      let response = await fetch(`http://127.0.0.1:8000/user`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ token: temp })
      })
  
      let data = await response.json()
      setUser(data)
    }

    let getTheme = () => {
      const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')

      if (darkThemeMq.matches) {
        document.body.className = 'dark-theme'
      } else {
        document.body.className = 'light-theme'
      }
    }

    getToken()
    getTheme()
  }, [token])

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          {isSignedIn ? (<Navbar user={user} setIsSignedIn={setIsSignedIn} />) : null}
          <Routes>
            {isSignedIn ? (<Route path='' element={<Navigate to='/home'></Navigate>}></Route>) : null}
            <Route path='' element={<Landing />}></Route>
            <Route path='auth' element={<Auth setToken={setToken} setUser={setUser} />}></Route>
            <Route path='home' element={<Home user={user} />}></Route>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App;
