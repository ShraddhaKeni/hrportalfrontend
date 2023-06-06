import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../../components/Navbar'
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
    <>    
    <Navbar/>
    <div className="mainAddDesignation">
    <h2>Add Offboard</h2>
        <form class="row g-3" onSubmit={handleSubmit}>
        <div class="col-12">
                    <label for="employee" class="form-label InputLabel" >Select Employee:</label>
                    <select class="form-control InputField" id="employee" name='emp_id' onChange={handleChange} required>
                    <option>Select Employee</option>
                       {employee.map((item)=>{
                        return <option value={item.id}>{item.username}</option>
                       })}
                            </select>
                </div>
                <div class="col-md-6">
                    <label for="date" class="form-label SelectLabel">Select Date:</label>
                    <input class="form-control SelectField" style={{marginLeft: '8%' , padding: '0%'}} id="date" name='offboard_date' type='date' onChange={handleChange} required />
                </div>
                <div class="col-md-6">
                    <label for="pancardno" class="form-label InputLabel">OffBoard Reason:</label>
                    <input type="text" class="form-control SelectField" style={{marginLeft: '5%' , padding: '2%'}}  id="pancardno" name="offBoard_reason" placeholder="Enter Offboard Reason"  onChange={handleChange} required />
                </div>
                <br/>
                <div style={{marginTop: '10%', marginBottom: '2%'}}>
                    <Button className="SaveButton" type="submit">
                        Save
                    </Button>&nbsp;&nbsp;
                            <Link to={{pathname: "/offboard"}}><Button className='CancelButton' type="cancel">
                                Cancel
                            </Button></Link>
                           
                        
                   
                    </div>
            {/* <div style={{display:'flex',flexDirection:'column'}}>
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
            </div> */}
        </form>
    </div>
    </>

  )
}

export default AddOffboard