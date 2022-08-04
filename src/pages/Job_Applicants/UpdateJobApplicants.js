import React, { useEffect, useState } from 'react';
import axios from 'axios';
const UpdateJobApplicants = ({applicant}) => {

  const [applicantDetails, setDetails] = useState()
  const [jobs,setJobs] = useState([])
  

  const getApplicants = async(id) =>{

    try {
      const {data} = await axios.get(`http://localhost:3000/job-applicants/findApplicant/${id}`);
      setDetails(data.data)
    } catch (error) {
      console.log(error)
    }
    
  }

  const getJob = async() =>{

    try {
      const {data} = await axios.get(`http://localhost:3000/jobs/findAll`);
      setJobs(data.data)
    } catch (error) {
      console.log(error)
    }
    
  }

  const handleChange = e =>{
    setDetails({...applicantDetails,[e.target.name]:e.target.value})
  }

  const handleSubmit = async(e)=>{

    e.preventDefault()
      try {
        const isBool = applicantDetails.status.toString().toLowerCase()=='true'
        const patchData = {
            job_id:parseInt(applicantDetails.job_id),
            name:applicantDetails.name,
            contact_no:applicantDetails.contact_no,
            email_id:applicantDetails.email_id,
            cv:applicantDetails.cv,
            status:isBool
        }
        console.log(patchData)
        const patchReqeust = await axios.patch(`http://localhost:3000/job-applicants/update/${applicant.id}`,patchData,{
          'Content-type':'application/json'
        })
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
  }

  useEffect(()=>{
    getApplicants(applicant.id)
    getJob()
  },[])

  return (
    <div>
        <div>
          {console.log(applicant.id)}
      <form onSubmit={handleSubmit}> 
      
        <div className='form_div'>
          <lable>
            Add Name:
              <input type='text' onChange={handleChange} name='name' defaultValue={applicant.name} placeholder='Enter Name here'></input>
          </lable>
          <lable>
            Contact Number:
              <input type='number' onChange={handleChange} name='contact_no' defaultValue={applicant.contact_no} placeholder='Enter Phone number here'></input>
          </lable>
          <lable>
            Email:
              <input type='email' onChange={handleChange} name='email_id' defaultValue={applicant.email_id} placeholder='Enter Email here'></input>
          </lable>
          <lable>
            CV:
              <textarea name='cv' onChange={handleChange} defaultValue={applicant.cv}  placeholder='Paste Resume'></textarea>
          </lable>
          <lable>
            Select Job
            <select name='job_id' onChange={handleChange} defaultValue={applicant.job_id}>
              <option>Select Job </option>
                {jobs.map((item)=>{
                  return <option key={item.id} value={item.id}>{item.title}</option>
                })}
            </select>
          </lable>
          <lable>
            Status: 
            <select name='status' onChange={handleChange} defaultValue={applicant.status}>
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </lable>
          <button type='submit'>Save</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default UpdateJobApplicants