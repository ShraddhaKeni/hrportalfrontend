import {Component} from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddReportingto from './addReportingto';
import './style/reporting.css'


const initialState = {
    reporting: [],
    employees: [],
    isEdit: false,
    editValue: null,
}

export default class Reportingto extends Component{
    constructor(props){
        super(props)
        this.state = initialState;
    }

    componentDidMount(){
        axios.get('http://localhost:3001/report-to').then(response => {
            this.setState({
                reporting: response.data.data
            });
        });
       this.getEmployeeDetails()
    }

    async getEmployeeDetails()
    {
        const {data} = await axios.get('http://localhost:3001/employees')
        this.setState({employees:data.data})
        //console.log(this.state.EmployeeData)
    }

    editClicked(id){
        this.setState({
            isEdit: true,
            editValue: id,
        })
    }

    getEmpName(id){
        var emp = this.state.employees.find(x => x.id === id)
        if(emp !== undefined){
            return emp.name
        }else{
            return false
        }
    }
    async statusChange(id,status)
    {
        const data = {
            status:!status
        }

        const changeRequest = await axios.patch(`http://localhost:3001/report-to/${id}`,data,{
            'Content-type':'application/json'
        })
        window.location.reload()
    }

    render(){
        if(this.state.isEdit === true){
            return (
                <AddReportingto id={this.state.editValue} />
            )
        }else{
            var srno = 1
            return(
                <div className='main_reporting'>
                    <h2 style={{marginLeft:'-40px'}}>Reporting</h2>
                    <h2><Link to={{ pathname: "/add-reporting" }}><button className='add_report'>Add Reporting</button></Link></h2>
                    <div className='table_reporting_container'>
                    <table className='table_reporting'>
                        <thead>
                            <tr>
                                <th>Sr no.</th>
                                <th>Employee</th>   
                                <th>Reporting to</th>
                                <th>Status</th>
                                <th colSpan={2}>Action</th>
                            </tr>
                            <tr>
                                    <hr className='hr_tag'/>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.reporting.map((report) => (
                                    <tr key={report.id}>
                                        <td>{srno++}</td>
                                        <td>{this.getEmpName(report.emp_id)}</td>
                                        <td>{this.getEmpName(report.reporting_emp_id)}</td>
                                            {
                                                report.status === true? <td><span style={{fontSize:24, color:"green"}}>&#10003;</span></td> 
                                                : <td><span style={{fontSize:12, color:"red"}}>&#10060;</span></td>
                                            }
                                       
                                        <td> 
                                        {report.status===true?<button className='action_report' onClick={() => {this.statusChange(report.id,report.status)}} >
                                                Delete 
                                            </button> :<button  className='action_report' onClick={() => {this.statusChange(report.id,report.status)}} >
                                                Activate
                                            </button> }
                                            <button className='edit_report' onClick={() => {this.editClicked(report.id)}} >
                                                Edit 
                                            </button> 
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