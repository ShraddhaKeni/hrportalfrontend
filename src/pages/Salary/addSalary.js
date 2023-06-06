import React from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/addSalary.css'
import Navbar from '../../components/Navbar';

const initialState = {
    employee: "",
    salary: "",
    employeesData: [],
    salaryData: [],
    isEdit: false,
    data: "",
}

export default class Salary extends React.Component {
    constructor(props){
        super(props)
        this.state = initialState
    }

    salary_ref = React.createRef();

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
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

    checkSalaryExist(id) {
        var salary = this.state.salaryData.find(x => x.emp_id === id)
        if (salary != null) {
            return true
        } else {
            return false
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        const salary = {
            emp_id: this.state.employee,    // "+" string to integer conversion
            salary: this.state.salary //column name:value
        };
        console.log(salary)
        axios.post(`http://localhost:3001/salary/create`, salary,
            {
                'Content-type': 'application/json'
            })
            .then(res => {
                window.location.href = '/salary'
            })

        this.setState(initialState);
    }


    EditNewSalary(salary) {
        axios.post(`http://localhost:3001/salary/create`, salary,
            {
                'Content-type': 'application/json'
            })
            .then(res => {
            })

        this.setState(initialState);
    }

    displaySalary(){
        this.setState({
            displayEmpSalary: false
        })
    }

    render() {

        return (
            <>
            <Navbar/>
            
                {/* <h2>Add salary</h2> */}
                <div className='mainAddDesignation'>
                {this.state.design === " "? <h2>Add Salary</h2> : <h2>Edit Salary</h2>}
                <Form onSubmit={this.handleSubmit}>
                {/* {this.state.design === " "? <h2>Add Salary</h2> : <h2>Edit Salary</h2>} */}
                    <label className='EDNameLabel'>Select employee:</label>
                    <Form.Group className="mb-3">
                        <select className="EDNInPut" name="employee" value={this.state.employee} onChange={this.handleChange}>
                            <option>Select employee</option>
                            {this.state.employeesData.map((e) => {
                                if (!this.checkSalaryExist(e.id) || this.state.isEdit) {
                                    return <option value={e.id}>{e.name}</option>
                                }else{
                                    return <option value={e.id}>{e.name}</option>
                                }
                            })}
                        </select>
                    </Form.Group>
                    <br/>
                    <label className='EDNameLabel'>Enter salary:</label>
                    <Form.Group className="mb-3" >
                        <input className='EDNInPut' type="number" ref={this.salary_ref} placeholder="Enter Salary" defaultValue={this.state.salary} onChange={()=>{this.setState({salary:this.salary_ref.current.value})}} />
                    </Form.Group>
                    <br/>
                    <Button className='SaveButton' type="submit">
                        Save
                    </Button>&nbsp;&nbsp;
                    <Link to={{pathname: "/salary"}}><Button className='CancelButton' type="cancel">
                        Cancel
                    </Button></Link>
               
                </Form>
                </div>
         
            </>
        )
    }   
}