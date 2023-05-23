import React from 'react';
import axios from 'axios';
//import {} from 'reactjs-input-validator';

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
        axios.get('http://localhost:3001/departments/viewall').then(response => {
            console.log(response)
            this.setState({
                DepartmentData: response.data.data
            });
        }); 
        axios.get('http://localhost:3001/roles').then(response => {
            // console.log(response.data);
            this.setState({
                RoleData: response.data.data
            });
        });
        axios.get('http://localhost:3001/employees').then(response => {
            this.setState({
                EmployeeData: response.data.data
            });
        });
        axios.get('http://localhost:3001/companies')
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
             axios.post(`http://localhost:3001/jobs/create`, user,
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
            <div style={{margin:'0px',justifyContent:'center'}}>
                <form onSubmit={this.handleSubmit}>
                    <div style={{display:'flex',flexDirection:'column',width:'500px',justifyContent:'right',alignItems:'center'}}>
                    <label>
                            Choose Company:
                            <select className="form-control" name="company" value={this.state.company}  onChange={this.handleChange}>
                                <option>Select Company</option>
                                {this.state.CompanyData.map((e, id) => {
                                    return <option value={e.id}>{e.name}</option>;
                                })}
                            </select>
                        </label>
                        <label>
                            Choose department:
                            <select className="form-control" name="department" value={this.state.department}  onChange={this.handleChange}>
                                <option>Select department</option>
                                {this.state.DepartmentData.map((e, id) => {
                                    return <option value={e.id}>{e.name}</option>;
                                })}
                            </select>
                        </label>
                        <br></br>
                        <label>
                            Title:
                            <input type="text" name="title" value={this.state.title} placeholder="Enter title" onChange={this.handleChange} />
                        </label>
                        <br></br>
                        <label>
                            Choose role:
                            <select className="form-control" name="role" value={this.state.role}  onChange={this.handleChange}>
                                <option>Select role</option>
                                {this.state.RoleData.map((e, id) => {
                                    return <option value={e.id}>{e.name}</option>;
                                })}
                            </select>
                        </label>
                        <br></br>
                        <label>
                            Description:
                            <textarea name="description" value={this.state.description} placeholder="Enter description" onChange={this.handleChange} />
                            {/* <div style={{ color: "red", paddingBottom: 10 }}>{this.state.addressError}</div> */}
                        </label>
                        <br></br>
                        <label>
                            Salary:
                            <input type="text" name="salary" value={this.state.salary} placeholder="Enter salary" onChange={this.handleChange} />
                        </label>
                        <br></br>
                        <label>
                            Choose Employee:
                            <select className="form-control" name="employee" value={this.state.employee}  onChange={this.handleChange}>
                                <option>Select Employee</option>
                                {this.state.EmployeeData.map((e, id) => {
                                    return <option value={e.id}>{e.name}</option>;
                                })}
                            </select>
                        </label>
                        <button type="submit">Submit</button>
                    </div>
                    
                </form>
            </div>
        )
    }
}

