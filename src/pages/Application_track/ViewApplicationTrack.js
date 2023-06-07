import React, { useEffect, useState } from 'react'
import {Table,Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'
import UpdateApplicationTrack from './UpdateApplicationTrack';
import './style/viewApplicant.css';
// import {motion} from 'framer-motion'
import Pagination from '../../components/paginate/Pagination';
import Navbar from '../../components/Navbar';

const ViewApplicationTrack = () => {

const[trackData, setTrack] = useState([]);
const[applicant,setApplicant] = useState([]);
const [job,setjob] = useState([]);
const [employee,setEmployees] = useState([]);
const[isEdit,setEdit] = useState(false)
const [edit,setEditData] = useState();
const[change,setChange] = useState(false)
const[currentPage,setCurrentPage] = useState(1)
const[postPerPage] = useState(12);
//const[postToDisplay,setPosts] = useState([])


const getTrackData = async()=>{
    try {
        const {data} = await axios.get(`/application-track/findAll`)
        setTrack(data.data)
    } catch (error) {
        console.log(error)
    }
}
const  getApplicant=async()=>{
    try{
        const {data} = await axios.get(`/job-applicants/findAll`)
        setApplicant(data.data)
    }
    catch(error)
    {
        console.log(error)
    }
}

const getJobs = async()=>{
    try {
        const {data} = await axios.get(`/jobs/findAll`)
        setjob(data.data)
    } catch (error) {
        console.log(error)
    }
}

const getEmployees = async()=>{
    try {
        const {data} = await axios.get(`/employees`)
        setEmployees(data.data)
    } catch (error) {
        
    }
}

function getApplicantName (id)
{
    const app = applicant.find(x=>x.id==id)
    if(app)
    {
        return app.name;
    }
    return false;
}

function getJobName(id)
{
    const job_s = job.find(x=>x.id==id)
    if(job_s)
    {
        return job_s.title
    }
    return false
}

function getEmployeesName(id)
{
    const emp = employee.find(x=>x.id==id)
    if(emp)
    {
        return emp.name
    }
    return false
}

const editClicked = (id)=>{
    setEditData(trackData.find(x=>x.id==id))
    setEdit(true)
}
const changeStatus = async(id,status)=>{
    const statusChange = {
        status:!status
    }
    try {
        const updateReqeust = await axios.patch(`/application-track/update/${id}`,statusChange,{
                'Content-type':'application/json'
            })
        setChange(!change)
    } catch (error) {
        console.log(error)
    }
}

useEffect(()=>{
    getTrackData();
    getApplicant();
    getJobs();
    getEmployees();
},[change,currentPage])

const paginate = number =>{

    const pages = (trackData.length/postPerPage)
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


if(isEdit==true)
{
    return <UpdateApplicationTrack trackData={edit}/>
}
else
{
    const indexOfLast = currentPage * postPerPage;
    const indexofFirst = indexOfLast - postPerPage;
    const currentPosts = trackData.slice(indexofFirst,indexOfLast)
    return (
        <>
        <Navbar/>
        <div className='mainViewDesignation'>
        <div style={{display:'flex', margin: '3% 0% 0% 51%'}}>
                    <div><b><h1>Application Track</h1></b></div>
                    <div style={{marginLeft: '-5%'}}><Link to={{ pathname: "/addApplicationTrack" }}><button className='viewAddDesignationButton btn btn-primary'>Add track</button></Link></div>
                    </div>
       
                    <div className='viewDesignationContainer table-responsive'  style={{width: '64vw', marginLeft:'28%'}}>
                    <table className='table w-auto table-sm table-hover' responsive>
          
                              <thead  >
                                  <tr>
                                      <th scope="col">Sr no.</th>
                                      <th scope="col">Name</th>
                                      <th scope="col">Job Name</th>
                                      <th scope="col">Comment</th>
                                      <th scope="col">Employee</th>
                                      <th scope="col">Level</th>
                                      <th scope="col">status</th>
                                      <th scope="col">Action</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {currentPosts.map((item,index)=>{
                                    return (<tr key={item.id}>
                                        <td scope="row">{currentPage<=2?(currentPage-1)*12+(index+1):(currentPage+1)+(index+1)}</td>
                                        <td>{getApplicantName(item.applicant_id)}</td>
                                        <td>{getJobName(item.job_id)}</td>
                                        <td>{item.comment}</td>
                                        <td>{getEmployeesName(item.emp_id)}</td>
                                        <td>{item.level}</td>
                                        
                                        {item.status==true?<td><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
                                                      : <td><span style={{fontSize:12, color:"red"}}>&#10060;</span></td>}
                                        <div style={{display:'flex'}}>
                                        {item.status!=false?<button whileHover={{scale:1.1}} whileTap={{scale:0.8}} className='action_applicant'  onClick={() => {changeStatus(item.id,item.status)}} >
                                                          Delete 
                                                      </button> :<button whileHover={{scale:1.1}} whileTap={{scale:0.8}} className='action_applicant'  onClick={() => {changeStatus(item.id,item.status)}} >
                                                          Activate 
                                                      </button> }   
                                          <button whileHover={{scale:1.1}} whileTap={{scale:0.8}} className='edit_applicant' onClick={()=>editClicked(item.id)}>Edit</button>
                                        </div>
                                    </tr>)
                                  })}
                              </tbody>
                          </table>
                          <Pagination postPerPage={postPerPage} totalPosts={trackData.length}  paginate={paginate} currentPage={currentPage}/>
                      </div>
        </div>
        </>
      )
}
  
}

export default ViewApplicationTrack