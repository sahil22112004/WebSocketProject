'use client'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { AppDispatch, RootState } from '../redux/store'
import { fetchProfile, logout } from '../redux/slice/authSlice'
import { useRouter } from 'next/navigation'
import { io, Socket } from 'socket.io-client'

let socket: Socket

function Dashboard() {
  const { currentUser, isLoggedIn } = useSelector(
    (state: RootState) => state.auth
  )
  console.log("current user is ",currentUser)

  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const [code, setCode] = useState('')
  const [showCodeInput, setShowCodeInput] = useState(false)
  const [info, setInfo] = useState('')

  useEffect(() => {
    dispatch(fetchProfile())
  }, [])

  useEffect(() => {
    if (!isLoggedIn || !currentUser) return

    socket = io('http://localhost:3002')
    console.log(currentUser.id)

    socket.emit('login', currentUser.id)

    socket.on('login_success', () => {
      setInfo('Logged in successfully')
      setShowCodeInput(false)
    })

    socket.on('login_blocked', () => {
      setInfo('Already logged in on 2 devices. Enter takeover code.')
      setShowCodeInput(true)
    })

    socket.on('takeover_requested', (data) => {
      setInfo(`Takeover code: ${data.code}`)
    })

    socket.on('force_logout', () => {
      dispatch(logout())
      socket.disconnect()
      router.push('/auth/login')
    })

    return () => {
      socket.disconnect()
    }
  }, [isLoggedIn, currentUser])

  const submitCode = () => {
    console.log(code)
    socket.emit('submit_code', {
      userId: currentUser?.id,
      code,
    })
  }

  if (!isLoggedIn || !currentUser) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>You are not logged in</h2>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>

      <pre
        style={{
          marginTop: '1rem',
          padding: '1rem',
          background: '#f5f5f5',
          borderRadius: '6px',
          fontSize: '14px',
        }}
      >
        {JSON.stringify(currentUser)}
      </pre>

      <div style={{ marginTop: '1rem' }}>
        <p>{info}</p>

        {showCodeInput && (
          <>
            <input
              placeholder="Enter 4-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={submitCode}>Submit Code</button>
          </>
        )}
      </div>
    </div>
  )
}

export default Dashboard

