import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import './styles/viewSalary.css'

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

        axios.get('http://localhost:3001/salary/find/'+this.state.emp_id).then(response => {
            this.setState({
                salaries: response.data.data
            });
        });

        axios.get('http://localhost:3001/employees/'+this.state.emp_id).then(response => {
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
            <div className='main'>
                <h2><span ><button className='back_salary' onClick={() => {this.goBack()}}><b>Back</b></button></span>Employee details:  </h2>
                <div className='each_salary'>
                <table className='salary_emp_table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date of Joining</th>
                            <th>Employee code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            <tr>
                                <td>{this.state.empDetails.name}</td>
                                <td>{this.state.empDetails.email}</td>
                                <td>{this.state.empDetails.doj}</td>
                                <td>{this.state.empDetails.emp_code}</td>
                            </tr>
                        }
                    </tbody>
                </table>
                <h2>Salary details:  </h2>
                <table className='salary_single_table'>
                    <thead>
                        <tr>
                            <th>Salary</th>
                            <th>Date</th>
                        </tr>
                        <tr>
                            <div></div>
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
        );
    }
}