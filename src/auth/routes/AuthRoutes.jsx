import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage, RegisterPage } from '../pages'

export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path='login' element={ <LoginPage /> }/>
        <Route path='register' element={ <RegisterPage /> }/>

        <Route path='/diario-app/*' element={ <Navigate to="/diario-app/auth/login" /> }/>
    </Routes>
  )
}
