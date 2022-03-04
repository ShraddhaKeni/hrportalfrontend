import React from 'react';
import axios from 'axios';

const initialState = {
    username: "",
    nameError: "",
    password: "",
    roleid: "",
    dob: "",
    contactno: "",
    email: "",
    selectedFile: null,
    emergencycontact1: "",
    emergencycontact2: "",
    RoleData: [],
}
export default class Users extends React.Component {
    state = initialState;
    /*  () => {
         const [startDate, setStartDate] = useState(new Date());
     } */

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }
    onFileChange = event => {

        // Update the state
        this.setState({ selectedFile: event.target.files[0] });

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
                        <br></br>
                        <label>
                            Emergency contact number 1:
                            <input type="text" name="emergencycontact1" value={this.state.emergencycontact1} placeholder="Enter emergency contact 1" onChange={this.handleChange} />
                            {/* <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div> */}
                        </label>
                        <br></br>
                        <label>
                            Emergency contact number 2:
                            <input type="text" name="emergencycontact2" value={this.state.emergencycontact2} placeholder="Enter emergency contact 2" onChange={this.handleChange} />
                            {/* <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div> */}
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
