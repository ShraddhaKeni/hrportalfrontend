import {Component} from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import './styles/viewEachEmployee.css'


export default class ViewEmployees extends Component {
  constructor(props){
    super(props)
    this.state = {
      emp_id: this.props.id,
      employee: [],
      company: "",
      username: "",
      designation: "",
      department: "",
    }
  }  

  componentDidMount(){
    axios.get('/employees/'+this.state.emp_id).then(response => {
        this.setState({
            employee: response.data.data
        });
        axios.get('/companies/'+this.state.employee.comp_id).then(comp_res =>{
            this.setState({
                company: comp_res.data.data.name
            });
        });
        axios.get('/users/'+this.state.employee.user_id).then(user_res =>{
            this.setState({
                username: user_res.data.data.username
            });
        }); 
        axios.get('/designation/find/'+this.state.employee.desig_id).then(design_res =>{
            this.setState({
                designation: design_res.data.data.name
            });
        }); 
        axios.get('/departments/'+this.state.employee.dept_id).then(dept_res =>{
            this.setState({
                department: dept_res.data.data.name
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
            <h2 style={{}}>User details
               
                
            </h2>
            <button className='employee_back' onClick={() => {this.goBack()}}><b>Back</b></button>
            <div className='viewEmployee_container  table-responsive'>
            <table className='viewEmployee_table'>
                <tbody>
                    <tr className='left'>
                        <th>Name: </th>
                        <td>{this.state.employee.name}</td>
                    </tr>
                    <tr className='left'>
                        <th>Company name: </th>
                        <td>{this.state.company}</td>
                    </tr>
                    <tr className='left'>
                        <th>Username: </th>
                        <td>{this.state.username}</td>
                    </tr>
                    <tr className='left'>
                        <th>Designation: </th>
                        <td>{this.state.designation}</td>
                    </tr>
                    <tr className='left'>
                        <th>Department: </th>
                        <td>{this.state.department}</td>
                    </tr>
                    <tr className='left'>
                        <th>Email: </th>
                        <td>{this.state.employee.email}</td>
                    </tr>
                    <tr className='left'>
                        <th>Date of joining: </th>
                        <td>{this.state.employee.doj}</td>
                    </tr>
                    <tr className='left'>
                        <th>Signature: </th>
                        {
                            this.state.employee.signature === null? <td> - </td> 
                            : <td> {this.state.employee.signature} </td>
                        }
                    </tr>
                    <tr className='left'>
                        <th>Employee code: </th>
                        <td>{this.state.employee.emp_code}</td>
                    </tr>
                    <tr className='left'>
                        <th>Status: </th>
                        {
                            this.state.employee.status === true? <td><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
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
