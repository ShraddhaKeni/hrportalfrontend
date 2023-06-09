import React, {Component} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/States.css'
import Navbar from '../../components/Navbar';

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
            axios.get('/states/' + this.state.state).then(response => {
                this.setState({
                    stateName: response.data.data.name
                });
            });

            axios.get('/countries/' + this.state.country).then(response => {
                this.setState({
                    countryName: response.data.data.name
                });
            });
        } else {
            axios.get('/countries').then(response => {
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
        axios.post(`/states/create`, state ,
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
        axios.patch(`/states/`+this.state.state, data ,
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
            <>      
            <Navbar/>   
      
            <div className="mainAddDesignation">
                {this.state.state === " " ? <h2>Add State</h2> : <h2>Edit State</h2>}
                <Form onSubmit={this.handleSubmit}>
                    <label className='EDNameLabel'>Choose Country:</label>
                    {this.state.state === " " ?
                        <Form.Group className="mb-3">
                            <select  className="form-control EDNInPut" name="countryName" onChange={this.handleChange}>
                                <option value="">Select</option>
                                { this.state.country.map((e) => (
                                    <option value={e.id}>{e.name}</option>
                                ))
                                }
                            </select>
                        </Form.Group> 
                    :
                        <Form.Group className="mb-3" >
                            <Form.Control type="text" name="countryName" className='EDNInPut' placeholder="Enter Country name" value={this.state.countryName} onChange={this.handleChange} disabled/>
                        </Form.Group>
                    }

                    <br />
                    <label className='EDNameLabel'>Enter state name:</label>
                    <Form.Group className="mb-3" >
                        <Form.Control type="text" name="stateName" className='EDNInPut'  placeholder="Enter state name" value={this.state.stateName} onChange={this.handleChange} required />
                    </Form.Group>

                    <br />

                    {this.state.state !== " " ?
                        <label style={{marginLeft:"80px"}}>Select status:</label>
                    :
                        " "
                    }
                    {this.state.state !== " " ?
                        <Form.Group className="mb-3">
                            <select className="form-control"  name="status" value={this.state.status} onChange={this.handleChange}>
                                <option>Select status</option>
                                <option value={"true"}>True</option>
                                <option value={"false"} >False</option>
                            </select>
                        </Form.Group>
                        :
                        " "
                    }

                    <br />
                    <Button className="SaveButton" type="submit">
                        Save
                    </Button>&nbsp;&nbsp;
                    {this.state.state === " " ?
                        <Link to={{ pathname: "/states" }}><Button className="CancelButton" type="cancel">
                            Cancel
                        </Button></Link>
                        : <Button className="CancelButton" type="cancel" onClick={() => { this.cancel() }}>
                            Cancel
                        </Button>
                    }
                </Form>
            </div>
     
          </>

        )
    }
}
