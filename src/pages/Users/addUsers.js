import {Component} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
          axios.get('http://localhost:3000/users/'+this.state.user).then(response => {
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

        axios.get('http://localhost:3000/roles').then(response => {
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
            role_id: this.state.role_id,
            dob: this.state.dob,
            contact_no: this.state.contact_no,
            email: this.state.email,
            profile_pic: this.state.selectedFile,
        }
        : user = {
            username: this.state.username,
            password: this.state.password,
            role_id: this.state.role_id,
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
        axios.post(`http://localhost:3000/users/signup`, user ,
        {
            'Content-type':'application/json'
        }).then(res => {
            window.location.reload()
        })
    }

    editUser(user){
        axios.patch(`http://localhost:3000/users/`+this.state.user, user ,
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
                {this.state.company === " "? <h2>Add user details</h2> : <h2>Edit user details</h2>}
                <Form onSubmit={this.handleSubmit}>
                    <label>User name:</label>
                    <Form.Group className="mb-3" >
                        <Form.Control type="text" name="username" placeholder="Enter user name" value={this.state.username} onChange={this.handleChange} required />
                    </Form.Group>

                    <br/>

                    <label>Password:</label>
                    <Form.Group className="mb-3" >
                        <Form.Control type="password" name="password" placeholder="Enter password" value={this.state.password} onChange={this.handleChange} required />
                    </Form.Group>

                    <br/>
                    
                    <label>Choose role:</label>
                    <Form.Group className="mb-3">
                        <select className="form-control" name="role_id" value={this.state.role_id} onChange={this.handleChange}>
                            <option value="">Select role</option>
                            { this.state.RoleData.map((e) => (
                                <option value={e.id} key={e.id}>{e.name}</option>
                            ))
                            }
                        </select>
                    </Form.Group> 

                    <br/>
                    
                    <label>DOB:</label>
                    <Form.Group className="mb-3" >
                        <Form.Control type="date" name="dob" placeholder="YYYY/MM/DD" value={this.state.dob} onChange={this.handleChange} required />
                    </Form.Group>

                    <br/>

                    <label>Contact no.:</label>
                    <Form.Group className="mb-3" >
                        <Form.Control type="number" name="contact_no" value={this.state.contact_no} placeholder="Enter contact no" maxLength="10" onChange={this.handleChange} required />
                    </Form.Group>

                    <br/>

                    <label>Email:</label>
                    <Form.Group className="mb-3" >
                        <Form.Control type="email" name="email" value={this.state.email} placeholder="Enter email "  onChange={this.handleChange} required />
                    </Form.Group>

                    <br/>

                    <label>Upload profile picture:</label>
                    <Form.Group className="mb-3" >
                        <Form.Control type="file" name="uploadpic" value={this.state.uploadpic} onChange={this.onFileChange} />
                    </Form.Group>
                    
                    {this.state.user === " "? " " : <br/> }

                    {this.state.user === " "? " " : <label>Emergency no. 1:</label>}

                    {this.state.user === " "? 
                        " "
                    :
                        <Form.Group className="mb-3" >
                            <Form.Control type="number" name="emergency_no1" placeholder="Emergency no 1" value={this.state.emergency_no1} onChange={this.handleChange} />
                        </Form.Group> 
                    
                    }

                    {this.state.user === " "? " " : <br/>}

                    {this.state.user === " "? " " : <label>Emergency no. 2:</label>}

                    {this.state.user === " "?
                        " "
                    : 
                        <Form.Group className="mb-3" >
                            <Form.Control type="number" name="emergency_no2" placeholder="Emergency no 2" value={this.state.emergency_no2} onChange={this.handleChange} />
                        </Form.Group> 
                    }

                    {this.state.user === " "? " " : <br/>}

                    {this.state.user === " "? " " : <label>Status:</label>}

                    {this.state.user !== " "?
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

                    <br/>

                    <Button variant="success" type="submit">
                        Save
                    </Button>&nbsp;&nbsp;
                    {this.state.user === " "?
                        <Link to={{pathname: "/users"}}><Button variant="danger" type="cancel">
                            Cancel
                        </Button></Link>
                        : <Button variant="danger" type="cancel" onClick={() => {this.cancel()}}>
                        Cancel
                        </Button> 
                    }
                </Form>
            </div>
            
        )
    }
}

