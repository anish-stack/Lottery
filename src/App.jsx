
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
import HowToPlay from './Components/HowtoPlay/HowToPlay'
import Faq from './Components/Faq/Faq'
import Cart from './Components/Cart/Cart'
import Success from './pages/Status/Success'
import Failed from './pages/Status/Failed'
import Profile from './pages/Profile/Profile'
import Games from './Components/Games/Games'
import Draw from './pages/Draw/Draw'
import Winners from './Components/Winner/Winners'

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
    <Route path='/How-To-Play' element={<HowToPlay/>} />
    <Route path='/FAQs' element={<Faq/>} />
    <Route path='/Cart' element={<Cart/>} />
    <Route path='/Profile' element={<Profile/>} />
    <Route path='/Games' element={<Games/>} />
    <Route path='/Draws' element={<>
      <Draw/>
      <Winners/>
    </>} />
    <Route path='/Winners' element={<>
      <Winners/>
      <HowToPlay/>
    </>} />



    <Route path='/Game-Purchase-Success' element={<Success/>} />
    <Route path='/Game-Purchase-Failed' element={<Failed/>} />


    <Route path='/ResetPassword' element={<ResetPassword/>} />
    <Route path='/ResetPasswordOtp/:email/:password' element={<ResetPasswordOtp/>} />


  </Routes>
  <Footer/>
  </BrowserRouter>
  )
}

export default App
