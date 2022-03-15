import {Component} from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddDepartment from './addDepartment';

const initialState = {
    departments: [],
    isEdit: false,
    editValue: null,
}
export default class Department extends Component{
    constructor(props){
        super(props)
        this.state = initialState;
    }

    componentDidMount(){
        
        axios.get('http://localhost:3000/departments/viewall').then(response => {
            this.setState({
                departments: response.data.data
            });
        });

    }

    editClicked(id){
        this.setState({
            isEdit: true,
            editValue: id,
        })
    }

    render(){
        if(this.state.isEdit === true){
            return (
                <AddDepartment id={this.state.editValue} />
            )
        }else{
            var srno = 1
            return(
                <div className='main'>
                    <h2>Departments <span style={{float:'right'}}><Link to={{ pathname: "/add-department" }}><Button variant='success'><span style={{fontSize:18, color:"white"}}>&#43;</span></Button></Link></span></h2>
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
                                this.state.departments.map((depart) => (
                                    <tr key={depart.id}>
                                        <td>{srno++}</td>
                                        <td>{depart.name}</td>
                                            {
                                                depart.status === true? <td><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
                                                : <td><span style={{fontSize:12, color:"red"}}>&#10060;</span></td>
                                            }
                                        <td> 
                                            <Button variant="info" onClick={() => {this.editClicked(depart.id)}} >
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