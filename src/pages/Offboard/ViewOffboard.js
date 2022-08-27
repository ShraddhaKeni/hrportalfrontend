import React, { useEffect, useState } from 'react';
import {Table,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';

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
      <div>
        {console.log(employee)}
      <div className='main'>
                    <h2>Employees <span style={{float:'right'}}><Link to={{ pathname: "/addoffboard" }}><Button variant='success'><span style={{fontSize:18, color:"white"}}>&#43;</span></Button></Link></span></h2>
                    <Table bordered striped>
                        <thead  >
                            <tr>
                                <th>Sr no.</th>
                                <th>Employee Name</th>
                                <th>OffBoard Date</th>
                                <th>OffBoard Reason</th>
                            </tr>
                        </thead>
                        <tbody>
                           {offboardRecords.map((item)=>{
                             return<tr key={item.id}>
                                <td>{srno++}</td>
                                <td>{getEmpName(item.emp_id)}</td>  
                                <td>{item.offboard_date}</td>
                                <td>{item.offBoard_reason}</td> 
                              </tr>

                           })}
                        </tbody>
                    </Table>
                </div>
      </div>
    </>
  )
}

export default ViewOffboard