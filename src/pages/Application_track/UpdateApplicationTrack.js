import React,{useState,useEffect, useRef} from 'react'
import axios from 'axios';

const UpdateApplicationTrack = ({trackData}) => {
    const[applicantData,setApplicantData] = useState([trackData])
    const [addTrack,setTrack] = useState({
                job_id:parseInt(trackData.job_id),
                applicant_id:parseInt(trackData.applicant_id),
                comment:trackData.comment,
                emp_id:trackData.emp_id,
                level:parseInt(trackData.level),
                status:trackData.status
    })
    const[job,setJob] = useState({})
    const[employees,setEmployees] = useState([trackData])
    const jobRef = useRef([])

    const[defaultApplicant,setDefaultApplicant] = useState()

    const getApplicants = async()=>{
        try {
            const {data} = await axios.get(`http://localhost:3000/job-applicants/findAll`)
            setApplicantData(data.data)
            setDefaultApplicant(applicantData.find(x=>x.id==trackData.applicant_id))
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
            const isBool = addTrack.status.toString().toLowerCase()=='true'
            const data = {
                job_id:parseInt(jobRef.current.id),
                applicant_id:parseInt(addTrack.applicant_id),
                comment:addTrack.comment,
                emp_id:addTrack.emp_id,
                level:parseInt(addTrack.level),
                status:isBool
            }
            const updateReqeust = await axios.patch(`http://localhost:3000/application-track/update/${trackData.id}`,data,{
                'Content-type':'application/json'
            })
            console.log(updateReqeust)
            window.location.reload();
            
        }
        catch(error)
        {
            console.log(error)
        }
    }
    async function findTitle(id)
    {
        try {
            const {data} = await axios.get(`http://localhost:3000/jobs/find/${id}`)
                setJob(data.data) 
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(()=>{
        getApplicants();
        getEmployeeData();
        findTitle(trackData.job_id);
    },[])
  return (
    <div>
        {console.log(addTrack)}
        <form onSubmit={handleSubmit}>
            <div style={{display:'flex',flexDirection:'column'}}>
                <lable style={{marginTop:'10px'}}>
                    Select Applicant:
                    <select name='applicant_id' onChange={dataChange} onLoad={dataChange} defaultValue={trackData.applicant_id}>
                        <option value={0}>Select Applicant</option>
                        {applicantData.map(item=>{
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })}
                        </select>
                </lable>

                <lable style={{marginTop:'10px'}}>
                    Job:
                    <input ref={jobRef} id={trackData.job_id} value={job.title} disabled></input>
                </lable>
                <lable style={{marginTop:'10px'}}>
                    Comment:
                    <input type='text' name='comment' onChange={handleChange} defaultValue={trackData.comment}></input>
                </lable>
                <lable style={{marginTop:'10px'}}>
                    Employee:
                    <select name='emp_id' onChange={handleChange} defaultValue={trackData.emp_id}>
                        <option value={0}>Select Employee</option>
                        {employees.map(item=>{
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })}
                        </select>
                </lable>
                <lable style={{marginTop:'10px'}}>
                    Leve:
                    <input type='number' name='level' onChange={handleChange} defaultValue={trackData.level}></input>
                </lable>
                <lable style={{marginTop:'10px'}}>
                    Status:
                    <select name='status' onChange={handleChange} defaultValue={trackData.status}>
                        <option value={[true]}>
                            Active
                        </option>
                        <option value={[false]}>
                            Inactive
                        </option>
                    </select>
                </lable>
                <button type='submit'>Save</button>
            </div>
        </form>
    </div>
  )
}

export default UpdateApplicationTrack