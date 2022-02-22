import React from 'react';
import Roles from './pages/Roles';
import Designation from './pages/Designation';
import Department from './pages/Department';
import Navbar from './components/Navbar';
import './components/App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route> 
        <Route path="/roles" element={<Roles />}></Route>   
        <Route path="/designation" element={<Designation />}></Route>  
        <Route path="/department" element={<Department />}></Route> 
      </Routes>
    </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h1>Home page</h1>
  </div>
);

export default App;