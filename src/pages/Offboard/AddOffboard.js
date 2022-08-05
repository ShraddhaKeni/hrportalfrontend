import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AddOffboard = () => {

    const[employee,setEmployee] = useState([])
    const[offboard,setOffboard] = useState({})

    const getEmployees = async ()=>{
        try {
          const {data} = await axios.get(`/users/findAll`)
          setEmployee(data.data)
        } catch (error) {
          console.log(error)
        }
      }
      
      const handleSubmit = async(e)=>{
        e.preventDefault();
        try {

            const dataStruct = {
                emp_id:offboard.emp_id,
                offboard_date:offboard.offboard_date,
                offBoard_reason:offboard.offBoard_reason
            }
            
            const data = await axios.post(`/offboard/create`,dataStruct)
            console.log(data)
        } catch (error) {
            
        }

      }

      const handleChange = e=>{
        setOffboard({...offboard,[e.target.name]:e.target.value})
      }

      useEffect(()=>{
        getEmployees();
      },[])
  return (
    <div>
        {
            console.log(offboard)
        }
        <form onSubmit={handleSubmit}>
            <div style={{display:'flex',flexDirection:'column'}}>
                <label>
                    Select Employee:   
                    <select name='emp_id' onChange={handleChange} required>
                        <option>Select Employee</option>
                       {employee.map((item)=>{
                        return <option value={item.id}>{item.username}</option>
                       })}
                    </select>
                </label>
                <label>
                    Select Date: 
                    <input name='offboard_date' type='date' onChange={handleChange} required></input>
                </label>
                <label> 
                    OffBoard Reason: 
                    <input name='offBoard_reason' type='text' onChange={handleChange} required></input>
                </label>
                <button type='submit' style={{width:'100px',marginLeft:'800px',marginRight:'-500px'}}>Save</button>
            </div>
        </form>
    </div>
  )
}

export default AddOffboard