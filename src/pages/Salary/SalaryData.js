import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import './styles/viewSalary.css'
import Navbar from '../../components/Navbar';

export default class SalaryInfo extends Component {
    constructor(props){
        super(props)
        this.state = {
            emp_id: props.id,
            salaries: [],
            empDetails: [],
        }
    }

    componentDidMount(){

        axios.get('http://localhost:3000/salary/find/'+this.state.emp_id).then(response => {
            this.setState({
                salaries: response.data.data
            });
        });

        axios.get('http://localhost:3000/employees/'+this.state.emp_id).then(response => {
            this.setState({
                empDetails: response.data.data
            });
        });

    }

    goBack(){
        window.location.reload()
    }

    render(){
        return(
            <>
            <Navbar/>
            <div className='mainViewDesignation'>
                <button className='viewAddDesignationButton btn btn-primary' style={{marginLeft:'59%'}} onClick={() => {this.goBack()}}>Back</button>
                
                <div className='viewDesignationContainer table-responsive'>
                <div><b><h1>Employee Details</h1></b></div>
                    <table className='table table-sm table-hover' responsive>
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Date of Joining</th>
                            <th scope="col">Employee code</th>
                        </tr>
                    </thead>
                    <tbody>

                             <tr>
                                 <td scope="row">{this.state.empDetails.name}</td>
                                 <td>{this.state.empDetails.email}</td>
                                 <td>{this.state.empDetails.doj}</td>
                                 <td>{this.state.empDetails.emp_code}</td>
                             </tr>
                        
                    </tbody>
                </table>
                <hr/>
                <div><b><h1>Salary Details</h1></b></div>
                <table className='table table-sm table-hover'>
                    <thead>
                        <tr>
                            <th scope="col">Salary</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.salaries.map((e) => (
                                <tr>
                                    <td>Rs. {e.salary}</td>
                                    <td>{e.createdAt}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                </div>
            </div>
          </>
        );
    }
}