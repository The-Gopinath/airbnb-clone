import { Route, Routes } from 'react-router-dom'
import './App.css'
import RegisterPage from './pages/RegisterPage'
import Layout from './Layout'
import Loginpage from './pages/Loginpage'
import axios from 'axios'
import { UserContextProvider } from './Usercontext'
import Account from './pages/Account'
import PlacePage from './pages/PlacePage'
import IndexPage from './pages/IndexPage'
import Singleplace from './pages/Singleplace'
import BookingPage from './pages/BookingPage'

axios.defaults.withCredentials=true;
axios.defaults.baseURL="http://localhost:5000"

function App() {
  return (
      <UserContextProvider>
          <Routes>
            <Route path='/' element={<Layout/>}>
              <Route index element={<IndexPage/>}/>
              <Route path='/register' element={<RegisterPage/>}/>
              <Route path='/login' element={<Loginpage/>}/>
              <Route path='/account/:subpage?' element={<Account/>}/>
              <Route path='/account/places/new' element={<PlacePage/>}/>
              <Route path='/account/places/:id' element={<PlacePage/>}/>
              <Route path='/place/:id' element={<Singleplace/>}/>
            </Route>
          </Routes>
      </UserContextProvider>
  )
}

export default App
