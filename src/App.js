import React from 'react';
import Roles from './pages/Roles';
import Designation from './pages/Designation';
import Department from './pages/Department';
import Documenttype from './pages/Documenttype';
import Companies from './pages/Companies';
import Countries from './pages/Countries';
import States from './pages/States';
import Cities from './pages/Cities';
import Leveltype from './pages/Leveltype';
import Users from './pages/Users';
import Address from './pages/Address';
import Employees from './pages/Employees';
import Navbar from './components/Navbar';
import './components/App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Test from './pages/Test';

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
          <Route path="/documenttype" element={<Documenttype />}></Route>
          <Route path="/companies" element={<Companies />}></Route>
          <Route path="/countries" element={<Countries />}></Route>
          <Route path="/states" element={<States />}></Route>
          <Route path="/cities" element={<Cities />}></Route>
          <Route path="/leveltype" element={<Leveltype />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/test" element={<Test />}></Route> 
          <Route path="/address" element={<Address />}></Route> 
          <Route path="/employees" element={<Employees />}></Route> 
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