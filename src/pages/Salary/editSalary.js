import {Component} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import './styles/addSalary.css'

export default class EditSalary extends Component{
    constructor(props){
        super(props)
        this.state = {
            emp_id: props.id,
            empName: null,
            salaries: [],
            salary: " "
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    getSalary(){
        
    }

    handleSubmit = event => {
        event.preventDefault();

        const salary = {
            emp_id: this.state.emp_id,    // "+" string to integer conversion
            salary: this.state.salary //column name:value
        };
        console.log(salary)
        axios.post(`http://localhost:3000/salary/create`, salary,
        {
            'Content-type': 'application/json'
        })
        .then(res => {
            window.location.reload();
        })
        
    }

    cancel(){
        window.location.reload();
    }

    componentDidMount(){

        axios.get('http://localhost:3000/employees/'+this.state.emp_id).then(response => {
            this.setState({
                empName: response.data.data.name
            });
        });

        axios.get('http://localhost:3000/salary/find/'+this.state.emp_id).then(response => {
            this.setState({
                salaries: response.data.data
            });

            var newSalary = this.state.salaries.find(x => x.status === true)
            if (newSalary != null) {
                this.setState({
                    salary: newSalary.salary
                });
            } else {
                this.setState({
                    salary: " "
                });
            }
        });        
    }

    render(){
        return(
            <div className='main'>
                <h2>Edit salary</h2>
                <div className='addSalary_container'>
                <form className='addSalary_form' onSubmit={this.handleSubmit}>
                    <div className='addSalary_form_container'>
                    <label className='addSalary_employee_lable'>Select employee:</label>
                    <Form.Group className="mb-3">
                        <input className="addSalary_employee" type="text"  name="employee" value={this.state.empName? this.state.empName:""} disabled/>
                    </Form.Group>

                    <br/>

                    <label className='addSalary_salary_label'>Enter salary:</label>
                    <Form.Group className="mb-3" >
                        <input className='addSalary_salary' type="text" name="salary" placeholder="Enter Salary" value={this.state.salary} onChange={this.handleChange} />
                    </Form.Group>

                    <br/>
                    
                    <button className='salary_save' type="submit">
                        Save
                    </button>
                    <button type="cancel" className='salary_cancel' onClick={() => {this.cancel()}}>
                        Cancel
                    </button>
                    </div>
                </form>
                </div>
            </div>
        )
    }
}
