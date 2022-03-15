import React, {Component} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default class AddDesignation extends Component {
  constructor(props){
    super(props)
    this.state = {
      depart: this.props.id? this.props.id : " ",
      status: "true",
      name: "",
      nameError: "",
    }
  }

  componentDidMount(){
    if(this.state.depart !== " "){
      axios.get('http://localhost:3000/departments/'+this.state.depart).then(response => {
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

    var department = {}
    
    this.state.depart === " " ? 
    department = {
        name: this.state.name,
      }
    : department = {
      name: this.state.name,
      status: this.state.status
    };

    this.state.depart === " "? this.addDepartment(department) : this.editDepartment(department)

  }

  addDepartment(department){
    axios.post(`http://localhost:3000/departments/add`, department ,
    {
      'Content-type':'application/json'
    }).then(res => {
      window.location.reload()
    })
  }

  editDepartment(department){
    console.log(department)
    axios.patch(`http://localhost:3000/departments/`+this.state.depart, department ,
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
        {this.state.depart === " "? <h2>Add Department</h2> : <h2>Edit Department</h2>}
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" >
              <Form.Control type="text" name="name" placeholder="Enter department name" value={this.state.name} onChange={this.handleChange} required />
          </Form.Group>
          
          <br />
          {this.state.depart !== " "?
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
          {this.state.depart === " "?
              <Link to={{pathname: "/department"}}><Button variant="danger" type="cancel">
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
