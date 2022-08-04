import React, {Component} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class AddStates extends Component {
    constructor(props) {
        super(props)
        this.state = {
            state: this.props.state ? this.props.state : " ",
            country: this.props.country ? this.props.country : [],
            stateName: "",
            countryName: "",
            status: "true",
            name: "",
        }
    }

    componentDidMount() {
        if (this.state.state !== " ") {
            axios.get('http://localhost:3000/states/' + this.state.state).then(response => {
                this.setState({
                    stateName: response.data.data.name
                });
            });

            axios.get('http://localhost:3000/countries/' + this.state.country).then(response => {
                this.setState({
                    countryName: response.data.data.name
                });
            });
        } else {
            axios.get('http://localhost:3000/countries').then(response => {
                this.setState({
                    country: response.data.data
                });
            });
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        var state = {}
        this.state.state === " "?
        state = {
            name: this.state.stateName,
            country_id: parseInt(this.state.countryName),
        }
        : state = {
            name: this.state.stateName,
            status: this.state.status
        }

        this.state.state === " "? this.addState(state) : this.editState(state)
    }

    addState(state){
        axios.post(`http://localhost:3000/states/create`, state ,
        {
            'Content-type':'application/json'
        }).then(res => {
            window.location.reload()
        })
    }

    editState(state){
        const isBool = state.status.toString().toLowerCase()=='true'
        const data = {
            name:state.name,
            status:isBool
        }
        axios.patch(`http://localhost:3000/states/`+this.state.state, data ,
        {
            'Content-type':'application/json'
        }).then(res => {
            window.location.reload()
        })
    }
    
    cancel(){
        window.location.reload()
    }

    render() {

        return (

            <div className='main'>
                {this.state.state === " " ? <h2>Add State</h2> : <h2>Edit State</h2>}
                <Form onSubmit={this.handleSubmit}>
                    <label>Choose Country:</label>
                    {this.state.state === " " ?
                        <Form.Group className="mb-3">
                            <select className="form-control" name="countryName" onChange={this.handleChange}>
                                <option value="">Select</option>
                                { this.state.country.map((e) => (
                                    <option value={e.id}>{e.name}</option>
                                ))
                                }
                            </select>
                        </Form.Group> 
                    :
                        <Form.Group className="mb-3" >
                            <Form.Control type="text" name="countryName" placeholder="Enter Country name" value={this.state.countryName} onChange={this.handleChange} disabled/>
                        </Form.Group>
                    }

                    <br />
                    <label>Enter state name:</label>
                    <Form.Group className="mb-3" >
                        <Form.Control type="text" name="stateName" placeholder="Enter state name" value={this.state.stateName} onChange={this.handleChange} required />
                    </Form.Group>

                    <br />

                    {this.state.state !== " " ?
                        <label>Select status:</label>
                    :
                        " "
                    }
                    {this.state.state !== " " ?
                        <Form.Group className="mb-3">
                            <select className="form-control" name="status" value={this.state.status} onChange={this.handleChange}>
                                <option>Select status</option>
                                <option value={"true"}>True</option>
                                <option value={"false"} >False</option>
                            </select>
                        </Form.Group>
                        :
                        " "
                    }

                    <br />
                    <Button variant="success" type="submit">
                        Save
                    </Button>&nbsp;&nbsp;
                    {this.state.state === " " ?
                        <Link to={{ pathname: "/states" }}><Button variant="danger" type="cancel">
                            Cancel
                        </Button></Link>
                        : <Button variant="danger" type="cancel" onClick={() => { this.cancel() }}>
                            Cancel
                        </Button>
                    }
                </Form>
            </div>
        )
    }
}