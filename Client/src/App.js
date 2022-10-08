import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import NewProduct from './pages/NewProduct';
import ProductPage from './pages/ProductPage';

function App() {
  const user = useSelector(state=>state.user)
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route index element={<Home />}/>
        {!user &&
        <>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        </>
        }
        <Route path="/new-product" element={<NewProduct />}/>
        <Route path="/product/:id" element={<ProductPage />}/>


        <Route path="/*" element={<Home />}/>

      </Routes>
    </div>
  );
}

export default App;
