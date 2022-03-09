import { Button, Form } from 'reactstrap';
import React from 'react';
import axios from 'axios';

const initialState = {
    employee: "",
    reportingto: "",
    EmployeeData: [],
    ReportingToData: [],
};

export default class Reportingto extends React.Component {
    state = initialState;

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    componentDidMount() {
        axios.get('http://localhost:3000/employees').then(response => {
            this.setState({
                EmployeeData: response.data.data
            });
        });
        axios.get('http://localhost:3000/employees').then(response => {
            this.setState({
                ReportingToData: response.data.data
            });
        });
    }

     handleSubmit = event => {
        event.preventDefault();
      
            const data = {
                emp_id: this.state.employee,
                reporting_emp_id: this.state.reportingto,
            };
            if(this.state.employee===this.state.reportingto){
                alert('Employee and reporting employee cannot be same');
            }else
            {
                axios.post(`http://localhost:3000/report-to`, data,
                {
                    'Content-type': 'application/json'
                }).then(res => {
                    alert("Details submitted successfully!");
                    this.setState(initialState);
                    window.location.reload(false);
                });
            }
    } 

    render() {

        return (
            <Form className='form-data' onSubmit={this.handleSubmit} >
                <div className="form-group">
                    <label>
                        Choose employee:
                        <select className="form-control" name="employee" value={this.state.employee} onChange={this.handleChange} >
                            <option>Select employee</option>
                            {this.state.EmployeeData.map((e, id) => {
                                return <option value={e.id}>{e.name}</option>;
                            })}
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Reporting to:
                        <select className="form-control" name="reportingto" value={this.state.reportingto} onChange={this.handleChange} >
                            <option>Select</option>
                            {this.state.ReportingToData.map((e, id) => {
                                return <option value={e.id}>{e.name}</option>;
                            })}
                        </select>
                    </label>
                </div>
                <Button className="btn btn-success" type="submit">Save</Button>
            </Form>
        )
    }
}
