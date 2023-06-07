import React from 'react';
import axios from 'axios';
import { Table, button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SalaryInfo from './SalaryData';
import EditSalary from './editSalary';
import './styles/viewAllSalary.css'
import Navbar from '../../components/Navbar';

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

        axios.get('/salary/findAll').then(response => {
            this.setState({
                salaryData: response.data.data
            });
        });

        axios.get('/employees').then(response => {
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
                <>      
                <Navbar/>        
                  <div className='mainViewDesignation'>
                  
                  <div style={{display:'flex', margin: '3% 0% 0% 51%'}}>
                    <div><b><h1>Salaries</h1></b></div>
                    <div style={{marginLeft: '7%'}}><Link to={{ pathname: "/add-salary" }}><button className='viewAddDesignationButton btn btn-primary'>Add Salary</button></Link></div>
                    </div>
             
                    <div className='viewDesignationContainer table-responsive'>
                    <table className='table table-sm table-hover' responsive>
                        <thead>
                            <tr>
                                <th scope="col">Sr no.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Salary</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
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
                </>

            )
        }
    }   
}