import React, { useEffect, useState } from 'react'
import './styles/addApplicants.css'
import axios from 'axios';
const AddJobApplicants = () => {

  const [createData,setData] = useState({});
  const [jobs,setjobs] = useState([]);

  //functions to fetch Data

  const getJobsData = async () =>{
    try {
      const {data}= await axios.get(`http://localhost:3001/jobs/findAll`)
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
    try {
      const postData = {
        contact_no: createData.contact_no,
        cv: createData.cv,
        email_id: createData.email_id,
        job_id: parseInt(createData.job_id),
        name: createData.name,
        status:true
      }
      const postRequest = await axios.post(`http://localhost:3001/job-applicants/create`,postData,{
        'Content-type':'application/json'
      })
     window.history.back()
    } catch (error) {
      console.log(error)
    }
    
    
  }

  useEffect(()=>{
    getJobsData();
  },[])
  return (
    <div className='main'>
      <div className='add_applicant_form_container'>  
      <form onSubmit={handleSubmit} className='add_applicant_form'>
        
        <div className='add_applicant_div' style={{display:'flex',flexDirection:'column',padding:'0px'}}>
          <lable className='applicant_name_lable'>
            Add Name:
          </lable>
              <input type='text' className='applicant_name' onChange={handleChange} name='name' placeholder='Enter Name here'></input>
          
          <lable className='contact_number_lable'>
            Contact Number:
            </lable>
              <input type='number' className='contact_number' onChange={handleChange} name='contact_no' placeholder='Enter Phone number here'></input>
          
          <lable className='applicant_email_lable'>
            Email:
            </lable>
              <input className='applicant_email' type='email' onChange={handleChange} name='email_id' placeholder='Enter Email here'></input>
          
          <lable className='applicant_cv_lable'>
            CV:
            </lable>
              <textarea name='cv' className='applicant_cv' onChange={handleChange} placeholder='Paste Resume'></textarea>
          
          <lable className='select_job_lable'>
            Select Job:
            </lable>
            <select className='applicant_select_job' name='job_id' onChange={handleChange}>
              <option>Select Job </option>
                {jobs.map((item)=>{
                  return <option key={item.id} value={item.id}>{item.title}</option>
                })}
            </select>
          
          <button className='save_application' type='submit'>Save</button>
          <button className='cancel_application' type='button' onClick={()=>window.history.back()}>Cancel</button>
        </div>
      </form>
      </div>
    </div>
  )
}
export default AddJobApplicants