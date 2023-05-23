import {Component} from 'react';
import axios from 'axios';
import { Form, button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style/addRole.css'

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
        axios.get('http://localhost:3001/roles/'+this.state.role).then(response => {
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
    axios.post(`http://localhost:3001/roles/add`, role ,
    {
      'Content-type':'application/json'
    }).then(res => {
      window.location.reload()
    })
  }

  editRole(role){
    // axios.patch(`http://10.201.10.191:3000/roles/`+this.state.role, role ,
    axios.patch(`http://localhost:3001/roles/`+this.state.role,role,
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
        <div className='addRole_form_container'>
        <form className='addRole_form' onSubmit={this.handleSubmit}>
          <div className={this.state.role=== ' '? 'role_name_container':'role_name_container_edit'}>
          <label className='role_name_lable'>Enter role name:</label>
            <Form.Group className="mb-3" >
                <input type="text" className='role_name' name="name" placeholder="Enter role name" value={this.state.name} onChange={this.handleChange} required />
            </Form.Group>
            
            <br />
          </div>
          {this.state.role !== " "?
            <label className='role_status_lable'>Select status:</label>
          :
            ""
          }
          {this.state.role !== " "?
            <Form.Group className="mb-3">
                <select className="role_status" name="status" value={this.state.status} onChange={this.handleChange}>
                    <option>Select</option>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select>
            </Form.Group>
          :
            " "
          }

          <br/>
          <div className='role_buttons'>
          <button className='save_role' type="submit">
              Save
          </button>
          {this.state.role === " "?
              <Link to={{pathname: "/roles"}}><button className='cancel_role' type="cancel">
                  Cancel
              </button></Link>
            : <button className='cancel_role' type="cancel" onClick={() => {this.cancel()}}>
              Cancel
              </button> 
          }
          </div>
        </form>
        </div>
      </div>
    )
  }
}
