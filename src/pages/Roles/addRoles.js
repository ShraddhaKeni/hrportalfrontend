import {Component} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//Changed the status from String to Boolean as backend only takes status as boolean and frontend was passing String value
//Due to which it was not getting updated in the Server.
export default class AddRoles extends Component {
  constructor(props){
    super(props)
    this.state = {
      role: this.props.id? this.props.id : " ",
      status: true,
      name: "",
    }
  }

  componentDidMount(){
    if(this.state.role !== " "){
      // axios.get('http://10.201.10.191:3000/roles/'+this.state.role).then(response => {
        axios.get('http://localhost:3000/roles/'+this.state.role).then(response => {
          this.setState({
              name: response.data.data.name
          });
      });
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }  

  handleSubmit = event => {
    event.preventDefault();

    var role = {}
    
    this.state.role === " " ? 
      role = {
        name: this.state.name,
      }
    : role = {
      name: this.state.name,
      status: this.state.status
    };

    this.state.role === " "? this.addRole(role) : this.editRole(role)

  }

  addRole(role){
    // axios.post(`http://10.201.10.191:3000/roles/add`, role ,
    axios.post(`http://localhost:3000/roles/add`, role ,
    {
      'Content-type':'application/json'
    }).then(res => {
      window.location.reload()
    })
  }

  editRole(role){
    // axios.patch(`http://10.201.10.191:3000/roles/`+this.state.role, role ,
    axios.patch(`http://localhost:3000/roles/`+this.state.role,role,
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
        {this.state.role === " "? <h2>Add Role</h2> : <h2>Edit Role</h2>}
        <label>Enter role name:</label>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" >
              <Form.Control type="text" name="name" placeholder="Enter role name" value={this.state.name} onChange={this.handleChange} required />
          </Form.Group>
          
          <br />
          {this.state.role !== " "?
            <label>Select status:</label>
          :
            ""
          }
          {this.state.role !== " "?
            <Form.Group className="mb-3">
                <select className="form-control" name="status" value={this.state.status} onChange={this.handleChange}>
                    <option>Select</option>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select>
            </Form.Group>
          :
            " "
          }

          <br/>
          <Button variant="success" type="submit">
              Save
          </Button>&nbsp;&nbsp;
          {this.state.role === " "?
              <Link to={{pathname: "/roles"}}><Button variant="danger" type="cancel">
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