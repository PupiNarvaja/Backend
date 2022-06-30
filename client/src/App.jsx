import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {CartContextProvider} from './Contexts/CartContext'
import HomeContainer from "./components/Containers/HomeContainer"
import Home from './components/Home'
import Login from "./components/Login"
import Register from "./components/Register"
import NotFound from "./components/NotFound"
import Logout from "./components/Logout";
import Cart from "./components/CartContainer/Cart";
import Profile from "./components/Profile";
import Unauthorized from "./components/Unauthorized";
import './App.css'

function App() {
  return (
    <CartContextProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            exact
            element={ <HomeContainer props={ <Home /> } /> }
          />
          <Route
            path='/login'
            exact
            element={ <Login /> }
          />
          <Route
            path='/Register'
            exact
            element={ <HomeContainer props={ <Register /> } /> }
          />
          <Route
            path='/logout'
            exact
            element={ <Logout /> }
          />
          <Route
            path='/cart'
            exact
            element={ <HomeContainer props={ <Cart /> } /> }
          />
          <Route
            path='/profile'
            exact
            element={ <HomeContainer props={ <Profile /> } /> }
          />
          <Route
            path='/unauthorized'
            exact
            element={ <Unauthorized /> }
          />
          <Route
            path='*'
            exact
            element={ <NotFound /> }
          />
        </Routes>
      </BrowserRouter>
    </CartContextProvider>
  )
}

export default App
