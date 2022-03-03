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
    /*  () => {
         const [startDate, setStartDate] = useState(new Date());
     } */

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
       console.log(event);
    }
    onFileChange = event => {
        console.log(event.target.files[0]);
        // Update the state
        this.setState({ selectedFile: event.target.files[0] }); // file data is stored in state

    };
    componentDidMount() {

        axios.get('http://localhost:3000/roles').then(response => {
            console.log(response.data);
            this.setState({
                RoleData: response.data
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
            fd.append('profile_pic', this.state.selectedFile);
            // const user = {
            //     username: this.state.username,
            //     password: this.state.password,
            //     dob: this.state.dob,
            //     contact_no: this.state.contactno,
            //     email: this.state.email,
            //     role_id: this.state.roleid,
            //     profile_pic: fd
            // };

            axios.post(`http://localhost:3000/users/signup`, fd,
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

    // fileUploadHandler = () => {
    //     const fd = new FormData();
    //     fd.append('image', this.state.selectedFile,this.state.selectedFile.name);
    //     axios.post(`http://localhost:3000/users/signup`, fd,
    //     {
    //         'Content-type': 'application/json'
    //     })
    //     .then(res =>{
    //         console.log(res);
    //     });
    // }

    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            User name:
                            <input type="text" name="username" value={this.state.username} placeholder="Enter name" onChange={this.handleChange} />
                            <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div>
                        </label>
                        <br></br>
                        <label>
                            Password:
                            <input type="password" name="password" value={this.state.password} placeholder="Enter password" onChange={this.handleChange} />
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
                            <input type="text" name="contactno" value={this.state.contactno} placeholder="Enter contact no" onChange={this.handleChange} />
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
                            <input type="file" name="uploadpic" value={this.state.uploadpic} placeholder="Enter email" onChange={this.onFileChange} />
                            {/* <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div> */}
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
