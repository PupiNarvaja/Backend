import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartContextProvider } from './Contexts/CartContext'
import { ProductContextProvider } from './Contexts/ProductContext'
import HomeContainer from "./components/Containers/HomeContainer"
import Home from './components/Home'
import Login from "./components/Login"
import Register from "./components/Register"
import NotFound from "./components/NotFound"
import Logout from "./components/Logout";
import Cart from "./components/CartContainer/Cart";
import Profile from "./components/Profile";
import Unauthorized from "./components/Unauthorized";
import AdminOrders from "./components/admin/orders";
import AdminUsers from "./components/admin/admin.users/AdminUsers";
import AdminProducts from "./components/admin/admin.products/AdminProducts";
import Order from './components/Order';
import './App.css'

function App() {
  return (
    <CartContextProvider>
    <ProductContextProvider>
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
            element={ <Register /> }
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
            path='/order'
            exact
            element={ <HomeContainer props={ <Order /> } /> }
          />
          <Route
            path='/unauthorized'
            exact
            element={ <HomeContainer props={ <Unauthorized /> } /> }
          />
          <Route
            path='/admin/orders'
            exact
            element={ <HomeContainer props={ <AdminOrders /> } /> }
          />
          <Route
            path='/admin/users'
            exact
            element={ <HomeContainer props={ <AdminUsers /> } /> }
          />
          <Route
            path='/admin/products'
            exact
            element={ <HomeContainer props={ <AdminProducts /> } /> }
          />
          <Route
            path='*'
            exact
            element={ <NotFound /> }
          />
        </Routes>
      </BrowserRouter>
    </ProductContextProvider>
    </CartContextProvider>
  )
}

export default App
