import React from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SalaryInfo from './SalaryData';
import EditSalary from './editSalary';

export default class ViewSalary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: "",
            salary: "",
            employeesData: [],
            salaryData: [],
            isView: false,
            viewValue: null,
            isEdit: false,
        }
    }

    componentDidMount() {

        axios.get('http://localhost:3000/salary/findAll').then(response => {
            this.setState({
                salaryData: response.data.data
            });
        });

        axios.get('http://localhost:3000/employees').then(response => {
            this.setState({
                employeesData: response.data.data
            });
        });
    }

    getEmpName(id) {
        var emp = this.state.employeesData.find(x => x.id === id)
        if (emp != null) {
            return emp.name
        } else {
            return "Name_not_found"
        }
    }

    viewClicked(id){
        this.setState({
            isView: true,
            viewValue: id
        })
    }

    editClicked(id){
        this.setState({
            isEdit: true,
            viewValue: id
        })
    }

    checkSalaryExist(id) {
        var salary = this.state.salaryData.find(x => x.emp_id === id)
        if (salary != null) {
            return true
        } else {
            return false
        }
    }

    render() {
        console.log(this.state.isView)
        if(this.state.isView === true){
            return(<SalaryInfo id={this.state.viewValue} />)
        }else if(this.state.isEdit === true){
            return(<EditSalary id={this.state.viewValue} />)
        }else{
            return (
                
                <div className='main'>
                    <h2>Employee Salaries <span style={{float:'right'}}><Link to={{ pathname: "/add-salary" }}><Button variant='success'><b>+</b></Button></Link></span></h2>
                    <Table bordered striped>
                        <thead>
                            <tr>
                                <th>Sr no.</th>
                                <th>Name</th>
                                <th>Salary</th>
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.salaryData.map((salary) => (
                                    <tr key={salary.id}>
                                        <td>{salary.id}</td>
                                        <td>{this.getEmpName(salary.emp_id)}</td>
                                        <td>{salary.salary}</td>
                                        <td> 
                                            <Button variant="info" onClick={() => {this.editClicked(salary.emp_id)}} >
                                                Edit 
                                            </Button> 
                                        </td>
                                        <td>
                                            <Button variant="info" onClick={() => {this.viewClicked(salary.emp_id)}}>
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