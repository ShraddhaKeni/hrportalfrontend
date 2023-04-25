import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Table,Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UpdateJobApplicants from './UpdateJobApplicants'
import './styles/viewJobApplicants.css';
// import {motion} from 'framer-motion'
import Pagination from '../../components/paginate/Pagination';
import Navbar from '../../components/Navbar';

const ViewJobApplicants = () => {
var srno = 1;

const [applicants, setApplicants] = useState([]);
const [jobs , setJobs] = useState([]);
const [isEdit,setIsEdit] = useState(false)
const [editProp, setEditProp] = useState({})
const [change,setChange] = useState(false)
const[currentPage,setCurrentPage] = useState(1)
const[postPerPage] = useState(12);
//functions to fetch data 

const getApplicants = async() =>{

  try {
    const {data} = await axios.get(`http://localhost:3000/job-applicants/findAll`);
    setApplicants(data.data)
  } catch (error) {
    console.log(error)
  }
  
}

const getJobDetails = async() =>{
  try {
    const {data} = await axios.get(`http://localhost:3000/jobs/findAll`)
    setJobs(data.data)
  } 
  catch (error) {
    console.log(error)
  }
}

function getJobName (id){
  try {
    const jobArray = jobs.find(x=>x.id==id)
    if(jobArray)
    {
      return jobArray.title
    }
    return false;
    //console.log(jobArray)
  } catch (error) {
    console.log(error)
  }
}

const editClicked = (id) =>{
  const dataSet = applicants.find(x=>x.id===id);
  setIsEdit(true)
  setEditProp(dataSet)
}

const changeStatus = async(id,status) =>{

  try {
    const patchData = {
      status:!status
    }
    const patchReqeust = await axios.patch(`http://localhost:3000/job-applicants/update/${id}`,patchData,{
          'Content-type':'application/json'
        })
        setChange(!change)

  } catch (error) {
    console.log(error)
  }
  

}
const paginate = number =>{

  const pages = (applicants.length/postPerPage)
  console.log(number)
  if(number<1)
  {
      setCurrentPage(1)
  }
  else if(number>pages)
  {
      setCurrentPage(1)
  }
  else{
      setCurrentPage(number)
  }
  
}



    useEffect(()=>{
      getApplicants()
      getJobDetails()
    },[change])

  if(isEdit==true)
  {
    return <UpdateJobApplicants applicant={editProp}/>
  }
  else
  {
    const indexOfLast = currentPage * postPerPage;
    const indexofFirst = indexOfLast - postPerPage;
    const currentPosts = applicants.slice(indexofFirst,indexOfLast)
    return (
      <>
      <Navbar/>
      <div className='mainViewDesignation'>
        {console.log(applicants)}
        <span ><Link to={{ pathname: "/addApplicants" }}><button className='viewAddDesignationButton btn btn-primary'>Add Applicant</button></Link></span>
        {/* <h2 style={{marginLeft:'250px'}}>Job Applicants<span style={{float:'right'}}><Link to={{ pathname: "/addApplicants" }}><button className='add_job_applicant' >Add Applicant</button></Link></span></h2> */}

          <div className='viewDesignationContainer'>
                      <table className='table table-sm'>
                          <thead  >
                              <tr>
                                  <th scope="col">Sr no.</th>
                                  <th scope="col">Name</th>
                                  <th scope="col">Contact</th>
                                  <th scope="col">Email</th>
                                  <th scope="col">Job Name</th>
                                  <th scope="col">Status</th>
                                  <th scope="col">Action</th>
                              </tr>
                             
                          </thead>
                          <tbody>
                              {currentPosts.map((item)=>{
                                return <tr key={item.id}>
                                  <td  scope="row">{srno++}</td>
                                  <td>{item.name}</td>
                                  <td>{item.contact_no}</td>
                                  <td>{item.email_id}</td>
                                  <td>{getJobName(item.job_id)}</td>
                                  
                                    {item.status==true?<td style={{textAlign:'center'}}><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
                                                  : <td ><span style={{fontSize:12, color:"red"}}>&#10060;</span></td>}
                                  
                                  <td>
                                      {item.status!=false?<button whileHover={{scale:1.1}} className='action_job_applicant'  onClick={() => {changeStatus(item.id,item.status)}} >
                                                      Delete 
                                                  </button> :<button whileHover={{scale:1.1}} className='action_job_applicant' onClick={() => {changeStatus(item.id,item.status)}} >
                                                      Activate 
                                                  </button> }
                                      
                                  </td>
                                  <td>
                                    <button className='edit_job_applicant' whileHover={{scale:1.1}} onClick={()=>editClicked(item.id)}>Edit</button>
                                  </td>
  
                                </tr>
                              })}
                          </tbody>
                      </table>
                      <Pagination postPerPage={postPerPage} totalPosts={applicants.length}  paginate={paginate} currentPage={currentPage}/>
                  </div>
        </div>
        </>
    )
  }
  
}

export default ViewJobApplicants