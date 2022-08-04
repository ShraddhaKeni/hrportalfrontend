import React, { useEffect, useState } from 'react'
import './styles/addApplicants.css'
import axios from 'axios';
const AddJobApplicants = () => {

  const [createData,setData] = useState({});
  const [jobs,setjobs] = useState([]);

  //functions to fetch Data

  const getJobsData = async () =>{
    try {
      const {data}= await axios.get(`http://localhost:3000/jobs/findAll`)
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
      const postRequest = await axios.post(`http://localhost:3000/job-applicants/create`,postData,{
        'Content-type':'application/json'
      })
     console.log(postRequest)
    } catch (error) {
      console.log(error)
    }
    
    
  }

  useEffect(()=>{
    getJobsData();
  },[])
  return (
    <div>
      <form onSubmit={handleSubmit}>
        
        <div className='form_div'>
          <lable>
            Add Name:
              <input type='text' onChange={handleChange} name='name' placeholder='Enter Name here'></input>
          </lable>
          <lable>
            Contact Number:
              <input type='number' onChange={handleChange} name='contact_no' placeholder='Enter Phone number here'></input>
          </lable>
          <lable>
            Email:
              <input type='email' onChange={handleChange} name='email_id' placeholder='Enter Email here'></input>
          </lable>
          <lable>
            CV:
              <textarea name='cv' onChange={handleChange} placeholder='Paste Resume'></textarea>
          </lable>
          <lable>
            Select Job
            <select name='job_id' onChange={handleChange}>
              <option>Select Job </option>
                {jobs.map((item)=>{
                  return <option key={item.id} value={item.id}>{item.title}</option>
                })}
            </select>
          </lable>
          <button type='submit'>Save</button>
        </div>
      </form>
    </div>
  )
}
export default AddJobApplicants