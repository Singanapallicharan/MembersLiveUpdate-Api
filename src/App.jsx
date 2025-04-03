
import './App.css'
import Signup from './Signup'
import Memberadmin from './Memberadmin'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Signup />}/>
      <Route path='/memberadmin' element={<Memberadmin />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
