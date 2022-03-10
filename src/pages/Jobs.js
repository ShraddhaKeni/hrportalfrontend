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
    }

    handleSubmit = event => {
        event.preventDefault();
            const user = {
                department: this.state.department
            };

             axios.post(`http://localhost:3000/companies/add`, user,
                {
                    'Content-type': 'application/json'
                })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                }) 
            //clear form 
            this.setState(initialState);
       // }
    }

  
    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
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
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

