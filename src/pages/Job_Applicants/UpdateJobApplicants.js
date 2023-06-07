import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/updateApplication.css'
const UpdateJobApplicants = ({ applicant }) => {

  const [applicantDetails, setDetails] = useState()
  const [jobs, setJobs] = useState([])


  const getApplicants = async (id) => {

    try {
      const {data} = await axios.get(`/job-applicants/findApplicant/${id}`);
      setDetails(data.data)
    } catch (error) {
      console.log(error)
    }

  }

  const getJob = async () => {

    try {
      const {data} = await axios.get(`/jobs/findAll`);
      setJobs(data.data)
      //console.log(applicant.job_id)
      document.getElementById('job_id').value = applicant.job_id
    } catch (error) {
      console.log(error)
    }

  }

  const handleChange = e => {
    setDetails({ ...applicantDetails, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {

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
        
        const patchReqeust = await axios.patch(`/job-applicants/update/${applicant.id}`,patchData,{
          'Content-type':'application/json'
        })
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
   
  }

  useEffect(() => {
    getApplicants(applicant.id)
    getJob()
  }, [])

  return (
    <div className='main'>
      <div className='application_form_update_container'>
        {/* {console.log(applicant.id)} */}
        <form onSubmit={handleSubmit} className='update_application_form'>

          <div className='form_div'>
            <lable className='update_applicant_name_lable'>
              Add Name:
            </lable>
            <input type='text' className='update_applicant_name' onChange={handleChange} name='name' defaultValue={applicant.name} placeholder='Enter Name here'></input>

            <lable className='update_contact_lable'>
              Contact Number:
            </lable>
            <input type='number' className='update_contact' onChange={handleChange} name='contact_no' defaultValue={applicant.contact_no} placeholder='Enter Phone number here'></input>

            <lable className='update_email_lable'>
              Email:
            </lable>
            <input type='email' className='update_email' onChange={handleChange} name='email_id' defaultValue={applicant.email_id} placeholder='Enter Email here'></input>

            <lable className='update_cv_lable'>
              CV:
            </lable>
            <textarea className='update_cv' name='cv' onChange={handleChange} defaultValue={applicant.cv} placeholder='Paste Resume'></textarea>

            <lable className='update_job_application_lable'>
              Select Job
            </lable>
            <select className='update_job_application' id='job_id' name='job_id' onChange={handleChange} defaultValue={applicant.job_id}>
              <option>Select Job </option>
              {jobs.map((item) => {
                return <option key={item.id} value={item.id}>{item.title}</option>
              })}
            </select>

            <lable className='update_status_lable'>
              Status:
            </lable>
            <select className='update_application_status' name='status' onChange={handleChange} defaultValue={applicant.status}>
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>

            <button className='save_application_update' type='submit'>Save</button>
            <button className='cancel_application_update' onClick={() => window.history.back()} type='button'>cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateJobApplicants