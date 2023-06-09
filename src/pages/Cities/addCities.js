import React, {Component} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/Cities.css'
import Navbar from '../../components/Navbar';

export default class AddCities extends Component {
    constructor(props){
        super(props)
        this.state = {
            city: this.props.city ? this.props.city : " ",
            state: this.props.state ? this.props.state : [],
            stateName: "",
            cityName: "",
            status: "true",
            name: "",
        }
    }

    componentDidMount() {

        if (this.state.city !== " ") {
            axios.get('/cities/' + this.state.city).then(response => {
                this.setState({
                    cityName: response.data.data.name
                });
            });

            axios.get('/states/' + this.state.state).then(response => {
                this.setState({
                    stateName: response.data.data.name
                });
            });
        } else {
            axios.get('/states').then(response => {
                this.setState({
                    state: response.data.data
                });
            });
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        var city = {}
        this.state.city === " "?
        city = {
            name: this.state.cityName,
            state_id: parseInt(this.state.stateName),
        }
        : city = {
            name: this.state.cityName,
            status: this.state.status
        }

        this.state.city === " "? this.addCity(city) : this.editCity(city)
    }

    addCity(city){
        axios.post(`/cities/create`, city ,
        {
            'Content-type':'application/json'
        }).then(res => {
            window.location.reload()
        })
    }

    editCity(city){
        
        var isBool = city.status.toString().toLowerCase()=='true'
        const data = {
            name:city.name,
            status:isBool
        }

        axios.patch(`/cities/`+this.state.city, data ,
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
            <div className='mainAddDesignation'>
                {this.state.city === " " ? <h2>Add City</h2> : <h2>Edit City</h2>}
                <Form onSubmit={this.handleSubmit}>
                    <label className='EDNameLabel'>Choose State:</label>
                    {this.state.city === " " ?
                        <Form.Group className="mb-3">
                            <select   className="form-control EDNInPut" name="stateName" onChange={this.handleChange}>
                                <option value="">Select</option>
                                { this.state.state.map((e) => (
                                    <option value={e.id}>{e.name}</option>
                                ))
                                }
                            </select>
                        </Form.Group> 
                    :
                        <Form.Group className="mb-3" >
                            <Form.Control type="text" className='EDNInPut' name="stateName" placeholder="Enter state name" value={this.state.stateName} onChange={this.handleChange} disabled />
                        </Form.Group>
                    }

                    <br />
                    <label className='EDNameLabel'>Enter city name:</label>
                    <Form.Group className="mb-3" >
                        <Form.Control type="text" name="cityName" className='EDNInPut' placeholder="Enter city name" value={this.state.cityName} onChange={this.handleChange} required />
                    </Form.Group>

                    <br />

                    {this.state.city !== " " ?
                        <label style={{marginLeft:"80px"}}>Select status:</label>
                    :
                        " "
                    }
                    {this.state.city !== " " ?
                        <Form.Group className="mb-3">
                            <select className="form-control"   name="status" value={this.state.status} onChange={this.handleChange}>
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
                    {this.state.city === " " ?
                        <Link to={{ pathname: "/cities" }}><Button className="CancelButton" type="cancel">
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
