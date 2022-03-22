import {Component} from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddReportingto from './addReportingto';


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
        axios.get('http://localhost:3000/report-to').then(response => {
            this.setState({
                reporting: response.data.data
            });
        });
        axios.get('http://localhost:3000/employees').then(response => {
            this.setState({
                employees: response.data.data
            });
        });
    }

    editClicked(id){
        this.setState({
            isEdit: true,
            editValue: id,
        })
    }

    getEmpName(id){
        console.log(id)
        var emp = this.state.employees.find(x => x.id === id)
        if(emp !== undefined){
            return emp.name
        }else{
            return false
        }
    }

    render(){
        if(this.state.isEdit === true){
            return (
                <AddReportingto id={this.state.editValue} />
            )
        }else{
            var srno = 1
            return(
                <div className='main'>
                    <h2>Reporting details <span style={{float:'right'}}><Link to={{ pathname: "/add-reporting" }}><Button variant='success'><span style={{fontSize:18, color:"white"}}>&#43;</span></Button></Link></span></h2>
                    <Table bordered striped>
                        <thead  >
                            <tr>
                                <th>Sr no.</th>
                                <th>Employee</th>
                                <th>Reporting to</th>
                                <th>Status</th>
                                <th>Action</th>
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
                                            <Button variant="info" onClick={() => {this.editClicked(report.id)}} >
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