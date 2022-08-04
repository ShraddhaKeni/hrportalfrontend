import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Table,Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UpdateJobApplicants from './UpdateJobApplicants'

const ViewJobApplicants = () => {
var srno = 1;

const [applicants, setApplicants] = useState([]);
const [jobs , setJobs] = useState([]);
const [isEdit,setIsEdit] = useState(false)
const [editProp, setEditProp] = useState({})

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
  } catch (error) {
    console.log(error)
  }
  

}



    useEffect(()=>{
      getApplicants()
      getJobDetails()
    },[applicants])
  if(isEdit==true)
  {
    return <UpdateJobApplicants applicant={editProp}/>
  }
  else
  {
    return (
      <div>
        {console.log(applicants)}
          <div className='main'>
                      <h2>Applicants <span style={{float:'right'}}><Link to={{ pathname: "/addApplicants" }}><Button variant='success'>Add Applicant</Button></Link></span></h2>
                      <Table bordered striped>
                          <thead  >
                              <tr>
                                  <th>Sr no.</th>
                                  <th>Name</th>
                                  <th>Contact</th>
                                  <th>Email</th>
                                  <th>Job Name</th>
                                  <th>Status</th>
                                  <th>Action</th>
                              </tr>
                          </thead>
                          <tbody>
                              {applicants.map((item)=>{
                                return <tr key={item.id}>
                                  <td>{srno++}</td>
                                  <td>{item.name}</td>
                                  <td>{item.contact_no}</td>
                                  <td>{item.email_id}</td>
                                  <td>{getJobName(item.job_id)}</td>
                                  <td>
                                    {item.status==true?<td><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
                                                  : <td><span style={{fontSize:12, color:"red"}}>&#10060;</span></td>}
                                  </td>
                                  <td>
                                      {item.status!=false?<Button variant="danger" onClick={() => {changeStatus(item.id,item.status)}} >
                                                      Delete 
                                                  </Button> :<Button variant="primary" onClick={() => {changeStatus(item.id,item.status)}} >
                                                      Activate 
                                                  </Button> }
                                      <Button style={{marginLeft:'20px'}} onClick={()=>editClicked(item.id)}>Edit</Button>
                                  </td>
  
                                </tr>
                              })}
                          </tbody>
                      </Table>
                  </div>
        </div>
    )
  }
  
}

export default ViewJobApplicants