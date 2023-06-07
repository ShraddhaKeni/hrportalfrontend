import axios from 'axios';
import React, { Component } from 'react'
import { Table, Button, } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import UpdateJobs from './UpdateJobs'
import Navbar from '../../components/Navbar';


const initialState = {
    jobData:[],
    roleData:[],
    employeeData:[],
    isEdit:false,
    editValue:[],
    job_id:''
}
export default class Viewjobs extends Component {
    state= initialState;
    
    fetchJobData()
    {
       
        axios.get('/jobs/findAll')
             .then(response=>{
                this.setState({jobData:response.data.data})
             })
             .catch(err=>console.log(err))
             
        
    }

    fetchRoleData()
    {
        axios.get('/roles')
             .then(response=>{
                this.setState({roleData:response.data.data})
                
             })
    }
    fetchEmployeeData()
    {
        axios.get('/employees')
             .then(response=>{
                this.setState({employeeData:response.data.data});
             })
    }
    componentDidMount()
    {
        this.fetchJobData()
        this.fetchRoleData()
        this.fetchEmployeeData()
        
    }
    getEmployeeName(id)
    {
        var emp = this.state.employeeData.find(x=>x.id===id)
        if(emp)
        {
            return emp.name
        }
        else{
            return '';
        }
    }
    getRoleName(id)
    {
        var role = this.state.roleData.find(x=>x.id===id)
        if(role)
        {
            return role.name;
        }
        else{
            return '';
        }
    }
    deleteJob(id)
    {
        console.log(id)
        const data = this.state.jobData.find(x=>x.id===id);
        if(data)
        {
            const patchData = {
                comp_id:data.comp_id,
                dept_id:data.dept_id,
                title:data.title,
                role_id:data.role_id,
                description:data.description,
                salary:data.salary,
                raised_by_emp:data.raised_by_emp,
                status:false
            }
            axios.patch(`/jobs/update/${id}`,patchData)
                .then(window.location.reload())
                .catch(err=>console.log(err))
        }
    }
   
    
  render() {
    var srno=1;
    if(this.state.isEdit===true)
    {
        return <UpdateJobs job_id={this.state.job_id}/>
    }
    else
    {
    return (
        <>
      <Navbar/>
      <div className='mainViewDesignation'>
      <div style={{display:'flex', margin: '3% 0% 0% 51%'}}>
                    <div><b><h1>Job Openings</h1></b></div>
                    <div style={{marginLeft: '2%'}}><Link to={{ pathname: "/jobs" }}><button className='viewAddDesignationButton btn btn-primary'>Add Jobs</button></Link></div>
                    </div>
   
                    {/* <h2>Jobs <span style={{float:'right'}}><Link to={{ pathname: "/jobs" }}><Button variant='success'><span style={{fontSize:18, color:"white"}}>&#43;</span></Button></Link></span></h2> */}
                    <div className='viewDesignationContainer table-responsive' style={{width:'62vw', marginLeft:'27%'}}>
                  
                    <table className='table table-sm table-hover' responsive>
                        <thead  >
                            <tr>
                                <th scope="col">Sr no.</th>
                                <th scope="col">Title</th>
                                <th scope="col">Role</th>
                                <th scope="col">Salary</th>
                                <th scope="col">Employee</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                            <tbody>
                                {this.state.jobData.map((item,index)=>{
                                           return( <tr key={item.id}>
                                                <td scope="row">{srno++}</td>
                                                <td>{item.title}</td>
                                                <td>{this.getRoleName(item.role_id)}</td>
                                                <td>{item.salary}</td>
                                                <td>{this.getEmployeeName(item.raised_by_emp)}</td>
                                                {item.status==true?<td><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
                                                : <td><span style={{fontSize:12, color:"red"}}>&#10060;</span></td>}
                                                <td>
                                                    <Button onClick={()=>{this.deleteJob(item.id);this.componentDidMount()}} style={{padding:'5px', marginRight:'5px'}} className='role_delete' value>Delete</Button>
                                                    <Button onClick={()=>this.setState({isEdit:true,job_id:item.id})} className='role_edit'>Edit</Button>
                                                </td>
                                            </tr>
                                            )
                                })}
                                
                            </tbody>
                        
                       
                    </table>
                </div>
                </div>
               

      </>
    )
    }
  }
}


