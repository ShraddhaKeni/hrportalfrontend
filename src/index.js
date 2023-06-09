import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import { AuthProvider } from './pages/Helper/AuthProvider';
import axios from 'axios';
axios.defaults.baseURL = 'http://hr-portal.axzora.in:3000'
ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path='/*' element={<App />}></Route>
      </Routes>
    </AuthProvider>
   
  </BrowserRouter>,
  document.getElementById('root')
);