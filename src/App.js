import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './components/App.css';

//Comment

// import Navbar from './components/Navbar';

import Roles from './pages/Roles/roles';
import AddRoles from './pages/Roles/addRoles';

import Designation from './pages/Designations/designations';
import AddDesignation from './pages/Designations/addDesignation';

import Department from './pages/Departments/departments';
import AddDepartment from './pages/Departments/addDepartment';

import Countries from './pages/Countries/countries';
import AddCountries from './pages/Countries/addCountries';

import States from './pages/States/states';
import AddStates from './pages/States/addStates';

import Cities from './pages/Cities/cities';
import AddCities from './pages/Cities/addCities';

import Salary from './pages/Salary/addSalary';
import SalaryInfo from './pages/Salary/SalaryData';
import ViewSalary from './pages/Salary/viewSalary';

import Documenttype from './pages/Document-type/documenttype';
import AddDocumenttype from './pages/Document-type/addDocumenttype'

import Leveltype from './pages/Level-type/leveltype';
import AddLeveltype from './pages/Level-type/addLeveltype';

import Companies from './pages/Companies/companies';
import AddCompanies from './pages/Companies/addCompanies';
import ViewCompanies from './pages/Companies/viewCompany';

import Users from './pages/Users/users';
import AddUsers from './pages/Users/addUsers';

import Employees from './pages/Employees/employees';
import AddEmployees from './pages/Employees/addEmployees';

import Reportingto from './pages/Reporting-to/reportingto';
import AddReportingto from './pages/Reporting-to/addReportingto';


import Footer from './components/Footer';
import Address from './pages/Address';
import Jobs from './pages/Jobs';
import Test from './pages/Test';
import UpdateJobs from './pages/Jobs/UpdateJobs';
import Viewjobs from './pages/Jobs/Viewjobs';
import ViewAddress from './pages/Address/ViewAddress';
import UserDocuments from './pages/User_docs/UserDocuments';
import AddDocuments from './pages/User_docs/AddDocuments';
import UpdateJobApplicants from './pages/Job_Applicants/UpdateJobApplicants';
import AddJobApplicants from './pages/Job_Applicants/AddJobApplicants';
import ViewJobApplicants from './pages/Job_Applicants/ViewJobApplicants';
import ViewApplicationTrack from './pages/Application_track/ViewApplicationTrack';
import AddApplicationTrack from './pages/Application_track/AddApplicationTrack';
import Login from './pages/Login/Login';
import ViewOffboard from './pages/Offboard/ViewOffboard';
import AddOffboard from './pages/Offboard/AddOffboard';
import NavBarNew from './components/NavBarNew';
import Viewhrsupport from './pages/hrsupport/hrsupport';
import Countrystatecity from './components/Countrystatecity';
import Home from './pages/Home/Home';
import { checkAccess, checkCookies } from './pages/Helper/Auth';
import  RequireAuth  from './pages/Helper/RequireAuth';
import ErrorPage from './pages/ErrorPage';
import HRDash from './pages/HR Dash/HRDash';

function App() {



  return (
      <div className="App">
        {/* <Navbar/> */}
        <Routes>

          {/* home routes */}
         
            {/* routes for designation */}
          <Route path="/" element={<Login/>}></Route>


      {/* Admin Routes */}

        <Route element={<RequireAuth allowedRole={[9]}/>}>
          <Route path="/designation" element={<Designation/>}></Route>
          <Route path="/add-designation" element={<AddDesignation />}></Route>
          <Route path="/roles" element={<Roles />}></Route>
          <Route path="/add-roles" element={<AddRoles />}></Route>

          {/* routes for departments */}
          <Route path="/department" element={<Department />}></Route>
          <Route path="/add-department" element={<AddDepartment />}></Route>

          {/* routes for countries */}
          <Route path="/Countrystatecity" element={<Countrystatecity />}></Route>
          <Route path="/add-country" element={<AddCountries />}></Route>

          {/* routes for states */}
          <Route path="/states" element={<States />}></Route>
          <Route path="/add-state" element={<AddStates />}></Route>

          {/* routes for cities */}
          <Route path="/cities" element={<Cities />}></Route>
          <Route path="/add-city" element={<AddCities />}></Route>

          {/* routes for document-type */}
          <Route path="/documenttype" element={<Documenttype />}></Route>
          <Route path="/add-documenttype" element={<AddDocumenttype />}></Route>

          {/* routes for salary */}
       

          {/* routes for level-type */}
          <Route path="/leveltype" element={<Leveltype />}></Route>
          <Route path="/add-leveltype" element={<AddLeveltype />}></Route>
          
          {/* routes for companies */}
          <Route path="/companies" element={<Companies />}></Route> 
          <Route path="/view-companies" element={<ViewCompanies />}></Route>
          <Route path="/add-companies" element={<AddCompanies />}></Route>  

          {/* routes for users */}
          <Route path="/users" element={<Users />}></Route>
          <Route path="/add-users" element={<AddUsers />}></Route>

         

          {/* routes for reporting */}
         
         
        </Route>

          
        <Route path='/error' element={<ErrorPage></ErrorPage>}></Route>

        {/* Common Routes */}
         <Route element={<RequireAuth allowedRole={[10,9]}/>}>
          <Route path="/reporting" element={<Reportingto />}></Route> 
          <Route path="/add-reporting" element={<AddReportingto />}></Route>
          <Route path="/test" element={<Test />}></Route>
          <Route path="/address" element={<Address />}></Route>
          <Route path="/jobs" element={<Jobs />}></Route>
          <Route path="/Updatejobs" element={<UpdateJobs />}></Route>
          <Route path="/viewJobs" element={<Viewjobs />}></Route>
          <Route path="/viewApplicants" element={<ViewJobApplicants/>}></Route>
          <Route path="/addApplicants" element={<AddJobApplicants/>}></Route>
          <Route path="/updateApplicants" element={<UpdateJobApplicants/>}></Route>
          <Route path="/viewApplicationTrack" element={<ViewApplicationTrack/>}></Route>
          <Route path="/addApplicationTrack" element={<AddApplicationTrack/>}></Route>
           {/* routes for employees */}
           <Route path="/employees" element={<Employees />}></Route>
          <Route path="/add-employees" element={<AddEmployees />}></Route>
          <Route exact path="/add-salary" element={<Salary />}></Route>
          <Route exact path="/salary" element={<ViewSalary />}></Route>
          <Route path="/salary-info/:id" render={(props) => <SalaryInfo {...props} />} element={<SalaryInfo />} />
            <Route path="/viewAddress" element={<ViewAddress />}></Route>
            <Route path="/userDocuments" element={<UserDocuments />}></Route>
            <Route path="/addUserDocuments" element={<AddDocuments />}></Route>
            <Route path="/offboard" element={<ViewOffboard/>}></Route>
            <Route path="/addoffboard" element={<AddOffboard/>}></Route>
            <Route path="/hrsupport" element={<Viewhrsupport/>}></Route>


         </Route>

          {/* HR Routes */}
          {/* <Route element={<RequireAuth allowedRole={[10,9]}/>}>  
            <Route path="/jobs" element={<Jobs />}></Route>
            <Route path="/Updatejobs" element={<UpdateJobs />}></Route>
            <Route path="/viewJobs" element={<Viewjobs />}></Route>
            <Route path="/viewApplicants" element={<ViewJobApplicants/>}></Route>
            <Route path="/addApplicants" element={<AddJobApplicants/>}></Route>
            <Route path="/updateApplicants" element={<UpdateJobApplicants/>}></Route>
            <Route path="/viewApplicationTrack" element={<ViewApplicationTrack/>}></Route>
            <Route path="/addApplicationTrack" element={<AddApplicationTrack/>}></Route>
           
          </Route> */}
          
         
          <Route element={<RequireAuth allowedRole={[9]}/>}>  
            <Route path="/adminDash" element={<Home/>}></Route>
          </Route>
          <Route element={<RequireAuth allowedRole={[10]}/>}>  
            <Route path="/hrDash" element={<HRDash/>}></Route>
          </Route>
          <Route element={<RequireAuth allowedRole={[11]}/>}>  
            <Route path="/empDash" element={<Home/>}></Route>
            <Route path="/jobs" element={<Jobs />}></Route>
          </Route>
        </Routes>
        
      </div>
  );
}


export default App;