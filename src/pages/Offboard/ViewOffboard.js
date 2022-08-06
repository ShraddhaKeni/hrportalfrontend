import React, { useEffect, useState } from 'react';
import {Table,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';

const ViewOffboard = () => {

  const[employee,setEmployee] = useState([]);
  const[offboardRecords, setOffboard] = useState([]);

  const getEmployees = async ()=>{
    try {
      const {data} = await axios.get(`/employees`)
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
    
    const empName = employee.find(x=>x.id===id)
    if(empName)
    {
      return empName
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
      <div className='main'>
                    <h2>Employees <span style={{float:'right'}}><Link to={{ pathname: "/" }}><Button variant='success'><span style={{fontSize:18, color:"white"}}>&#43;</span></Button></Link></span></h2>
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
                                <td>{console.log(getEmpName(item.emp_id))}</td>
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