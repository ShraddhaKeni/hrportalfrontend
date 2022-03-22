import React from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
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

        axios.post(`http://localhost:3000/salary/create`, salary,
            {
                'Content-type': 'application/json'
            })
            .then(res => {
            })

        this.setState(initialState);
    }


    EditNewSalary(salary) {
        axios.post(`http://localhost:3000/salary/create`, salary,
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
            <div className='main'>
                <h2>Add salary</h2>

                <Form onSubmit={this.handleSubmit}>
                    <label>Select employee:</label>
                    <Form.Group className="mb-3">
                        <select className="form-control" name="employee" value={this.state.employee} onChange={this.handleChange}>
                            <option>Select employee</option>
                            {this.state.employeesData.map((e) => {
                                if (!this.checkSalaryExist(e.id) || this.state.isEdit) {
                                    return <option value={e.id}>{e.name}</option>
                                }else{
                                    return ""
                                }
                            })}
                        </select>
                    </Form.Group>
                    <br/>
                    <label>Enter salary:</label>
                    <Form.Group className="mb-3" >
                        <Form.Control type="number" placeholder="Enter Salary" value={this.state.salary} onChange={this.handleChange} />
                    </Form.Group>
                    <br/>
                    <Button variant="success" type="submit">
                        Save
                    </Button>&nbsp;&nbsp;
                    <Link to={{pathname: "/salary"}}><Button variant="danger" type="cancel">
                        Cancel
                    </Button></Link>
                </Form>
            </div>
        )
    }   
}