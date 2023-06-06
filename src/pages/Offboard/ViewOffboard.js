import React, { useEffect, useState } from 'react';
import {Table,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const ViewOffboard = () => {

  const[employee,setEmployee] = useState([]);
  const[offboardRecords, setOffboard] = useState([]);

  const getEmployees = async ()=>{
    try {
      const {data} = await axios.get(`/users/findAll`)
      setEmployee(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getoffboard = async()=>{
    try {
      const {data} = await axios.get(`/offboard/findAll`)
      setOffboard(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  function getEmpName(id)
  {
    console.log(id)
    const empName = employee.find(x=>x.id===id)
    if(empName)
    {
      return empName.username
    }
    return empName;
  }

  useEffect(()=>{
    getEmployees();
    getoffboard();
  },[])

  var srno = 1;
  return (
    <>  
    <Navbar/>

        {console.log(employee)}
        <div className='mainViewDesignation'>
     
     <div style={{display:'flex', margin: '3% 0% 0% 51%'}}>
              <div><b><h1>View Address</h1></b></div>
              <div style={{marginLeft: '-4%'}}><Link to={{ pathname: "/addoffboard" }}><button className='viewAddDesignationButton btn btn-primary'>Add Offboard</button></Link></div>
              </div>
                    {/* <h2>Employees <span style={{float:'right'}}><Link to={{ pathname: "/addoffboard" }}><Button variant='success'><span style={{fontSize:18, color:"white"}}>&#43;</span></Button></Link></span></h2> */}
                    <div className='viewDesignationContainer table-responsive'>
                  
                    <table className='table table-sm table-hover' responsive>
                        <thead  >
                            <tr>
                                <th scope="col">Sr no.</th>
                                <th scope="col">Employee Name</th>
                                <th scope="col">OffBoard Date</th>
                                <th scope="col">OffBoard Reason</th>
                            </tr>
                        </thead>
                        <tbody>
                           {offboardRecords.map((item)=>{
                             return<tr key={item.id}>
                                <td scope="row">{srno++}</td>
                                <td>{getEmpName(item.emp_id)}</td>  
                                <td>{item.offboard_date}</td>
                                <td>{item.offBoard_reason}</td> 
                              </tr>

                           })}
                        </tbody>
                    </table>
                </div>
                </div>
    
    </>
  )
}

export default ViewOffboard