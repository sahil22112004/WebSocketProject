'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../redux/store'
import { io, Socket } from 'socket.io-client'
import { apiGetProfile } from '../services/authApi'
import { fetchProfile, logout } from '../redux/slice/authSlice'
import { useRouter } from 'next/navigation'

let socket: Socket

function Dashboard() {
  const { currentUser, isLoggedIn } = useSelector(
    (state: RootState) => state.auth
  )
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const [notifications, setNotifications] = useState<string[]>([])

  useEffect(()=>{
    dispatch(fetchProfile())
  },[])

  useEffect(() => {
    if (!isLoggedIn || !currentUser) return

    socket = io('http://localhost:3002')

    socket.on('user_joined', (data) => {
      setNotifications((prev) => [...prev, data.message])
    })

    socket.on('user_left', (data) => {
      setNotifications((prev) => [...prev, data.message])
    })

    return () => {
      socket.disconnect()
    }
  }, [isLoggedIn, currentUser])

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
        {JSON.stringify(currentUser, null, 2)}
      </pre>

      <div style={{ marginTop: '1rem' }}>
        <h3>Notifications</h3>
        {notifications.map((n, i) => (
          <div key={i}>{n}</div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
