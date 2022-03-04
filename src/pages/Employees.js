// import { Button } from 'react-bootstrap/Button';
import Button from 'react-bootstrap/Button';
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
        const isValid = this.handleFormValidation();
        if (isValid) {
            const user = {
                username: this.state.name,
                password: this.state.password,
                dob: this.state.dob,
                contact_no: this.state.contactno,
                email: this.state.email,
                profile_pic: this.state.uploadpic,
                emergency_no1: this.state.emergencycontact1,
                emergency_no2: this.state.emergencycontact2,
                role_id: this.state.roleid,
            };
            axios.post(`http://localhost:3000/users/signup`, user,
                {
                    'Content-type': 'application/json'
                })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })
            //clear form 
            this.setState(initialState);
        }
    }

    render() {

        return (
            <div class="container">
                <div class="row">
                    <form onSubmit={this.handleSubmit}>



                        <div class="form-group">
                            <label>
                                Name:
                                <input type="text" name="name" value={this.state.name} placeholder="Enter name" onChange={this.handleChange} />
                                <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div>
                            </label>
                        </div>

                        <div class="form-group">
                            <label>
                                {/* Choose company: */}
                                <select className="form-control" name="company" value={this.state.company} onChange={this.handleChange} >
                                    <option>Select company</option>
                                    {this.state.CompData.map((e, id) => {
                                        return <option value={e.id}>{e.name}</option>;
                                    })}
                                </select>
                            </label>
                        </div>

                        <div class="form-group">
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

                        <div class="form-group">
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

                        <div class="form-group">
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

                        <div class="form-group">
                            <label>
                                Email:
                                <input type="email" name="email" value={this.state.email} placeholder="Enter your email" onChange={this.handleChange} />
                                <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div>
                            </label>
                        </div>

                        <div class="form-group">
                            <label>
                                Date of Joining:
                                <input type="date" name="doj" value={this.state.doj} placeholder="Date of joining" onChange={this.handleChange} />
                                <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div>
                            </label>
                        </div>

                        <div class="form-group">
                            <label>
                                Signature:
                                <input type="file" name="signature" value={this.state.signature} onChange={this.handleChange} />
                                <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div>
                            </label>
                        </div>

                        <div class="form-group">
                            <label>
                                Employee code:
                                <input type="text" name="emp_code" value={this.state.emp_code} placeholder="Enter Employee Code" onChange={this.handleChange} />
                                <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div>
                            </label>
                        </div>

                        <Button variant="primary" type="submit">Save</Button>
                    </form>
                </div>
            </div>
        )
    }
}
