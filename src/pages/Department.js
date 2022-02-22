import React from 'react';
import axios from 'axios';

export default class Department extends React.Component {
   state = {
     name: ''
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      name: this.state.name
    };

    axios.post(`http://localhost:3200/departments/add`, user ,
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
          <label>
            Department Name:
            <input type="text" name="name" onChange={this.handleChange} required/>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
