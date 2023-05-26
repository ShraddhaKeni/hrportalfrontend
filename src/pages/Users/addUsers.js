import {Component} from 'react';
import axios from 'axios';
import { Form, button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style/addUsers.css'

export default class AddUsers extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: this.props.id? this.props.id : " ",
            username: "",
            password: "",
            role_id: "",
            dob: "",
            contactno: "",
            email: "",
            selectedFile: null,
            emergency_no1: "",
            emergency_no2: "",
            RoleData: [],
            status: "true",
        }
    }

    componentDidMount(){
        if(this.state.user !== " "){
          axios.get('http://localhost:3001/users/'+this.state.user).then(response => {
              this.setState({
                  username: response.data.data.username,
                  password: response.data.data.password,
                  role_id: response.data.data.role_id,
                  dob: response.data.data.dob,
                  contact_no: response.data.data.contact_no,
                  email: response.data.data.email,
                  selectedFile: response.data.data.selectedFile,
                  emergency_no1: response.data.data.emergency_no1,
                  emergency_no2: response.data.data.emergency_no2,
                  status: response.data.data.status,
              });
          });
        }

        axios.get('http://localhost:3001/roles').then(response => {
            this.setState({
                RoleData: response.data.data
            });
        });
    }

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] }); 
        const image = event.target.files[0];  
         if(image.type !== "image/png" && image.type !== "image/jpg" && image.type !== "image/jpeg"){
             alert("Invalid file type");
             event.target.value = null;
         }
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        
        var user = {}
        this.state.user === " "?
        user = {
            username: this.state.username,
            password: this.state.password,
            role_id: parseInt(this.state.role_id),
            dob: this.state.dob,
            contact_no: this.state.contact_no,
            email: this.state.email,
            profile_pic: this.state.selectedFile,
        }
        : user = {
            username: this.state.username,
            password: this.state.password,
            role_id: parseInt(this.state.role_id),
            dob: this.state.dob,
            contact_no: this.state.contact_no,
            email: this.state.email,
            profile_pic: this.state.selectedFile,
            emergency_no1: this.state.emergency_no1,
            emergency_no2: this.state.emergency_no2,
            status: this.state.status,
        }

        this.state.user === " "? this.addUser(user) : this.editUser(user)
        
    }

    addUser(user){
        console.log(user)
        axios.post(`http://localhost:3001/users/signup`, user ,
        {
            'Content-type':'application/json'
        }).then(res => {
            window.location.reload()
        })
    }

    editUser(user){
        const isBool = user.status.toString().toLowerCase()=='true'
        const data = {
            contact_no: user.contact_no,
            dob: user.dob,
            email: user.email,
            emergency_no1: user.emergency_no1,
            emergency_no2: user.emergency_no2,
            password: user.password,
            profile_pic: ' ',
            role_id: parseInt(user.role_id),
            status: isBool,
            username: user.username,
        }
        console.log(this.state.user)
        axios.patch(`http://localhost:3001/users/`+this.state.user, data ,
        {
            'Content-type':'application/json'
        }).then(res => {
            window.location.reload()
        })
    }

    cancel(){
        window.location.reload()
    }
 
    render() {

        return (
            <div className='main'>
                {this.state.user === " "? <h2>Add user details</h2> : <h2>Edit user details</h2>}
                <form className={this.state.user === " "? 'addUser_form' : 'addUser_form_edit'} onSubmit={this.handleSubmit}>
                    <div className='form_container_addUser'>
                    <label className='addUser_name_label'>User name:</label>
                    <Form.Group className="mb-3" >
                        <input className='addUser_name' type="text" name="username" placeholder="Enter user name" value={this.state.username} onChange={this.handleChange} required />
                    </Form.Group>

                    <br/>

                    <label className='addUser_password_lable'>Password:</label>
                    <Form.Group className="mb-3" >
                        <input className='addUser_password' type="password" name="password" placeholder="Enter password" defaultValue={this.state.password} onChange={this.handleChange}/>    
                    </Form.Group>

                    <br/>
                    
                    <label className='addUser_role_lable'>Choose role:</label>
                    <Form.Group className="mb-3">
                        <select className="addUser_role" name="role_id" value={this.state.role_id} onChange={this.handleChange}>
                            <option value="">Select role</option>
                            { this.state.RoleData.map((e) => (
                                <option value={e.id} key={e.id}>{e.name}</option>
                            ))
                            }
                        </select>
                    </Form.Group> 

                    <br/>
                    
                    <label className='addUser_dob_lable'>DOB:</label>
                    <Form.Group className="mb-3" >
                        <input type="date" className='addUser_dob' name="dob" placeholder="YYYY/MM/DD" value={this.state.dob} onChange={this.handleChange} required />
                    </Form.Group>

                    <br/>

                    <label className='addUser_contact_lable'>Contact no.:</label>
                    <Form.Group className="mb-3" >
                        <input type="number" className='addUser_contact' name="contact_no" value={this.state.contact_no} placeholder="Enter contact no" maxLength="10" onChange={this.handleChange} required />
                    </Form.Group>

                    <br/>

                    <label className='addUser_email_lable'>Email:</label>
                    <Form.Group className="mb-3" >
                        <input type="email" className='addUser_email' name="email" value={this.state.email} placeholder="Enter email "  onChange={this.handleChange} required />
                    </Form.Group>

                    <br/>

                    <label className='addUser_profile_lable'>Upload profile picture:</label>
                    <Form.Group className="mb-3" >
                        <input className='addUser_profile' type="file" name="uploadpic" value={this.state.uploadpic} onChange={this.onFileChange} />
                    </Form.Group>
                    
                    {this.state.user === " "? " " : <br/> }

                    {this.state.user === " "? " " : <label className='addUser_emergency1_lable'>Emergency no. 1:</label>}

                    {this.state.user === " "? 
                        " "
                    :
                        <Form.Group className="mb-3" >
                            <input type="number" className='addUser_emergency1' name="emergency_no1" placeholder="Emergency no 1" value={this.state.emergency_no1} onChange={this.handleChange} />
                        </Form.Group> 
                    
                    }

                    {this.state.user === " "? " " : <br/>}

                    {this.state.user === " "? " " : <label className='addUser_emergency2_lable'>Emergency no. 2:</label>}

                    {this.state.user === " "?
                        " "
                    : 
                        <Form.Group className="mb-3" >
                            <input type="number" className='addUser_emergency2' name="emergency_no2" placeholder="Emergency no 2" value={this.state.emergency_no2} onChange={this.handleChange} />
                        </Form.Group> 
                    }

                    {this.state.user === " "? " " : <br/>}

                    {this.state.user === " "? " " : <label className='addUser_status_lable'>Status:</label>}

                    {this.state.user !== " "?
                        <Form.Group className="mb-3">
                            <select className="addUser_status" name="status" value={this.state.status} onChange={this.handleChange}>
                                <option>Select</option>
                                <option value={"true"}>True</option>
                                <option value={"false"}>False</option>
                            </select>
                        </Form.Group>
                    :
                        " "
                    }

                    <br/>
                        <div className={this.state.user===" "?'user_buttons':'user_buttons_edit'}>
                            <button className='save_User' type="submit">
                                Save
                            </button>
                            {this.state.user === " "?
                                <Link to={{pathname: "/users"}}><button className='cancel_User' type="cancel">
                                    Cancel
                                </button></Link>
                                : <button className='cancel_User' type="cancel" onClick={() => {this.cancel()}}>
                                Cancel
                                </button> 
                            }
                        </div>
                    </div>
                </form>
            </div>
            
        )
    }
}

