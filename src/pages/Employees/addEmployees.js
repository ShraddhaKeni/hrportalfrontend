import { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class AddEmployees extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employee: this.props.id ? this.props.id : " ",
            name: "",
            comp_id: "",
            user_id: "",
            desig_id: "",
            dept_id: "",
            email: "",
            doj: null,
            signature: "",
            emp_code: "",
            CompData: [],
            UserData: [],
            DeptData: [],
            DesignData: [],
            status: "true",
            error: "",
        }
    }

    componentDidMount() {
        if (this.state.employee !== " ") {
            axios.get('http://localhost:3000/employees/' + this.state.employee).then(response => {
                this.setState({
                    name: response.data.data.name,
                    comp_id: response.data.data.comp_id,
                    user_id: response.data.data.user_id,
                    desig_id: response.data.data.desig_id,
                    dept_id: response.data.data.dept_id,
                    email: response.data.data.email,
                    doj: response.data.data.doj,
                    signature: response.data.data.signature,
                    emp_code: response.data.data.emp_code,
                    status: response.data.data.status,
                });
            });
        }

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

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        var employee = {}
        this.state.employee === " " ?
            employee = {
                name: this.state.name,
                comp_id: this.state.comp_id,
                user_id: this.state.user_id,
                desig_id: parseInt(this.state.desig_id),
                dept_id: parseInt(this.state.dept_id),
                email: this.state.email,
                doj: this.state.doj,
                signature: this.state.signature,
                emp_code: this.state.emp_code,

            }
            : employee = {
                name: this.state.name,
                comp_id: this.state.comp_id,
                user_id: this.state.user_id,
                desig_id: parseInt(this.state.desig_id),
                dept_id: parseInt(this.state.dept_id),
                email: this.state.email,
                doj: this.state.doj,
                signature: this.state.signature,
                emp_code: this.state.emp_code,
                status: this.state.status,
            }

        this.state.employee === " " ? this.addEmployee(employee) : this.editEmployee(employee)

    }

    addEmployee(employee) {
        axios.post(`http://localhost:3000/employees/create`, employee,
            {
                'Content-type': 'application/json'
            }).then(res => {
                console.log("printing result: ")
                console.log(res)
            }).catch((error) => {
                if (error.request) {
                    var err2 = new Error(error.request.response)
                    alert(JSON.parse(err2.message).message[0])
                    window.location.reload()
                }
            });
    }

    editEmployee(employee) {
        axios.patch(`http://localhost:3000/employees/` + this.state.employee, employee,
            {
                'Content-type': 'application/json'
            }).then(res => {
                window.location.reload()
            }).catch((error) => {
                if (error.request) {
                    var err2 = new Error(error.request.response)
                    alert(JSON.parse(err2.message).message[0])
                }
            });
    }

    cancel() {
        window.location.reload()
    }

    render() {
        return (
            <div className='main'>
                {this.state.employee === " " ? <h2>Add employee details</h2> : <h2>Edit employee details</h2>}
                <h4 className='errorMsg'>{this.state.error}</h4>
                <Form onSubmit={this.handleSubmit}>
                    <label>Name: <span className='req'>*</span></label>
                    <Form.Group className="mb-3" >
                        <Form.Control type="text" name="name" placeholder="Enter name" value={this.state.name} onChange={this.handleChange} required />
                    </Form.Group>

                    <br />

                    <label>Choose company: <span className='req'>*</span></label>
                    <Form.Group className="mb-3">
                        <select className="form-control" name="comp_id" value={this.state.comp_id} onChange={this.handleChange} required>
                            <option >Select company</option>
                            {this.state.CompData.map((e) => (
                                <option value={e.id} key={e.id}>{e.name}</option>
                            ))
                            }
                        </select>
                    </Form.Group>

                    <br />

                    <label>Choose user: <span className='req'>*</span></label>
                    <Form.Group className="mb-3">
                        <select className="form-control" name="user_id" value={this.state.user_id} onChange={this.handleChange} required>
                            <option >Select user</option>
                            {this.state.UserData.map((e) => (
                                <option value={e.id} key={e.id}>{e.username}</option>
                            ))
                            }
                        </select>
                    </Form.Group>

                    <br />

                    <label>Choose designation: <span className='req'>*</span></label>
                    <Form.Group className="mb-3">
                        <select className="form-control" name="desig_id" value={this.state.desig_id} onChange={this.handleChange} required>
                            <option >Select</option>
                            {this.state.DesignData.map((e) => (
                                <option value={e.id} key={e.id}>{e.name}</option>
                            ))
                            }
                        </select>
                    </Form.Group>

                    <br />

                    <label>Choose department: <span className='req'>*</span></label>
                    <Form.Group className="mb-3">
                        <select className="form-control" name="dept_id" value={this.state.dept_id} onChange={this.handleChange} required>
                            <option >Select</option>
                            {this.state.DeptData.map((e) => (
                                <option value={e.id} key={e.id}>{e.name}</option>
                            ))
                            }
                        </select>
                    </Form.Group>

                    <br />

                    <label>Email: <span className='req'>*</span></label>
                    <Form.Group className="mb-3" >
                        <Form.Control type="email" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} required />
                    </Form.Group>

                    <br />

                    <label>Date of joining: <span className='req'>*</span></label>
                    <Form.Group className="mb-3" >
                        <Form.Control type="date" name="doj" placeholder="Enter date of joining" value={this.state.doj} onChange={this.handleChange} required />
                    </Form.Group>

                    <br />

                    <label>Employee code: <span className='req'>*</span></label>
                    <Form.Group className="mb-3" >
                        <Form.Control type="text" name="emp_code" placeholder="Enter employee code" value={this.state.emp_code} onChange={this.handleChange} required />
                    </Form.Group>

                    {this.state.employee === " " ? " " : <br />}

                    {this.state.employee === " " ? " " : <label>Signature:</label>}

                    {this.state.employee === " " ?
                        " "
                        :
                        <Form.Group className="mb-3" >
                            <Form.Control type="file" name="signature" placeholder="Signature" value={this.state.signature} onChange={this.handleChange} />
                        </Form.Group>

                    }


                    {this.state.employee === " " ? " " : <br />}

                    {this.state.employee === " " ? " " : <label>Status:</label>}

                    {this.state.employee !== " " ?
                        <Form.Group className="mb-3">
                            <select className="form-control" name="status" value={this.state.status} onChange={this.handleChange}>
                                <option>Select</option>
                                <option value={"true"}>True</option>
                                <option value={"false"}>False</option>
                            </select>
                        </Form.Group>
                        :
                        " "
                    }

                    <br />

                    <Button variant="success" type="submit">
                        Save
                    </Button>&nbsp;&nbsp;
                    {this.state.employee === " " ?
                        <Link to={{ pathname: "/employees" }}><Button variant="danger" type="cancel">
                            Cancel
                        </Button></Link>
                        : <Button variant="danger" type="cancel" onClick={() => { this.cancel() }}>
                            Cancel
                        </Button>
                    }
                </Form>
            </div>
        )
    }
}
