import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import axios from 'axios'
import EmpCards from './EmpCards'
import './styles/hrdash.css'

const HRDash = () => {

    const [employees,setEmp] = useState([])

    useEffect(()=>{
        getEmployees()
    },[])

    const getEmployees=async()=>{
        try {
            const {data} = await axios.get('/employees')
            setEmp(data.data)
        } catch (error) {
            
        }
    }


  return (
    <div className='hr-dashboard-container'>
        <Navbar/>
       
        <div className='hrdash-block'>
            {employees.map(emp=>{
                return (
                    <EmpCards name={emp.name} emp_code={emp.emp_code} email={emp.email} doj={emp.doj}></EmpCards>
                )
            })}
        </div>
    </div>
  )
}

export default HRDash