import React, {Component} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/Designation.css'

export default class AddDesignation extends Component {
  constructor(props){
    super(props)
    this.state = {
      design: this.props.id? this.props.id : " ",
      status: true,
      name: "",
      nameError: "",
    }
  }

  componentDidMount(){
    if(this.state.design !== " "){
      axios.get('http://localhost:3000/designation/find/'+this.state.design).then(response => {
          this.setState({
              name: response.data.data.name
          });
      });
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleFormValidation() {    
   
    let nameError = ""; 
    if(!this.state.name){
      nameError = "Designation name cannot be empty";
      this.setState({nameError});
      return false;
    } else if (!(/^[aA-zZ\s]+$/.test(this.state.name)))  {      
      nameError = "Invalid designation name";
      this.setState({nameError});
      return false;
    } 

    return true;
  };   

  handleSubmit = event => {
    event.preventDefault();

    var designation = {}
    
    this.state.design === " " ? 
      designation = {
        name: this.state.name,
      }
    : designation = {
      name: this.state.name,
      status: this.state.status
    };

    this.state.design === " "? this.addDesignation(designation) : this.editDesignation(designation)


  }

  addDesignation(designation){
    axios.post(`http://localhost:3000/designation/create`, designation ,
    {
      'Content-type':'application/json'
    }).then(res => {
      window.location.reload()
    })
  }

  editDesignation(designation){
    console.log(designation)
    axios.patch(`http://localhost:3000/designation/update/`+this.state.design, designation ,
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
      <div className='mainDesignation'>
        <div className="mainAddDesignation">
        {this.state.design === " "? <h2>Add Designation</h2> : <h2>Edit Designation</h2>}
        <Form onSubmit={this.handleSubmit}>
          <label style={{marginLeft:"80px"}}>Enter designation name:</label>
          <Form.Group className="mb-3" >
              <Form.Control type="text" style={{marginLeft:"80px",width:"80%"}} name="name" placeholder="Enter designation name" value={this.state.name} onChange={this.handleChange} required />
          </Form.Group>
          
          <br />
          {this.state.design !== " "?
            <label style={{marginLeft:"80px"}}>Select status:</label>
          :
            ""
          }
          {this.state.design !== " "?
            <Form.Group className="mb-3">
                <select className="form-control" style={{marginLeft:"80px",width:"80%"}} name="status" placeholder='Select' value={this.state.status} onChange={this.handleChange}>
                  <option disabled>Select</option>
                    <option value={true}>True</option>
                    <option value={false}>False</option>  
                </select>
            </Form.Group>
          :
            " "
          }

          <br/>
          <Button className="saveButton" type="submit">
              Save
          </Button>&nbsp;&nbsp;
          {this.state.design === " "?
              <Link to={{pathname: "/designation"}}><Button className="cancelButton" type="cancel">
                  Cancel
              </Button></Link>
            : <Button className="cancelButton" type="cancel" onClick={() => {this.cancel()}}>
              Cancel
              </Button> 
          }
        </Form>
      </div>
      </div>
    )
  }
}
