import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer';

ReactDOM.render(
  <BrowserRouter>
    <App />
   
  </BrowserRouter>,
  document.getElementById('root')
);