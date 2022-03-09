import React from 'react';
import axios from 'axios';

const initialState = {
    employee: "",
    salary: "",
    employeesData: [],
}

export default class Salary extends React.Component {
    state = initialState;

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    componentDidMount() {

        axios.get('http://localhost:3000/employees').then(response => {
            console.log(response.data);
            this.setState({
                employeesData: response.data.data
            });
        });
    }
    handleSubmit = event => {
        event.preventDefault();

        const salary = {
            emp_id: this.state.employee,    // "+" string to integer conversion
            salary: this.state.salary //column name:value
        };

        console.log(salary);

        axios.post(`http://localhost:3000/salary/create`, salary,
            {
                'Content-type': 'application/json'
            })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })

        this.setState(initialState);
    }

    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            Choose employee:
                            <select className="form-control" name="employee" value={this.state.employee} onChange={this.handleChange}>
                                <option>Select employee</option>
                                {this.state.employeesData.map((e) => {
                                    return <option value={e.id}>{e.name}</option>;
                                })}
                            </select>
                        </label>
                        <br /><br />
                        <label>
                            Salary:
                            <input type="text" name="salary" value={this.state.salary} placeholder="Enter salary" onChange={this.handleChange} />
                            <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div>
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}