import React from 'react';
import axios from 'axios';

const initialState = {
  name: "",
  nameError: ""
}

export default class Countries extends React.Component {
  state = initialState;

  handleChange = event => {
    this.setState({ name: event.target.value });
  }

  handleFormValidation() {    
   
    let nameError = ""; 
    if(!this.state.name){
      nameError = "Country cannot be empty";
      this.setState({nameError});
      return false;
    } else if (!(/^[aA-zZ\s]+$/.test(this.state.name)))  {      
      nameError = "Invalid country name";
      this.setState({nameError});
      return false;
    }     
  return true;
};   

  handleSubmit = event => {
    event.preventDefault();
    
    const isValid = this.handleFormValidation();
    if(isValid){
    const user = {
      name: this.state.name
    };

    axios.post(`http://localhost:3000/countries/create`, user ,
    {
      'Content-type':'application/json'
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
             Country Name:
            <input type="text" name="name" value={this.state.name}  placeholder="Enter country name" onChange={this.handleChange} />
           <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div>
          </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
