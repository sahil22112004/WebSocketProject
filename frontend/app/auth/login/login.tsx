'use client'

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as z from 'zod';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux'
import type { AppDispatch, RootState } from '../../redux/store'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth, githubprovider, googleProvider } from '../../firebase/firebase';
import Link from 'next/link'
import './login.css';
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { loginUser, registerUser, fetchProfile } from '../../redux/slice/authSlice';

function Login() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar()
  const [showPassword, setShowPassword] = useState(false);
  const { currentUser, error } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()

  const singupschema = z.object({
    email: z.string().min(1, 'Email is required').email("Invalid email format."),
    password: z.string().trim().min(4, 'Password must be at least 4 characters'),
  });

  type loginInterface = z.infer<typeof singupschema>

  const { control, handleSubmit, formState: { errors } } = useForm<loginInterface>({
    resolver: zodResolver(singupschema),
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (currentUser && !error) {
      router.push('/dashboard')
      enqueueSnackbar("Login Success!", { variant: "success" })
    }

    if (error) {
      signOut(auth)
      enqueueSnackbar(error, { variant: "error" })
    }
  }, [currentUser, error])

  const onSubmit = async (user: loginInterface) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      const User = {
        email: userCredential.user.email,
        password:'dummy'
      };

      await dispatch(loginUser(User));
    } catch (error: any) {
      signOut(auth)
      enqueueSnackbar(error.message, { variant: "error" })
    }
  };

  const googleSign = async () => {
    try {
      const firebaseUser = (await signInWithPopup(auth, googleProvider)).user;

      const payload = {
        username: firebaseUser.displayName,
        email: firebaseUser.email,
      };

      await dispatch(registerUser(payload)).unwrap();
      await dispatch(fetchProfile());
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" })
    }
  };

  const githubSign = async () => {
    try {
      const firebaseUser = (await signInWithPopup(auth, githubprovider)).user;

      const payload = {
        username: firebaseUser.displayName,
        email: firebaseUser.email,
      };

      await dispatch(registerUser(payload)).unwrap();
      await dispatch(fetchProfile());
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" })
    }
  };

  return (
    <div className="login-outer">
      <div className="login-container">
        <div className="login-right">
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Enter Email "
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  className="login-input"
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Enter Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  className="login-input"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(p => !p)}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />

            <Button type="submit" fullWidth className="login-btn">
              Login
            </Button>

            <Typography className="login-or">OR</Typography>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<GoogleIcon />}
              onClick={googleSign}
              className="google-btn"
            >
              Login with Google
            </Button>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<GitHubIcon />}
              onClick={githubSign}
              className="github-btn"
            >
              Login with GitHub
            </Button>

            <Typography className="signup-text">
              New to Stack OverFlow? <Link href="/auth/register">Create an account</Link>
            </Typography>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
