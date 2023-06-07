import {Component} from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import './style/viewEachUser.css';

export default class ViewUsers extends Component {
  constructor(props){
    super(props)
    this.state = {
      user_id: this.props.id,
      user: [],
      role: "",
    }
  }  

  componentDidMount(){
    axios.get('/users/'+this.state.user_id).then(response => {
        this.setState({
            user: response.data.data
        });
        axios.get('/roles/'+this.state.user.role_id).then(role_res =>{
            this.setState({
                role: role_res.data.data.name
            });
        }); 
    });
  }

  goBack(){
    window.location.reload()
  }

  render() {

    return (
        <div className='main'>
            <h2>User Details</h2>
            <h2 >
                <span style={{float:"left"}}><button className='user_back' onClick={() => {this.goBack()}}>Back</button></span> 
                
            </h2>
            
            {this.state.user.profile_pic !== null || this.state.user.profile_pic !== ""? <div className='profile_picture'> {this.state.user.profile_pic} </div>: ""}
            <div className='user_container'>
            <table className='user_view_table'>
                <tbody>
                    <tr className='left'>
                        <th>Name: </th>
                        <td>{this.state.user.username}</td>
                    </tr>
                    <tr className='left'>
                        <th>Role: </th>
                        <td>{this.state.role}</td>
                    </tr>
                    <tr className='left'>
                        <th>Date of birth: </th>
                        <td>{this.state.user.dob}</td>
                    </tr>
                    <tr className='left'>
                        <th>Contact no: </th>
                        <td>{this.state.user.contact_no}</td>
                    </tr>
                    <tr className='left'>
                        <th>Email: </th>
                        <td>{this.state.user.email}</td>
                    </tr>
                    <tr className='left'>
                        <th>Emergency no. 1: </th>
                        {
                            this.state.user.emergency_no1 === null? <td> - </td> 
                            : <td> {this.state.user.emergency_no1} </td>
                        }
                    </tr>
                    <tr className='left'>
                        <th>Emergency no. 2: </th>
                        {
                            this.state.user.emergency_no2 === null? <td> - </td> 
                            : <td> {this.state.user.emergency_no2} </td>
                        }
                    </tr>
                    <tr className='left'>
                        <th>Status: </th>
                        {
                            this.state.user.status === true? <td><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
                            : <td><span style={{fontSize:12, color:"red"}}>&#10060;</span></td>
                        }
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    )
  }
}
