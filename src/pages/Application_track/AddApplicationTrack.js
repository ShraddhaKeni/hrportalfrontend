import React,{useState,useEffect, useRef} from 'react'
import axios from 'axios';

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
            window.location.reload()
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
    <div>
        {}
        <form onSubmit={handleSubmit}>
            <div style={{display:'flex',flexDirection:'column'}}>
                <lable style={{marginTop:'10px'}}>
                    Select Applicant:
                    <select name='applicant_id' onChange={dataChange}>
                        <option value={0}>Select Applicant</option>
                        {applicantData.map(item=>{
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })}
                        </select>
                </lable>

                <lable style={{marginTop:'10px'}}>
                    Job:
                    <text ref={jobRef} id={job.id}>{job.title}</text>
                </lable>
                <lable style={{marginTop:'10px'}}>
                    Comment:
                    <input type='text' name='comment' onChange={handleChange}></input>
                </lable>
                <lable style={{marginTop:'10px'}}>
                    Employee:
                    <select name='emp_id' onChange={handleChange}>
                        <option value={0}>Select Employee</option>
                        {employees.map(item=>{
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })}
                        </select>
                </lable>
                <lable style={{marginTop:'10px'}}>
                    Leve:
                    <input type='number' name='level' onChange={handleChange}></input>
                </lable>
                <button type='submit'>Save</button>
            </div>
        </form>
    </div>
  )
}

export default AddApplicationTrack