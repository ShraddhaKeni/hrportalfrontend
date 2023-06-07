import React, { Component} from 'react'
import axios from 'axios';
import './updateJobs.css';
import Navbar from '../../components/Navbar';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const initialState = {
    DepartmentData: [],
    title: "",
    RoleData: [],
    description: "",
    salary: "",
    EmployeeData: [],
    department:'',
    job_id:''
}


export default class UpdateJobs extends Component {
  
    constructor(props)
    {
        super(props);
        this.state={
            DepartmentData: [],
            title: "",
            RoleData: [],
            description: "",
            salary: "",
            EmployeeData: [],
            department:'',
            job_id:this.props.job_id,
            job_details:{},
            role_details:{},
            employee_details:{},
            status:true
        }
        
    }
    description_ref = React.createRef()
    salary_ref = React.createRef()
    
    fetchDeparmentData()
    {
        axios.get('/departments/viewall')
            .then(response=>{
                this.setState({DepartmentData:response.data.data})
            })
    }
    fetchRoleData()
    {
        axios.get('/roles')
             .then(response=>{
                this.setState({RoleData:response.data.data})
             })
    }
    async fetchEmployeeData()
    {
        const {data} =await axios.get('/employees')
        this.setState({EmployeeData:data.data})
        console.log(this.state.EmployeeData);
    }

    handleSubmit=event=>{
        event.preventDefault();
        const job_id = this.state.job_id;
        const isBool = this.state.status.toString().toLowerCase()=='true' 
        const pathcData = {
            dept_id:parseInt(this.state.department),
            title:this.state.title,
            role_id:parseInt(this.state.role),
            description:this.description_ref.current.value,
            salary:this.salary_ref.current.value,
            raised_by_emp:this.state.employee,
            status:isBool
        }

        
        console.log(pathcData)
        axios.patch(`/jobs/update/${job_id}`,pathcData,{
            'Content-type':'application/json'
        })
        .then(()=>window.location.reload())
        .catch(err=>console.log(err))

    }

   async fetchJobDetails(id)
    {

        try {
            const {data} = await axios.get(`/jobs/find/${this.state.job_id}`)
            this.setState({job_details:data.data})
            this.setState({statusValue:this.state.job_details.status})
            //console.log(this.state.job_details)
            const response = await axios.get(`/roles/${this.state.job_details.role_id}`)
            this.setState({role_details:response.data.data})
            console.log(this.state)
            this.setState({title:this.state.job_details.title})


        } catch (error) {
            console.log(error)
        }
      
    }
   

    componentDidMount()
    {
        this.fetchDeparmentData()
        this.fetchRoleData();
        this.fetchEmployeeData();
        this.fetchJobDetails(this.state.job_id);
         
    }

  render() {
    
    return (
        <>
        <Navbar/>        
          <div className="mainAddCompanies" style={{marginTop:'7%'}}>
            <h2>Update Job</h2>
        <form class="row g-3" onSubmit={this.handleSubmit}>
        <div class="col-12 mb-3">
                    <label for="title" class="form-label InputLabel">Title:</label>
                    <input type="text" class="form-control InputField" id='title' name='title' defaultValue={this.state.job_details.title} onChange={(event=>{this.setState({[event.target.name]:event.target.value})})} placeholder='Enter Title' required />
                </div>
        <div class="col-md-6 mb-3">
                    <label for="department" class="form-label SelectLabel">Choose Department:</label>
                    <select class="form-select SelectField" style={{width: '87%', marginLeft: '0%'}} id="department" name='department' value={this.state.department} onChange={(event)=>{this.setState({[event.target.name]:event.target.value})}}>
                    <option value=''>Select Department</option>
                        {this.state.DepartmentData.map((item)=>{
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })}
                        </select>
                </div>
                <text id='dept_error' style={{color:'red'}}></text>
                <div class="col-md-6 mb-3">
                    <label for="role" class="form-label InputLabel">Choose Role:</label>
                    <select class="form-select SelectField" style={{width: '87%', marginLeft: '-2%'}} id='role' name='role' value={this.state.role_details.role_id} onChange={(event)=>{this.setState({[event.target.name]:event.target.value})}}>
                    <option value=''>Select Role</option>
                        {this.state.RoleData.map((item)=>{
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })}
                        </select>
                </div>
                <div class="col-12">
                    <label for="descp" class="form-label InputLabel">Description:</label>
                    <textarea class="form-control InputField" rows={3} id="descp" ref={this.description_ref} name='description' defaultValue={this.state.job_details.description} onChange={(event)=>{this.setState({[event.target.name]:event.target.value})}} placeholder='Describe here' required />
      </div>
      <div class="col-12 mb-3">
                    <label for="salary" class="form-label InputLabel">Salary:</label>
                    <input id='salary' class="form-control InputField" ref={this.salary_ref} type="number" name="salary" defaultValue={this.state.job_details.salary} placeholder="Enter salary" onChange={(event)=>{this.setState({[event.target.name]:event.target.value})}} required />
                </div>
                <div class="col-md-6 mb-3">
                    <label for="empl" class="form-label SelectLabel">Choose Employee:</label>
                    <select class="form-select SelectField" style={{width: '87%', marginLeft: '0%'}} id='empl' type='select' name='employee' defaultValue={this.state.employee} onChange={(event)=>{this.setState({[event.target.name]:event.target.value})}}>
                    <option>Select Employee</option>
                        {
                            this.state.EmployeeData.map((item)=>{
                               return <option key={item.id} value={item.id}>{item.name}</option>
                            })
                        }
                        </select>
                </div>
                <text id='dept_error' style={{color:'red'}}></text>
                <div class="col-md-6 mb-3">
                    <label for="role" class="form-label InputLabel">Status:</label>
                    <select class="form-select SelectField" style={{width: '87%', marginLeft: '-2%'}}  id='empl' type='select' name='employee' defaultValue={this.state.employee} onChange={(event)=>{this.setState({[event.target.name]:event.target.value})}}>
                        <option disabled>Select</option>
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                    </select>
                </div>
                <div style={{marginTop: '11%', marginBottom: '2%'}}>
                    <Button className="SaveButton" type="submit">
                        Submit
                    </Button>&nbsp;&nbsp;
            
                </div>
{/* OLD CODE */}

           
           
            {/* <lable>Choose Department:
                    <select id='dept' name='department' value={this.state.department} onChange={(event)=>{this.setState({[event.target.name]:event.target.value})}}>
                        <option value=''>Select Department</option>
                        {this.state.DepartmentData.map((item)=>{
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })}
                       
                    </select>
                    
            </lable>
            <text id='dept_error' style={{color:'red'}}></text>
            <lable style={{margin:'20px 0px'}}>Title: 
                    <input id='title' type='text' name='title' defaultValue={this.state.job_details.title} onChange={(event=>{this.setState({[event.target.name]:event.target.value})})}></input>
            </lable>
            <lable>Choose Role:
                    <select id='role' name='role' value={this.state.role_details.role_id} onChange={(event)=>{this.setState({[event.target.name]:event.target.value})}}>
                        <option value=''>Select Role</option>
                        {this.state.RoleData.map((item)=>{
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })}
                       
            </select>
            </lable>
            <label>Description:
                    <textarea id='descp' ref={this.description_ref} name='description' defaultValue={this.state.job_details.description} onChange={(event)=>{this.setState({[event.target.name]:event.target.value})}} />
            </label>
            <label>
                Salary:
                    <input id='salary' ref={this.salary_ref} type="number" name="salary" defaultValue={this.state.job_details.salary} placeholder="Enter salary" onChange={(event)=>{this.setState({[event.target.name]:event.target.value})}} />
            </label>
            <lable>Choose Employee:
                    <select id='empl' type='select' name='employee' defaultValue={this.state.employee} onChange={(event)=>{this.setState({[event.target.name]:event.target.value})}}>
                        <option>Select Employee</option>
                        {
                            this.state.EmployeeData.map((item)=>{
                               return <option key={item.id} value={item.id}>{item.name}</option>
                            })
                        }
            </select>
            </lable>
            <lable>Status:
                    <select id='status' name='status' value={this.setState.status} onChange={(event)=>{this.setState({[event.target.name]:event.target.value})}}>
                        <option disabled>Select</option>
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
            </select>
            </lable>
            <button type="submit" style={{width:'100px',alignItems:'center',marginLeft:'900px',marginTop:'20px'}}>Submit</button> */}
         
        </form>
        
    </div>
    </>

    )
  }
}


