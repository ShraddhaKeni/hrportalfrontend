import React from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
//import {} from 'reactjs-input-validator';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const initialState = {
    DepartmentData: [],
    title: "",
    RoleData: [],
    description: "",
    salary: "",
    EmployeeData: [],
    CompanyData:[]
}

export default class Jobs extends React.Component {
    state = initialState;

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    componentDidMount() {
        axios.get('http://localhost:3000/departments/viewall').then(response => {
            this.setState({
                DepartmentData: response.data.data
            });
        }); 
        axios.get('http://localhost:3000/roles').then(response => {
            // console.log(response.data);
            this.setState({
                RoleData: response.data.data
            });
        });
        axios.get('http://localhost:3000/employees').then(response => {
            this.setState({
                EmployeeData: response.data.data
            });
        });
        axios.get('http://localhost:3000/companies')
             .then(response=>{
                this.setState({
                    CompanyData:response.data.data
                })
             })
    }

    handleSubmit = event => {
        event.preventDefault();
            const user = {
                comp_id: this.state.company,
                dept_id: parseInt(this.state.department),
                title:this.state.title,
                role_id: parseInt(this.state.role),
                description:this.state.description,
                salary:this.state.salary,
                raised_by_emp:this.state.employee
            };
           console.log(user)
             axios.post(`http://localhost:3000/jobs/create`, user,
                {
                    'Content-type': 'application/json'
                })
                .then(res => {
                    console.log('success')
                    window.location.href='/viewJobs'
                }) 
            //clear form 
            this.setState(initialState);
       // }
    }

  
    render() {
        console.log(this.state)
        return (
            <>
            <Navbar/>
            <div className="mainAddCompanies">
          
                <h2>Add Job</h2>
                <form class="row g-3" onSubmit={this.handleSubmit}>
                <div class="col-12">
                    <label for="choosecompany" class="form-label InputLabel">Choose Company:</label>
                    <select class="form-select InputField" style={{ marginLeft: '0%'}} id="choosecompany" name="company" value={this.state.company}  onChange={this.handleChange} required>
                    <option>Select Company</option>
                                {this.state.CompanyData.map((e, id) => {
                                    return <option value={e.id}>{e.name}</option>;
                                })}
                        </select>
                </div> <div class="col-12">
                    <label for="choosedepartment" class="form-label InputLabel">Choose Department:</label>
                    <select class="form-select InputField" style={{marginLeft: '0%'}} id="choosedepartment" name="department" value={this.state.department}  onChange={this.handleChange} required> 
                    <option>Select Department</option>
                                {this.state.DepartmentData.map((e, id) => {
                                    return <option value={e.id}>{e.name}</option>;
                                })}
                        </select>
                </div>
                <div class="col-md-6">
                    <label for="Title" class="form-label SelectLabel">Enter Title:</label>
                    <input type="text" class="form-control SelectField" style={{marginLeft: '7%' , padding: '2%'}}  id="Title" name="title" value={this.state.title} placeholder="Enter title" onChange={this.handleChange}  required />
                </div>
                <div class="col-md-6">
                    <label for="role" class="form-label InputLabel">Choose role:</label>
                    <select id="role" class="form-control SelectField" style={{marginLeft: '5%' , padding: '2%'}}  name="role" value={this.state.role}  onChange={this.handleChange} required>
                    <option>Select role</option>
                                {this.state.RoleData.map((e, id) => {
                                    return <option value={e.id}>{e.name}</option>;
                                })}
                        </select>
                </div>
                <div class="col-12">
                    <label for="Description" class="form-label InputLabel">Description:</label>
                    <textarea class="form-control InputField" rows={3} id="Description" name="description" value={this.state.description} placeholder="Enter description" onChange={this.handleChange} required />
      </div>
      <div class="col-md-6">
                    <label for="salary" class="form-label SelectLabel">Salary:</label>
                    <input type="number" class="form-control SelectField" style={{marginLeft: '7%' , padding: '2%'}}  id="salary" name="salary" value={this.state.salary} placeholder="Enter salary" onChange={this.handleChange} required />
                </div>
                <div class="col-md-6">
                    <label for="Employee" class="form-label InputLabel">Choose Employee:</label>
                    <select id="Employee" class="form-control SelectField" style={{marginLeft: '5%' , padding: '2%'}} name="employee" value={this.state.employee}  onChange={this.handleChange} required>
                    <option>Select Employee</option>
                                {this.state.EmployeeData.map((e, id) => {
                                    return <option value={e.id}>{e.name}</option>;
                                })}
                        </select>
                </div>
                <div style={{marginTop: '12%', marginBottom: '2%'}}>
                    <Button className="SaveButton" type="submit">
                        Save
                    </Button>&nbsp;&nbsp;
                       
                            <Link to={{pathname: "/viewJobs"}}><Button className='CancelButton' type="cancel">
                                Cancel
                            </Button></Link>
                </div>

                </form>
            </div>
     
            </>
        )
    }
}

