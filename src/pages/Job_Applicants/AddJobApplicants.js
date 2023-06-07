import React, { useEffect, useState } from 'react'
import './styles/addApplicants.css'
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { Form, Button } from 'react-bootstrap';
const AddJobApplicants = () => {

  const [createData,setData] = useState({});
  const [jobs,setjobs] = useState([]);

  //functions to fetch Data

  const getJobsData = async () =>{
    try {
      const {data}= await axios.get(`/jobs/findAll`)
      setjobs(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = e =>{
    setData({...createData,[e.target.name]:e.target.value})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    // console.log(createData)
    try {
   
      const postData = {
        contact_no: document.getElementById('contactno').value.toString(),
        cv: createData.cv,
        email_id: createData.email_id,
        job_id: parseInt(createData.job_id),
        name: createData.name,
        status:true
      }
      
      const postRequest = await axios.post(`http://localhost:3000/job-applicants/create`,postData,{
        'Content-type':'application/json'
      })
      console.log(postData)
     window.history.back()
    } catch (error) {
      console.log(error)
    }
    
    
  }

  useEffect(()=>{
    getJobsData();
  },[])
  return (

    <>
    <Navbar/>
      <div className='mainAddDesignation' style={{marginTop: '8%'}}>
      <h2>Add Job Applicant</h2> 
      <form onSubmit={handleSubmit} class="row g-3" >
      <div class="col-12">
                    <label for="name" class="form-label InputLabel">Add Name:</label>
                    <input type="text" class="form-control InputField" id="name" onChange={handleChange} name='name' placeholder='Enter Name here' required />
      </div>
       <div class="col-md-6">
                    <label for="contactno" class="form-label SelectLabel" style={{marginLeft: '7%'}}>Contact Number:</label>
                    <input class="form-control SelectField" style={{marginLeft: '7%' , padding: '2%'}} id="contactno" type='number'  nonChange={handleChange} name='contact_no' placeholder='Enter Phone number here' required />
      </div> 
      <div class="col-md-6">
                    <label for="email" class="form-label InputLabel">Email:</label>
                    <input type="email" class="form-control SelectField" style={{marginLeft: '5%' , padding: '2%'}}  id="email" onChange={handleChange} name='email_id' placeholder='Enter Email here' required />
      </div>
      <div class="col-12">
                    <label for="name" class="form-label InputLabel">CV:</label>
                    <textarea class="form-control InputField" rows={3} id="cv"  onChange={handleChange} placeholder='Paste Resume' name='cv'  required />
      </div>
      <div class="col-12">
                    <label for="selectjob" class="form-label InputLabel">Select Job:</label>
                    <select class="form-select InputField" id="selectjob" style={{marginLeft: '0%'}}  name='job_id' onChange={handleChange}>
                    <option>Select Job </option>
                {jobs.map((item)=>{
                  return <option key={item.id} value={item.id}>{item.title}</option>
                })}
                        </select>
                </div>
                <div style={{marginTop: '5%'}}>
                <Button className="SaveButton" type="submit">
                        Save
                </Button>&nbsp;&nbsp;
          <Button className='CancelButton' type='button' onClick={()=>window.history.back()}>Cancel</Button>
          </div>

       
      </form>
      </div>

    </>

  )
}
export default AddJobApplicants