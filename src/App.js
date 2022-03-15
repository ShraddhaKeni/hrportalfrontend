import React from 'react';
import Roles from './pages/Roles/roles';
import AddRoles from './pages/Roles/addRoles';
import Designation from './pages/Designations/designations';
import AddDesignation from './pages/Designations/addDesignation';
import Department from './pages/Departments/departments';
import AddDepartment from './pages/Departments/addDepartment';
import Documenttype from './pages/Documenttype';
import Companies from './pages/Companies';
import Countries from './pages/Countries';
import States from './pages/States';
import Cities from './pages/Cities';
import Salary from './pages/Salary/addSalary';
import SalaryInfo from './pages/Salary/SalaryData';
import ViewSalary from './pages/Salary/viewSalary';
import Leveltype from './pages/Leveltype';
import Users from './pages/Users';
import Address from './pages/Address';
import Employees from './pages/Employees';
import Navbar from './components/Navbar';
import './components/App.css';
import { Routes, Route } from 'react-router-dom';
import Test from './pages/Test';


function App() {
  return (
      <div className="App">
        <Navbar />
        <Routes>

          {/* home routes */}
          <Route path="/" element={<Home />}></Route>

          {/* routes for designation */}
          <Route path="/designation" element={<Designation />}></Route>
          <Route path="/add-designation" element={<AddDesignation />}></Route>

          {/* routes for roles */}
          <Route path="/roles" element={<Roles />}></Route>
          <Route path="/add-roles" element={<AddRoles />}></Route>

          {/* routes for departments */}
          <Route path="/department" element={<Department />}></Route>
          <Route path="/add-department" element={<AddDepartment />}></Route>


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

          {/* routes for salary */}
          <Route exact path="/add-salary" element={<Salary />}></Route>
          <Route exact path="/salary" element={<ViewSalary />}></Route>
          <Route path="/salary-info/:id" render={(props) => <SalaryInfo {...props} />} element={<SalaryInfo />} /> 

        </Routes>
      </div>
  );
}

const Home = () => (
  <div>
    <h1>Home page</h1>
  </div>
);

export default App;