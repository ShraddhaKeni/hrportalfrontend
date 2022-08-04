import React, { Component} from 'react'
import axios from 'axios';
import './updateJobs.css';

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
        axios.get('http://localhost:3000/departments/viewall')
            .then(response=>{
                this.setState({DepartmentData:response.data.data})
            })
    }
    fetchRoleData()
    {
        axios.get('http://localhost:3000/roles')
             .then(response=>{
                this.setState({RoleData:response.data.data})
             })
    }
    async fetchEmployeeData()
    {
        const {data} =await axios.get('http://localhost:3000/employees')
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
        axios.patch(`http://localhost:3000/jobs/update/${job_id}`,pathcData,{
            'Content-type':'application/json'
        })
        .then(()=>window.location.reload())
        .catch(err=>console.log(err))

    }

   async fetchJobDetails(id)
    {

        try {
            const {data} = await axios.get(`http://localhost:3000/jobs/find/${this.state.job_id}`)
            this.setState({job_details:data.data})
            this.setState({statusValue:this.state.job_details.status})
            //console.log(this.state.job_details)
            const response = await axios.get(`http://localhost:3000/roles/${this.state.job_details.role_id}`)
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
        <div>
            
        <form onSubmit={this.handleSubmit}>
            <div className='update_jobs_form' style={{display:'flex',flexDirection:'column',padding:'10px'}}>
            <lable>Choose Department:
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
            <button type="submit" style={{width:'100px',alignItems:'center',marginLeft:'900px',marginTop:'20px'}}>Submit</button>
            </div>
        </form>
        
    </div>
    )
  }
}

