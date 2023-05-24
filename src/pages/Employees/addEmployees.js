import { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/addEmployee.css'
import Navbar from '../../components/Navbar';

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
            axios.get('http://localhost:3001/employees/' + this.state.employee).then(response => {
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

       

        axios.get('http://localhost:3001/companies').then(response => {
            this.setState({
                CompData: response.data.data
            });
        });

        axios.get('http://localhost:3001/users/findAll').then(response => {
            this.setState({
                UserData: response.data.data
            });
        });

        axios.get('http://localhost:3001/departments/viewall').then(response => {
            this.setState({
                DeptData: response.data.data
            });
        });

        axios.get('http://localhost:3001/designation/findAll').then(response => {
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
        const isBool = this.state.status.toString().toLowerCase()=='true'
        var employee = {}
        this.state.employee === " " ?
            employee = {
                name: this.state.name,
                comp_id: this.state.comp_id,
                user_id: this.state.user_id,
                desig_id: parseInt(this.state.desig_id),
                dept_id: parseInt(this.state.dept_id),
                email: this.state.email,
                status:true,
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
                status: isBool,
            }

        this.state.employee === " " ? this.addEmployee(employee) : this.editEmployee(employee)
  
    }

    addEmployee(employee) {
        console.log(employee)
        axios.post(`http://localhost:3001/employees/create`, employee,
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
        console.log(employee)
        axios.patch(`http://localhost:3001/employees/` + this.state.employee, employee,
            {
                'Content-type': 'application/json'
            }).then(res => {
            
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
            <>
            <Navbar/>
            <div className='mainAddCompanies' style={{width: '45vw', marginTop: '8%', marginLeft:'34%'}}>
                {this.state.employee === " " ? <h2>Add Employee Details</h2> : <h2>Edit Employee Details</h2>}
                <h4 className='errorMsg'>{this.state.error}</h4>
               
                <form class="row g-3" onSubmit={this.handleSubmit}>
                <div class="col-12">
                    <label for="name" class="form-label InputLabel" >Name: <span className='req'>*</span></label>
                    <input type="text" class="form-control InputField" id="name" name="name" placeholder="Enter name" value={this.state.name} onChange={this.handleChange} required  />
                </div>
                <div class="col-md-6">
                    <label for="choosecompany" class="form-label SelectLabel">Choose company: <span className='req'>*</span></label>
                    <select class="form-select SelectField" id="choosecompany" name="comp_id" value={this.state.comp_id} onChange={this.handleChange} required>
                    <option value="">Select</option>
                    {this.state.CompData.map((e) => (
                                <option value={e.id} key={e.id}>{e.name}</option>
                            ))
                            }
                        </select>
                </div>
                <div class="col-md-6">
                    <label for="chooseuser" class="form-label InputLabel">Choose user: <span className='req'>*</span></label>
                    <select class="form-select SelectField" style={{width: '87%', marginLeft: '-2%'}} id="chooseuser" name="user_id" value={this.state.user_id} onChange={this.handleChange} required>
                    <option value="">Select</option>
                    {this.state.UserData.map((e) => (
                                <option value={e.id} key={e.id}>{e.username}</option>
                            ))
                            }
                        </select>
                </div>
                <div class="col-md-6">
                    <label for="choosedesignation" class="form-label SelectLabel">Choose designation: <span className='req'>*</span></label>
                    <select class="form-select SelectField" id="choosedesignation" name="desig_id" value={this.state.desig_id} onChange={this.handleChange} required>
                    <option value="">Select</option>
                    {this.state.DesignData.map((e) => (
                                <option value={e.id} key={e.id}>{e.name}</option>
                            ))
                            }
                        </select>
                </div>
                <div class="col-md-6">
                    <label for="choosedepartment" class="form-label InputLabel">Choose department: <span className='req'>*</span></label>
                    <select class="form-select SelectField" style={{width: '87%', marginLeft: '-2%'}} id="choosedepartment"  name="dept_id" value={this.state.dept_id} onChange={this.handleChange} required>
                    <option value="">Select</option>
                    {this.state.UserData.map((e) => (
                                <option value={e.id} key={e.id}>{e.username}</option>
                            ))
                            }
                        </select>
                </div>
                <div class="col-md-6">
                    <label for="email" class="form-label SelectLabel">Email: <span className='req'>*</span></label>
                    <input class="form-control SelectField" style={{marginLeft: '8%' , padding: '2%'}} id="email" type="email" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} required/>
                </div>
                <div class="col-md-6">
                    <label for="date" class="form-label InputLabel">Date of joining: <span className='req'>*</span></label>
                    <input type="date" class="form-control SelectField" style={{marginLeft: '5%' , padding: '0%'}}  id="date" name="doj" placeholder="Enter date of joining" value={this.state.doj} onChange={this.handleChange} required  />
                </div>
                <div class="col-md-6">
                    <label for="code" class="form-label SelectLabel">Employee code: <span className='req'>*</span></label>
                    <input class="form-control SelectField" style={{marginLeft: '8%' , padding: '2%'}} id="code" type="text" name="emp_code" placeholder="Enter employee code" value={this.state.emp_code} onChange={this.handleChange} required />
                </div>
                {this.state.employee === " " ? " " : <br />}
                <div class="col-md-6">
                    <label for="Signature" class="form-label InputLabel">Signature:<span className='req'>*</span></label>
                    <input type="file" class="form-control SelectField" style={{marginLeft: '5%' , padding: '2%'}}  id="Signature" name="doj" placeholder="Enter date of joining" value={this.state.doj} onChange={this.handleChange} required  />
                </div>
          






                <br />

{/* 
                  <div className={this.state.employee===' '?'':'signature_edit'}>            
                 <label className='addCompany_signature_lable'>Signature:</label>

                        <Form.Group className="mb-3" >
                            <input className='addCompany_signature' type="file" name="signature" placeholder="Signature" value={this.state.signature} onChange={this.handleChange} />
                        </Form.Group>
                        </div>   */}


                    {this.state.employee === " " ? " " : <br />}

                    {this.state.employee === " " ? " " : <label className='addEmployee_status_lable'>Status:</label>}

                    {this.state.employee !== " " ?
                        <Form.Group className="mb-3">
                            <select className="addEmployee_status" name="status" value={this.state.status} onChange={this.handleChange}>
                                <option>Select</option>
                                <option value={"true"}>True</option>
                                <option value={"false"}>False</option>
                            </select>
                        </Form.Group>
                        :
                        " "
                    }

                   
                    <br />
                    <div style={{marginTop: '36%'}}>
                    <Button className="SaveButton" type="submit">
                        Save
                    </Button>&nbsp;&nbsp;
                        {this.state.company === " "?
                            <Link to={{pathname: "/employees"}}><Button className='CancelButton' type="cancel">
                                Cancel
                            </Button></Link>
                            : <Button className='CancelButton' type="cancel" onClick={() => {this.cancel()}}>
                            Cancel
                            </Button> 
                        }
                   
                    </div>
                    {/* <div className={this.state.employee===' '? 'addEmployee_buttons':'addEmployee_buttons_edit'}>
                    <button className='save_employee' type="submit">
                        Save
                    </button>   
                    {this.state.employee === " " ?
                        <button className='cancel_employee' onClick={()=>window.history.back()} type="cancel">
                            Cancel
                        </button>
                        : <button className='cancel_employee' type="cancel" onClick={() => { this.cancel() }}>
                            Cancel
                        </button>
                    }
                    </div> */}
                
                </form>
                </div>
                </>
        )
    }
}
