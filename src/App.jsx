
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Header from './Components/header/Header'
import Footer from './Components/footer/Footer'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Otp from './pages/Auth/Otp'
import ResetPassword from './pages/Auth/ResetPassword'
import ResetPasswordOtp from './pages/Auth/ResetPasswordOtp'
import Gamesrules from './pages/Policys/Gamesrules'
import Privacy from './pages/Policys/Privacy'
import Term from './pages/Policys/Term'

function App() {

  return (
  <BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/Register' element={<Register/>} />
    <Route path='/Login' element={<Login/>} />
    <Route path='/Otp-Verification' element={<Otp/>} />
    <Route path='/Games-Rules' element={<Gamesrules/>} />
    <Route path='/Privacy' element={<Privacy/>} />
    <Route path='/Term' element={<Term/>} />



    <Route path='/ResetPassword' element={<ResetPassword/>} />
    <Route path='/ResetPasswordOtp/:password/:email' element={<ResetPasswordOtp/>} />


  </Routes>
  <Footer/>
  </BrowserRouter>
  )
}

export default App
