import React, { useEffect, useState } from 'react'
import {Table,Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'
import UpdateApplicationTrack from './UpdateApplicationTrack';

const ViewApplicationTrack = () => {
var srno = 1;

const[trackData, setTrack] = useState([]);
const[applicant,setApplicant] = useState([]);
const [job,setjob] = useState([]);
const [employee,setEmployees] = useState([]);
const[isEdit,setEdit] = useState(false)
const [edit,setEditData] = useState();
const[change,setChange] = useState(false)

const getTrackData = async()=>{
    try {
        const {data} = await axios.get(`http://localhost:3000/application-track/findAll`)
        setTrack(data.data)
    } catch (error) {
        console.log(error)
    }
}
const  getApplicant=async()=>{
    try{
        const {data} = await axios.get(`http://localhost:3000/job-applicants/findAll`)
        setApplicant(data.data)
    }
    catch(error)
    {
        console.log(error)
    }
}

const getJobs = async()=>{
    try {
        const {data} = await axios.get(`http://localhost:3000/jobs/findAll`)
        setjob(data.data)
    } catch (error) {
        console.log(error)
    }
}

const getEmployees = async()=>{
    try {
        const {data} = await axios.get(`http://localhost:3000/employees`)
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
        const updateReqeust = await axios.patch(`http://localhost:3000/application-track/update/${id}`,statusChange,{
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
},[change])

if(isEdit==true)
{
    return <UpdateApplicationTrack trackData={edit}/>
}
else
{
    return (
        <div>
            <div className='main'>
                          <h2>Applicants <span style={{float:'right'}}><Link to={{ pathname: "/addApplicationTrack" }}><Button variant='success'>Add track</Button></Link></span></h2>
                          <Table bordered striped>
                              <thead  >
                                  <tr>
                                      <th>Sr no.</th>
                                      <th>Name</th>
                                      <th>Job Name</th>
                                      <th>Comment</th>
                                      <th>Employee</th>
                                      <th>Level</th>
                                      <th>status</th>
                                      <th>Action</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {trackData.map((item)=>{
                                    return (<tr key={item.id}>
                                        <td>{srno++}</td>
                                        <td>{getApplicantName(item.applicant_id)}</td>
                                        <td>{getJobName(item.job_id)}</td>
                                        <td>{item.comment}</td>
                                        <td>{getEmployeesName(item.emp_id)}</td>
                                        <td>{item.level}</td>
                                        {item.status==true?<td><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
                                                      : <td><span style={{fontSize:12, color:"red"}}>&#10060;</span></td>}
                                        {item.status!=false?<Button variant="danger" onClick={() => {changeStatus(item.id,item.status)}} >
                                                          Delete 
                                                      </Button> :<Button variant="primary" onClick={() => {changeStatus(item.id,item.status)}} >
                                                          Activate 
                                                      </Button> }   
                                          <Button style={{margin:'10px'}} onClick={()=>editClicked(item.id)}>Edit</Button>
                                    </tr>)
                                  })}
                              </tbody>
                          </Table>
                      </div>
        </div>
      )
}
  
}

export default ViewApplicationTrack