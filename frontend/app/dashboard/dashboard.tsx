// 'use client'

// import { useEffect, useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import type { AppDispatch, RootState } from '../redux/store'
// import { fetchProfile, handleseesionId, handleseesionIdNull, logout } from '../redux/slice/authSlice'
// import { useRouter } from 'next/navigation'
// import { io, Socket } from 'socket.io-client'

// let socket: Socket

// function Dashboard() {
//     const { currentUser, isLoggedIn ,sessionid } = useSelector(
//     (state: RootState) => state.auth
//   )
//   const dispatch = useDispatch<AppDispatch>()
//   const router = useRouter()
  
//   const socketRef = useRef<Socket>()
//   const [code, setCode] = useState('')

//   const [showCodeInput, setShowCodeInput] = useState(false)
//   const [info, setInfo] = useState('')

//   useEffect(() => {
//     dispatch(fetchProfile())
//   }, [dispatch])

//   useEffect(() => {
//     if (!isLoggedIn || !currentUser) {
//       if (socketRef.current) {
//         socketRef.current.disconnect()
//         dispatch(handleseesionIdNull())
//       }
//       return
//     } 

//     if (isLoggedIn && currentUser && !socketRef.current) {
//         socketRef.current = io('http://localhost:3002')
        
//         socketRef.current.emit('login', currentUser?.id)

//         socketRef.current.on('login_success', (id) => {
//           setInfo('Logged in successfully')
//           dispatch(handleseesionId(id))
//           setShowCodeInput(false)
//         })

//         socketRef.current.on('login_blocked', () => {
//           setInfo('Already logged in on 2 devices. Enter takeover code.')
//           setShowCodeInput(true)
//         })

//         socketRef.current.on('force_logout', () => {
//           dispatch(logout())
//           socketRef.current?.disconnect()
//           socketRef.current = undefined // Reset ref
//           router.push('/auth/login')
//         })
//     }

//     return () => {
//       socketRef.current?.disconnect()
//       socketRef.current = undefined
//     }

//   }, [isLoggedIn, currentUser, dispatch, router])
  
//   // const { currentUser, isLoggedIn ,sessionid } = useSelector(
//   //   (state: RootState) => state.auth
//   // )
//   // console.log("current user is ",currentUser)

//   // const dispatch = useDispatch<AppDispatch>()
//   // const router = useRouter()

//   // const [code, setCode] = useState('')
//   // const [showCodeInput, setShowCodeInput] = useState(false)
//   // const [info, setInfo] = useState('')

//   // useEffect(() => {
//   //   dispatch(fetchProfile())
//   // }, [])

//   // useEffect(() => {
//   //   if (!isLoggedIn || !currentUser) {
//   //     return () => {
//   //     dispatch(handleseesionIdNull())
//   //     socket.disconnect()
//   //   }
//   //   } 
//   //   if (isLoggedIn && currentUser) {
//   //     if (!sessionid){
//   //       socket = io('http://localhost:3002')
//   //   console.log(currentUser?.id)

//   //   socket.emit('login', currentUser?.id)

//   //   socket.on('login_success', (sessionid) => {
//   //     setInfo('Logged in successfully')
//   //     dispatch(handleseesionId(sessionid))
//   //     setShowCodeInput(false)
//   //   })

//   //   socket.on('login_blocked', () => {
//   //     setInfo('Already logged in on 2 devices. Enter takeover code.')
//   //     setShowCodeInput(true)
//   //   })

//   //   socket.on('takeover_requested', (data) => {
//   //     setInfo(`Takeover code: ${data.code}`)
//   //   })

//   //   socket.on('force_logout', () => {
//   //     dispatch(logout())
//   //     socket.disconnect()
//   //     router.push('/auth/login')
//   //   })

//   //     }

//   //   }

//   // }, [isLoggedIn, currentUser])

//   const submitCode = () => {
//     console.log(code)
//     socket.emit('submit_code', {
//       userId: currentUser?.id,
//       code,
//     })
//   }

//   if (!isLoggedIn || !currentUser) {
//     return (
//       <div style={{ padding: '2rem' }}>
//         <h2>You are not logged in</h2>
//       </div>
//     )
//   }

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h1>Dashboard</h1>


//       <div style={{ marginTop: '1rem' }}>
//         <p>{info}</p>

//         {showCodeInput ? (
//           <>
//             <input
//               placeholder="Enter 4-digit code"
//               value={code}
//               onChange={(e) => setCode(e.target.value)}
//             />
//             <button onClick={submitCode}>Submit Code</button>
//           </>
//         ):(
//           <pre
//           style={{
//           marginTop: '1rem',
//           padding: '1rem',
//           background: '#f5f5f5',
//           borderRadius: '6px',
//           fontSize: '14px',
//         }}
//       >
//         {JSON.stringify(currentUser)}
//       </pre>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Dashboard



// 'use client'
// import { useEffect, useState, useRef } from 'react' 
// import { useSelector, useDispatch } from 'react-redux'
// import type { AppDispatch, RootState } from '../redux/store'
// import { fetchProfile, handleseesionId, handleseesionIdNull, logout } from '../redux/slice/authSlice'
// import { useRouter } from 'next/navigation'
// import { io, Socket } from 'socket.io-client'

// function Dashboard() {
//   const { currentUser, isLoggedIn, sessionid } = useSelector(
//     (state: RootState) => state.auth
//   )
//   const dispatch = useDispatch<AppDispatch>()
//   const router = useRouter()
  
//   const socketRef = useRef<Socket | null>(null)
  
//   const [code, setCode] = useState('')
//   const [showCodeInput, setShowCodeInput] = useState(false)
//   const [info, setInfo] = useState('')

//   useEffect(() => {
//     dispatch(fetchProfile())
//   }, [dispatch])

//   useEffect(() => {
//     if (!isLoggedIn || !currentUser) {
//       if (socketRef.current) {
//         socketRef.current.disconnect()
//         dispatch(handleseesionIdNull())
//         socketRef.current = null
//       }
//       return
//     }

//     if (isLoggedIn && currentUser && !socketRef.current) {
//       const socket = io('http://localhost:3002')
//       socketRef.current = socket

//       socket.emit('login', currentUser?.id)

//       socket.on('login_success', (id) => {
//         setInfo('Logged in successfully')
//         dispatch(handleseesionId(id))
//         setShowCodeInput(false)
//       })

//       socket.on('login_blocked', () => {
//         setInfo('Already logged in on 2 devices. Enter takeover code.')
//         setShowCodeInput(true)
//       })
//       socket.on('takeover_requested', (data) => {
//       setInfo(`Takeover code: ${data.code}`)
//     })

//       socket.on('force_logout', () => {
//         dispatch(logout())
//         socketRef.current?.disconnect()
//         socketRef.current = null
//         router.push('/auth/login')
//       })
//     }

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.disconnect()
//         socketRef.current = null
//       }
//     }
//   }, [isLoggedIn, currentUser, dispatch, router])

//   const submitCode = () => {
//     if (socketRef.current) {
//       socketRef.current.emit('submit_code', { 
//         userId: currentUser?.id, 
//         code 
//       })
//     }
//   }

//   if (!isLoggedIn || !currentUser) {
//     return (
//       <div style={{ padding: '2rem' }}>
//         <h2>You are not logged in</h2>
//       </div>
//     )
//   }

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h1>Dashboard</h1>
//       <div style={{ marginTop: '1rem' }}>
//         <p>{info}</p>
//         {showCodeInput ? (
//           <>
//             <input 
//               placeholder="Enter 4-digit code" 
//               value={code} 
//               onChange={(e) => setCode(e.target.value)} 
//             />
//             <button onClick={submitCode}>Submit Code</button>
//           </>
//         ) : (
//           <pre 
//             style={{ 
//               marginTop: '1rem', 
//               padding: '1rem', 
//               background: '#f5f5f5', 
//               borderRadius: '6px', 
//               fontSize: '14px',
//             }} 
//           >
//             {JSON.stringify(currentUser, null, 2)}
//           </pre>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Dashboard


'use client'

import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { AppDispatch, RootState } from '../redux/store'
import {
  fetchProfile,
  handleseesionId,
  handleseesionIdNull,
  logout,
  handleOtp,
  handleOtpNull
} from '../redux/slice/authSlice'
import { useRouter } from 'next/navigation'
import { io, Socket } from 'socket.io-client'

function Dashboard() {
  const { currentUser, isLoggedIn, sessionid, otp } = useSelector(
    (state: RootState) => state.auth
  )

  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const socketRef = useRef<Socket | null>(null)

  const [code, setCode] = useState('')
  const [showCodeInput, setShowCodeInput] = useState(false)
  const [info, setInfo] = useState('')

  useEffect(() => {
    dispatch(fetchProfile())
  }, [dispatch])

  useEffect(() => {
    if (!isLoggedIn || !currentUser) {
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
      }
      dispatch(handleseesionIdNull())
      dispatch(handleOtpNull())
      return
    }

    if (isLoggedIn && currentUser && !socketRef.current) {
      const socket = io('http://localhost:3002')
      socketRef.current = socket

      socket.emit('login', {
        userId: currentUser.id,
        sessionid: sessionid
      })

      socket.on('login_success', (data) => {
        setInfo('Logged in successfully')
        dispatch(handleseesionId(data.sessionid))
        dispatch(handleOtp(data.otp))
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
        socketRef.current?.disconnect()
        socketRef.current = null
        router.push('/auth/login')
      })
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
      }
    }
  }, [isLoggedIn, currentUser, sessionid, dispatch, router])

  const submitCode = () => {
    if (socketRef.current) {
      socketRef.current.emit('submit_code', {
        userId: currentUser?.id,
        code,
      })
    }
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

      <div style={{ marginTop: '1rem' }}>
        <p>{info}</p>

        {showCodeInput ? (
          <>
            <input
              placeholder="Enter 4-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={submitCode}>Submit Code</button>
          </>
        ) : (
          <>
            <h3>Session Info</h3>
            <p><b>Session ID:</b> {sessionid}</p>
            <p><b>OTP:</b> {otp}</p>

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
          </>
        )}
      </div>
    </div>
  )
}

export default Dashboard
