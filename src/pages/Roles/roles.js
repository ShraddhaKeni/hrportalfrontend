import {Component} from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddRoles from './addRoles';

const initialState = {
    roles: [],
    isEdit: false,
    editValue: null,
}

export default class Roles extends Component{
    constructor(props){
        super(props)
        this.state = initialState;
    }

    componentDidMount(){
        
        // axios.get('http://10.201.10.191:3000/roles').then(response => {
        axios.get('http://localhost:3000/roles').then(response => {
            this.setState({
                roles: response.data.data
            });
        });
    }

    editClicked(id){
        this.setState({
            isEdit: true,
            editValue: id,
        })
    }
    async deleteRole(id)
    {
        const data = {
            status:false
        }
        const deleted = axios.patch(`http://localhost:3000/roles/${id}`,data,{
            'Content-type':'application/json'
        })
        window.location.reload();
    }

    render(){
        if(this.state.isEdit === true){
            return (
                <AddRoles id={this.state.editValue} />
            )
        }else{
            var srno = 1
            return(
                <div className='main'>
                    <h2>Roles <span style={{float:'right'}}><Link to={{ pathname: "/add-roles" }}><Button variant='success'><span style={{fontSize:18, color:"white"}}>&#43;</span></Button></Link></span></h2>
                    <Table bordered striped>
                        <thead  >
                            <tr>
                                <th>Sr no.</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.roles.map((role) => (
                                    <tr key={role.id}>
                                        <td>{srno++}</td>
                                        <td>{role.name}</td>
                                            {
                                                role.status === true? <td><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
                                                : <td><span style={{fontSize:12, color:"red"}}>&#10060;</span></td>
                                            }
                                        <td> 
                                            <Button variant="danger" style={{marginRight:'10px'}} onClick={() => {this.deleteRole(role.id)}} >
                                                Delete 
                                            </Button> 
                                            <Button variant="info" onClick={() => {this.editClicked(role.id)}} >
                                                Edit 
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