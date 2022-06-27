import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeContainer from "./components/Containers/HomeContainer"
import Home from './components/Home'
import Login from "./components/Login"
import Register from "./components/Register"
import NotFound from "./components/NotFound"
import Logout from "./components/Logout";
import Cart from "./components/Cart";
import Unauthorized from "./components/Unauthorized";
import './App.css'

function App() {
  return (
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
  )
}

export default App
