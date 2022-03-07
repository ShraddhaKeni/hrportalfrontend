import React from 'react';
import axios from 'axios';

const initialState = {
    username: "",
    nameError: "",
    password: "",
    roleid: "",
    contactno: "",
    email: "",
    dob: "",
    selectedFile: null,
    RoleData: [],
}
export default class Users extends React.Component {
    state = initialState;

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }
    onFileChange = event => {
        //console.log(event.target.files[0]);
        this.setState({ selectedFile: event.target.files[0] }); // file data is stored in state
        const image = event.target.files[0];  
         if(image.type !== "image/png" && image.type !== "image/jpg" && image.type !== "image/jpeg"){
             alert("Invalid file type");
             event.target.value = null; // clears file input
         }
    };
    componentDidMount() {

        axios.get('http://localhost:3000/roles').then(response => {
            // console.log(response.data);
            this.setState({
                RoleData: response.data.data
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
            const fd = new FormData();
            fd.append('username', this.state.username);
            fd.append('password', this.state.password);
            fd.append('dob', this.state.dob);
            fd.append('contact_no', this.state.contactno);
            fd.append('email', this.state.email);
            fd.append('role_id', this.state.roleid);
            //console.log(this.state.selectedFile);
            if (this.state.selectedFile != null) {
                fd.append('profile_pic', this.state.selectedFile);
            }
            axios.post(`http://localhost:3000/users/signup`, fd,
                {
                    'Content-type': 'application/json'
                })
                .then(res => {
                    //console.log(res);
                    //console.log(res.data);
                    alert("User details submitted successfully!");

                    //clear form 
                    this.setState(initialState);
                    window.location.reload(false);
                });
        }
    }

    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            User name:
                            <input type="text" name="username" value={this.state.username} placeholder="Enter name" maxLength="20" onChange={this.handleChange} />
                            <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div>
                        </label>
                        <br></br>
                        <label>
                            Password:
                            <input type="password" name="password" value={this.state.password} placeholder="Enter password" maxLength="32" onChange={this.handleChange} />
                            {/* <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div> */}
                        </label>
                        <br></br>
                        <label>
                            Choose role:
                            <select className="form-control" name="roleid" value={this.state.roleid} onChange={this.handleChange}>
                                <option>Select role</option>
                                {this.state.RoleData.map((e, id) => {
                                    return <option value={e.id}>{e.name}</option>;
                                })}
                            </select>
                        </label>
                        <br></br>
                        <label>
                            DOB:
                            <input type="date" name="dob" value={this.state.dob} placeholder="Enter dob" onChange={this.handleChange} />
                        </label>
                        <br></br>
                        <label>
                            Contact no.:
                            <input type="text" name="contactno" value={this.state.contactno} placeholder="Enter contact no" maxLength="10" onChange={this.handleChange} />
                            {/* <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div> */}
                        </label>
                        <br></br>
                        <label>
                            Email:
                            <input type="text" name="email" value={this.state.email} placeholder="Enter email" onChange={this.handleChange} />
                            {/* <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div> */}
                        </label>
                        <br></br>
                        <label>
                            Upload profile picture:
                            <input type="file" name="uploadpic" value={this.state.uploadpic} onChange={this.onFileChange} />
                            {/* <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div> */}
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
