import React from 'react';
import axios from 'axios';
import { Table, button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SalaryInfo from './SalaryData';
import EditSalary from './editSalary';
import './styles/viewAllSalary.css'

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

        axios.get('http://localhost:3001/salary/findAll').then(response => {
            this.setState({
                salaryData: response.data.data
            });
        });

        axios.get('http://localhost:3001/employees').then(response => {
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

    async changeStatus(id,status)
    {
        const data = {
            status:!status
        }
        const changeRequest = await axios.patch('')
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
                    <h2>Employee Salaries <span style={{float:'right'}}><Link to={{ pathname: "/add-salary" }}><button className='add_salary'>Add Salary</button></Link></span></h2>
                    <div className='salary_table_container'>
                    <table className='salary_table'>
                        <thead>
                            <tr>
                                <th style={{width:'40px'}}>Sr no.</th>
                                <th>Name</th>
                                <th>Salary</th>
                                <th>Status</th>
                            <th colSpan={2} style={{textIndent:'-200px'}}>Actions</th>
                            </tr>
                            <tr>
                                <hr className='salary_line'></hr>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.salaryData.map((salary) => (
                                    <tr key={salary.id}>
                                        <td>{salary.id}</td>
                                        <td>{this.getEmpName(salary.emp_id)}</td>
                                        <td>{salary.salary}</td>
                                        {
                                                salary.status === true? <td><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
                                                : <td><span style={{fontSize:12, color:"red"}}>&#10060;</span></td>
                                        }
                                        <td > 
                                           <div className='salary_table_buttons'> 
                                                <button className='salary_edit' onClick={() => {this.editClicked(salary.emp_id)}} >
                                                    Edit 
                                                </button> 

                                                <button className='salary_view' onClick={() => {this.viewClicked(salary.emp_id)}}>
                                                    View
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            )
        }
    }   
}