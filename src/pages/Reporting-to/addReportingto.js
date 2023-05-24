import React,{Component,createRef} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style/addreport.css'
import Navbar from '../../components/Navbar';

export default class AddReportingto extends Component {
    constructor(props){
        super(props)
        this.state = {
            reporting: this.props.id? this.props.id : " ",
            employee: "",
            reportingto: "",
            EmployeeData: [],
            status: "true",
            erro: "",
            emp_id:''
        }
        
    }
    employee_ref = React.createRef()
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    

    componentDidMount() {
        if(this.state.reporting !== " "){
            axios.get('http://localhost:3001/report-to/'+this.state.reporting).then(response => {
                this.setState({
                    employee: response.data.data.emp_id,
                    reportingto: response.data.data.reporting_emp_id,
                });
            });
        }

        this.getEmployeeDetails()
    }
    async getEmployeeDetails()
    {
        const {data} = await axios.get('http://localhost:3001/employees')
        this.setState({EmployeeData:data.data})
        //console.log(this.state.EmployeeData)
    }

    handleSubmit = event => {
        event.preventDefault();

        if(this.state.employee === this.state.reportingto){
            alert("Employee cannot report to self")
            return false
        }

        var reporting = {}
        this.state.reporting === " " ? 
        reporting = {
            emp_id: this.state.employee,
            reporting_emp_id: this.state.reportingto,
            }
        : reporting = {
            emp_id:this.employee_ref.current.id,
            reporting_emp_id: this.state.reportingto,
            status: this.state.status,
        };

        this.state.reporting === " "? this.addReporting(reporting) : this.editReporting(reporting)
    }

    addReporting(reporting){

        
        axios.post(`http://localhost:3001/report-to`, reporting ,
        {
            'Content-type':'application/json'
        }).then(res => {
            window.location.reload()
        }).catch(err => {
            alert("somthing went wrong... fill the form properly and try again")
            return false
        })
    }

    editReporting(reporting){
      
        const isBool = reporting.status.toString().toLowerCase()=='true';
        const data = {
            emp_id:reporting.emp_id,
            reporting_emp_id:reporting.reporting_emp_id,
            status:isBool
        } 
        axios.patch(`http://localhost:3001/report-to/`+this.state.reporting, data,
        {
            'Content-type':'application/json'
        }).then(res => {
            
            window.location.reload()
        })
    }
    
    getEmpName(id){
        
        var emp = this.state.EmployeeData.find(x => x.id === id)
        if(emp !== undefined){
            return emp.name
        }else{
            
            return false
        }
    }

    cancel(){
        window.location.reload()
    }

    render() {
        
        return (
            <>
            <Navbar/>
       
        <div className="mainAddDesignation">
            {this.state.reporting === " "? <h2>Add Reporting Details</h2> : <h2>Edit Reporting Details</h2>}
            
            <Form onSubmit={this.handleSubmit} >
              {this.state.reporting===' '?<label className=' EDNameLabel'>Choose employee: <span style={{color:'red'}} >*</span> </label>
                :<label className=' EDNameLabel'>Choose employee: <span style={{color:'red'}} >*</span> </label>}  
                {this.state.reporting === " "?
                    <Form.Group className="mb-3">
                        <select className="EDNInPut" name="employee" value={this.state.employee} onChange={this.handleChange} required>
                            <option>Select</option>
                            {this.state.EmployeeData.map((e)=>(
                                <option value={e.id}>{e.name}</option>
                            ))}
                        </select>
                    </Form.Group>
                :
                    <Form.Group className="mb-3" >
                        <Form.Control type="text" className='EDNInPut' name="employee" ref={this.employee_ref} id={this.state.employee} value={this.getEmpName(this.state.employee)} onChange={this.handleChange} disabled />
                    </Form.Group>
                }

                <br />

                {
                    this.state.reporting===' '? <label className='EDNameLabel'>Reporting to: <span className='req'>*</span></label>
                                              : <label className='EDNameLabel'>Reporting to: <span className='req'>*</span></label>
                }

                <Form.Group className="mb-3">
                    
                    <select className={this.state.reporting===' '? 'to_employee':'to_employee_edit' } class="EDNInPut " name="reportingto" value={this.state.reportingto} onChange={this.handleChange} required>
                        <option>Select</option>
                        {this.state.EmployeeData.map((e)=>(
                            <option value={e.id}>{e.name}</option>
                        ))}
                    </select>
                </Form.Group>
                
                {this.state.reporting !== " " ? <br /> : ""}

                {this.state.reporting !== " " ? <label style={{marginLeft:"80px"}}>Status:</label> : ""}

                {this.state.reporting !== " " ?
                    <Form.Group className="mb-3">
                        <select className="EDNInPut" name="status" value={this.state.status} onChange={this.handleChange}>
                            <option>Select status</option>
                            <option value={"true"}>True</option>
                            <option value={"false"} >False</option>
                        </select>
                    </Form.Group>
                    :
                    " "
                }

                <br />
                
                    <Button className='SaveButton' type="submit">
                        Save
                    </Button>&nbsp;&nbsp;
                    {this.state.reporting === " " ?
                        <Link to={{ pathname: "/reporting" }}><Button className='CancelButton' type="cancel">
                            Cancel
                        </Button></Link>
                        : <Button className='CancelButton' type="cancel" onClick={() => { this.cancel() }}>
                            Cancel
                        </Button>
                    }
                    
              
            </Form>
            </div>
      
            </>
        )
    }
}
