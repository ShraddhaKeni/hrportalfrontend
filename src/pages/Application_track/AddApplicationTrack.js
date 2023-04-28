import React,{useState,useEffect, useRef} from 'react'
import axios from 'axios';
import './style/addApplicant.css';
import Navbar from '../../components/Navbar';
// import {motion} from 'framer-motion'
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const AddApplicationTrack = () => {

    const[applicantData,setApplicantData] = useState([])
    const [addTrack,setTrack] = useState()
    const[job,setJob] = useState({})
    const[employees,setEmployees] = useState([])
    const jobRef = useRef([])

    const getApplicants = async()=>{
        try {
            const {data} = await axios.get(`http://localhost:3000/job-applicants/findAll`)
            setApplicantData(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getEmployeeData = async()=>{
        try {
            const {data} = await axios.get(`http://localhost:3000/employees`)
            setEmployees(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const dataChange = async(e)=>{
        
        const id = e.target.value;
        if(id>0)
        {
            try {
                setTrack({...addTrack,[e.target.name]:e.target.value})
                const Applicat = applicantData.find(x=>x.id==id)
                const {data} = await axios.get(`http://localhost:3000/jobs/find/${Applicat.job_id}`)
                setJob(data.data)    
            } catch (error) {
                console.log(error)
            }
        }
        else
        {
            setJob({title:'Job does not exist for this applicant'})
        }
  
    }

    const handleChange = e=>{
        setTrack({...addTrack,[e.target.name]:e.target.value})
       
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try
        {
            const data = {
                job_id:parseInt(jobRef.current.id),
                applicant_id:parseInt(addTrack.applicant_id),
                comment:addTrack.comment,
                emp_id:addTrack.emp_id,
                level:parseInt(addTrack.level)
            }
            const postData = await axios.post(`http://localhost:3000/application-track/create`,data,{
                'Content-type':'application/json'
            })
            window.history.go('/viewApplicationTrack')
        }
        catch(error)
        {
            console.log(error)
        }
    }

    useEffect(()=>{
        getApplicants();
        getEmployeeData();
    },[])
  return (
    <>
    <Navbar/>
    <div className='mainAddCompanies' style={{marginTop:'8%'}}>
    <h2>Add Application Track</h2>
        <form onSubmit={handleSubmit} class="row g-3">
        <div class="col-12">
                    <label for="applicant" class="form-label InputLabel" >Select Applicant:</label>
                    <select class="form-control InputField" id="applicant"  name='applicant_id' onChange={dataChange} required>
                    <option value={0}>Select Applicant</option>
                        {applicantData.map(item=>{
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })}
                            </select>
                </div>
                <div class="col-12">
                    <label for="job" class="form-label InputLabel">Job:</label>
                    <input type="text" class="form-control InputField" id="job" placeholder="Enter job"required />
                </div>
                <div class="col-12">
                    <label for="comment" class="form-label InputLabel">Comment:</label>
                    <textarea class="form-control InputField" rows={3} id="comment"  name='comment' onChange={handleChange} placeholder='Comment here' required />
      </div>
      <div class="col-md-6">
                    <label for="employee" class="form-label SelectLabel">Employee:</label>
                    <select class="form-select SelectField" id="employee" name='emp_id' onChange={handleChange} required>
                    <option value={0}>Select Employee</option>
                        {employees.map(item=>{
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })}
                        </select>
                </div>
                <div class="col-md-6">
                    <label for="level" class="form-label InputLabel">Level:</label>
                    <input type="number" class="form-control SelectField" style={{marginLeft: '5%' , padding: '2%'}}  id="level" placeholder="Enter Level" name='level' onChange={handleChange} required />
                </div>
                <br/>
                <div style={{marginTop: '10%', marginBottom: '2%'}}>
                    <Button className="SaveButton" type="submit">
                        Save
                    </Button>&nbsp;&nbsp;
                       
                            <Link to={{pathname: "/viewApplicationTrack"}}><Button className='CancelButton' type="cancel">
                                Cancel
                            </Button></Link>
                           
             
                   
                    </div>

{/* OLD JOB CODE */}

                {/* <lable className='applicant_job_lable' style={{marginTop:'10px'}}> Job:</lable>
                <text className='applicant_job' ref={jobRef} id={job.id}>{job.title}</text> */}
            
                
               
        </form>
    </div>
    </>

  )
}

export default AddApplicationTrack