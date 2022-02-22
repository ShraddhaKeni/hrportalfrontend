import React from 'react';
import axios from 'axios';

const initialState = {
  name: "",
  nameError: ""
}

export default class Roles extends React.Component {
  state = initialState;

  handleChange = event => {
    this.setState({ name: event.target.value });
  }

  handleFormValidation() {    
   
    let nameError = ""; 
    if(!this.state.name){
      nameError = "Role name cannot be empty";
    } else if (!this.state.name.includes("a-zA-Z"))  {      
      nameError = "Invalid role name";
    } 
     
    if(nameError){
      this.setState({nameError});
      return false;
    }
  return true;
};   

  handleSubmit = event => {
    event.preventDefault();
    
    const isValid = this.handleFormValidation();
    if(isValid){
      console.log(this.state);
      //clear form 
      this.setState(initialState);
    }
    

    const user = {
      name: this.state.name
    };

    axios.post(`http://localhost:3200/roles/add`, user ,
    {
      'Content-type':'application/json'
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
  
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
          <label>
            Role Name:
            <input type="text" name="name" value={this.state.name}  placeholder="Enter role name" onChange={this.handleChange} />
           <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div>
          </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
