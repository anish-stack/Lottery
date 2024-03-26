
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Header from './Components/header/Header'
import Footer from './Components/footer/Footer'

function App() {

  return (
  <BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/' element={<Home/>} />
  </Routes>
  <Footer/>
  </BrowserRouter>
  )
}

export default App