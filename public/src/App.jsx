import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./components/Login"
import Register from "./components/Register"
import './App.css'
import Home from './components/Home';

function App() {

  return (
    <BrowserRouter>
      <header className="App-header"></header>
      <Routes>
      <Route
          path='/'
          exact
          element={ <Home /> }
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
