import {Component} from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddEmployees from './addEmployees';
import ViewEmployees from './viewEmployee';

const initialState = {
    employees: [],
    users: [],
    companies: [],
    isEdit: false,
    isView: false,
    editValue: null,
}

export default class Employees extends Component{
    constructor(props){
        super(props)
        this.state = initialState;
    }

    componentDidMount(){
        
        axios.get('http://localhost:3000/employees').then(response => {
            this.setState({
                employees: response.data.data
            });
        });

        axios.get('http://localhost:3000/users/findAll').then(response => {
            this.setState({
                users: response.data.data
            });
        });

        axios.get('http://localhost:3000/companies').then(response => {
            this.setState({
                companies: response.data.data
            });
        });
    }

    getCompanyName(id){
        var comp = this.state.companies.find(x => x.id === id)
        if(comp != null){
            return comp.name
        }else{
            return false
        }
    }

    getUsername(id){
        var user = this.state.users.find(x => x.id === id)
        if (user != null){
            return user.username
        }else{
            return false
        }
    }

    editClicked(id){
        this.setState({
            isEdit: true,
            editValue: id,
        })
    }

    viewClicked(id){
        this.setState({
            isView: true,
            editValue: id,
        })
    }

    render(){
        if(this.state.isEdit === true){
            return (
                <AddEmployees id={this.state.editValue} />
            )
        }else if(this.state.isView === true){
            return (
                <ViewEmployees id={this.state.editValue} />
            )
        }else{
            var srno = 1
            return(
                <div className='main'>
                    <h2>Employees <span style={{float:'right'}}><Link to={{ pathname: "/add-employees" }}><Button variant='success'><span style={{fontSize:18, color:"white"}}>&#43;</span></Button></Link></span></h2>
                    <Table bordered striped>
                        <thead  >
                            <tr>
                                <th>Sr no.</th>
                                <th>Name</th>
                                <th>Company name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Employee code</th>
                                <th>Status</th>
                                <th colSpan={2}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map((emp) => (
                                    <tr key={emp.id}>
                                        <td>{srno++}</td>
                                        <td>{emp.name}</td>
                                        <td>{this.getCompanyName(emp.comp_id)}</td>
                                        <td>{this.getUsername(emp.user_id)}</td>
                                        <td>{emp.email}</td>
                                        <td>{emp.emp_code}</td>
                                            {
                                                emp.status === true? <td><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
                                                : <td><span style={{fontSize:12, color:"red"}}>&#10060;</span></td>
                                            }
                                        <td> 
                                            <Button variant="info" onClick={() => {this.editClicked(emp.id)}} >
                                                Edit 
                                            </Button> 
                                        </td> 
                                        <td> 
                                            <Button variant="info" onClick={() => {this.viewClicked(emp.id)}} >
                                                View 
                                            </Button> 
                                        </td>
                                    </tr>
                                    
                                ))}
                        </tbody>
                    </Table>
                </div>
            )
        }
    }
}