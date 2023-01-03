import { useMemo } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';

const formData = {
  email: '',
  password: ''
}


export const LoginPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth )


  const dispatch = useDispatch();
  const { email, password, OnInputChange } = useForm(formData);


  const isAuthenticating = useMemo( () => status === 'checking', [status] );

  const onSubmit = (event) => {
    event.preventDefault();

    // console.log({ email, password });
    // No es esta la 
    // dispatch( checkingAuthentication() );

    dispatch( startLoginWithEmailPassword({email, password}) )

  }

  const onGoogleSignIn = () => {

    console.log("onGoogleSingIn")
    
    dispatch( startGoogleSignIn() );
  }


  return (

      <AuthLayout title='Login'>
        <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster' >
          <Grid container>

            <Grid item xs={12} sx={{ mt: 2 }} >
              <TextField 
                label="Correo" 
                type="email" 
                placeholder="correo@google.com"
                fullWidth
                name='email'
                value={email}
                onChange={OnInputChange}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder="Contraseña"
                fullWidth
                name='password'
                value={password}
                onChange={OnInputChange}
              />
            </Grid>

            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

              <Grid 
              item 
              xs={12}
              display={ !!errorMessage ? '' : 'none' }
              >
                <Alert severity='error'>{errorMessage}</Alert>  
              </Grid>

              <Grid item xs={12} sm={ 6 }>
                <Button
                  disabled = { isAuthenticating }
                  color='secondary'
                  type="submit" 
                  variant='contained' 
                  fullWidth
                  >
                  Login
                </Button>
              </Grid>

              <Grid item xs={12} sm={ 6 }>
                <Button
                  color='secondary'
                  disabled = { isAuthenticating } 
                  variant='contained' 
                  fullWidth
                  onClick={onGoogleSignIn}
                >
                  <Google/>
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>

            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to="/diario-app/auth/register">
                Crear Cuenta
              </Link>
            </Grid>

          </Grid>
        </form>
      </AuthLayout>


  )
}
