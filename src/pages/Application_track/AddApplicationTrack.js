import React,{useState,useEffect, useRef} from 'react'
import axios from 'axios';
import './style/addApplicant.css';

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
    <div className='main'>
        
        <form onSubmit={handleSubmit} className='add_applicant_form'>
            <div style={{display:'flex',flexDirection:'column',padding:'0px'}}>
                <lable className='select_applicant_lable' style={{marginTop:'10px'}}>
                    Select Applicant:
                </lable>
                    <select className='applicant_select' name='applicant_id' onChange={dataChange}>
                        <option value={0}>Select Applicant</option>
                        {applicantData.map(item=>{
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })}
                    </select>
               

                <lable className='applicant_job_lable' style={{marginTop:'10px'}}>
                    
                    Job:
                </lable>
                    <text className='applicant_job' ref={jobRef} id={job.id}>{job.title}</text>
               
                <lable for='comment' className='applicant_comment_lable' style={{marginTop:'10px'}}>
                    Comment:
                </lable>
                    <textarea type='text' className='applicant_comment' name='comment' onChange={handleChange}></textarea>
                
                <lable className='applicant_employee_lable' style={{marginTop:'10px'}}>
                    Employee:
                </lable>
                    <select name='emp_id' className='applicant_employee' onChange={handleChange}>
                        <option value={0}>Select Employee</option>
                        {employees.map(item=>{
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })}
                        </select>
                
                <lable className='applicant_level_lable' style={{marginTop:'10px'}}>
                    Level:
                </lable>
                    <input type='number' className='applicant_level' name='level' onChange={handleChange}></input>
                
                <button whileHover={{scale:1.1}} className='save_applicant' type='submit'>Save</button>
                <button whileHover={{scale:1.1}} className='cancel_applicant' type='button' onClick={()=>window.history.back()} >Cancel</button>
            </div>
        </form>
    </div>
  )
}

export default AddApplicationTrack