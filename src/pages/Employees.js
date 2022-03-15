import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import { Button } from 'react-bootstrap/Button';
import React from 'react';
import axios from 'axios';

const initialState = {
    name: "",
    company: "",
    user: "",
    designation: "",
    department: "",
    email: "",
    doj: null,
    signature: "",
    emp_code: "",
    CompData: [],
    UserData: [],
    DeptData: [],
    DesignData: [],
};

export default class Employees extends React.Component {
    state = initialState;

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        // this.setState({ [event.target.dob]: event.target.value });
    }

    componentDidMount() {
        axios.get('http://localhost:3000/companies').then(response => {
            this.setState({
                CompData: response.data.data
            });
        });

        axios.get('http://localhost:3000/users/findAll').then(response => {
            this.setState({
                UserData: response.data.data
            });
        });

        axios.get('http://localhost:3000/departments/viewall').then(response => {
            this.setState({
                DeptData: response.data.data
            });
        });

        axios.get('http://localhost:3000/designation/findAll').then(response => {
            this.setState({
                DesignData: response.data.data
            });
        });
    }

    handleFormValidation() {
        let nameError = "";
        if (!this.state.username) {
            nameError = "User Name cannot be empty";
            this.setState({ nameError });
            return false;
        } else if (!(/^[aA-zZ\s]+$/.test(this.state.username))) {
            nameError = "Invalid user name";
            this.setState({ nameError });
            return false;
        }
        return true;
    }; 

    handleSubmit = event => {
        event.preventDefault();
       // const isValid = this.handleFormValidation();
       // if (isValid) {
            const data = {
                name: this.state.name,
                comp_id: this.state.company,
                user_id: this.state.user,   //column name:value
                desig_id: +this.state.designation,
                dept_id: +this.state.department,
                email: this.state.email, 
                doj: this.state.doj,
                emp_code: this.state.emp_code,
               
            };
            
            axios.post(`http://localhost:3000/employees/create`, data,
                {
                    'Content-type': 'application/json'
                }).then(res => {
                    alert("Employees details submitted successfully!");
                    this.setState(initialState);
                    window.location.reload(false);
                });
        //}
    }

    render() {

        return (
            <Form className='form-data' onSubmit={this.handleSubmit} >

                <FormGroup>
                    <Label>Name: </Label>
                    <Input type="text" name="name" value={this.state.name} placeholder="Enter name" onChange={this.handleChange} />
                    <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div>
                </FormGroup>
            
                <div className="form-group">
                    <label>
                        Choose company:
                        <select className="form-control" name="company" value={this.state.company} onChange={this.handleChange} >
                            <option>Select company</option>
                            {this.state.CompData.map((e, id) => {
                                return <option value={e.id}>{e.name}</option>;
                            })}
                        </select>
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        {/* Choose User: */}
                        <select className="form-control" name="user" value={this.state.user} onChange={this.handleChange} >
                            <option>Select user</option>
                            {this.state.UserData.map((e, id) => {
                                return <option value={e.id}>{e.username}</option>;
                            })}
                        </select>
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        {/* Choose Department: */}
                        <select className="form-control" name="department" value={this.state.department} onChange={this.handleChange} >
                            <option>Select Department</option>
                            {this.state.DeptData.map((e, id) => {
                                return <option value={e.id}>{e.name}</option>;
                            })}
                        </select>
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        {/* Choose Designation: */}
                        <select className="form-control" name="designation" value={this.state.designation} onChange={this.handleChange} >
                            <option>Select designation</option>
                            {this.state.DesignData.map((e, id) => {
                                return <option value={e.id}>{e.name}</option>;
                            })}
                        </select>
                    </label>
                </div>

                <FormGroup>
                    <Label>Email: </Label>
                    <Input type="email" name="email" value={this.state.email} placeholder="Enter your email" onChange={this.handleChange} />
                    <div style={{ color: "red", paddingBottom: 10 }}>{this.state.emailError}</div>
                </FormGroup>

                <FormGroup>
                    <Label>Date of Joining: </Label>
                    <Input type="date" name="doj" value={this.state.doj} placeholder="Date of joining" onChange={this.handleChange} />
                    <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div>
                </FormGroup>

                {/* <FormGroup>
                    <Label>Signature: </Label>
                    <Input type="file" name="signaturee" value={this.state.signaturee} onChange={this.onFileChange} />
                    <div style={{ color: "red", paddingBottom: 10 }}>{this.state.signatureError}</div>
                </FormGroup> */}

                <FormGroup>
                    <Label>Employee code:: </Label>
                    <Input type="text" name="emp_code" value={this.state.emp_code} placeholder="Enter Employee Code" onChange={this.handleChange} />
                    <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div>
                </FormGroup>

                <Button className="btn btn-success" type="submit">Save</Button>
            </Form>
        )
    }
}
