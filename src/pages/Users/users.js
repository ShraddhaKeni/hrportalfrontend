import {Component} from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddUsers from './addUsers';
import ViewUsers from './viewUsers';

const initialState = {
    users: [],
    isEdit: false,
    isView: false,
    editValue: null,
}

export default class Users extends Component{
    constructor(props){
        super(props)
        this.state = initialState;
    }

    componentDidMount(){
        
        axios.get('http://localhost:3000/users/findAll').then(response => {
            this.setState({
                users: response.data.data
            });
        });
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
                <AddUsers id={this.state.editValue} />
            )
        }else if(this.state.isView === true){
            return (
                <ViewUsers id={this.state.editValue} />
            )
        }else{
            var srno = 1
            return(
                <div className='main'>
                    <h2>Users <span style={{float:'right'}}><Link to={{ pathname: "/add-users" }}><Button variant='success'><span style={{fontSize:18, color:"white"}}>&#43;</span></Button></Link></span></h2>
                    <Table bordered striped>
                        <thead  >
                            <tr>
                                <th>Sr no.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Contact no.</th>
                                <th>Status</th>
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{srno++}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.contact_no}</td>
                                            {
                                                user.status === true? <td><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
                                                : <td><span style={{fontSize:12, color:"red"}}>&#10060;</span></td>
                                            }
                                        <td> 
                                            <Button variant="info" onClick={() => {this.editClicked(user.id)}} >
                                                Edit 
                                            </Button> 
                                        </td>
                                        <td> 
                                            <Button variant="info" onClick={() => {this.viewClicked(user.id)}} >
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