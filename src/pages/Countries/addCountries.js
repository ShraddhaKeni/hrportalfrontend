import {Component} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class AddCountries extends Component {
  constructor(props){
    super(props)
    this.state = {
      country: this.props.id? this.props.id : " ",
      status: "true",
      name: "",
      nameError: ""
    }
  }

  componentDidMount(){
    if(this.state.country !== " "){
      axios.get('http://localhost:3000/countries/'+this.state.country).then(response => {
          this.setState({
              name: response.data.data.name
          });
      });
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }
   

  handleSubmit = event => {
    event.preventDefault();
    
    var country = {}
    this.state.country === " "?
      country = {
        name: this.state.name
      }
    : country = {
        name: this.state.name,
        status: this.state.status
    }

    this.state.country === " "? this.addCountry(country) : this.editCountry(country)
    
  }

  addCountry(country){
    axios.post(`http://localhost:3000/countries/create`, country ,
    {
      'Content-type':'application/json'
    }).then(res => {
      window.location.reload()
    })
    window.location.reload()
  }

  editCountry(country){
    
    var toBool = country.status.toString().toLowerCase()=='true';
    const data = {
      name:country.name,
      status:toBool
    }
    axios.patch(`http://localhost:3000/countries/`+this.state.country, data ,
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
        {this.state.country === " "? <h2>Add Country</h2> : <h2>Edit Country</h2>}
        <label>Enter Country name:</label>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" >
              <Form.Control type="text" name="name" placeholder="Enter Country name" value={this.state.name} onChange={this.handleChange} required />
          </Form.Group>
          
          <br />

          {this.state.country !== " "?
            <label>Select status:</label>
          :
            ""
          }
          {this.state.country !== " "?
            <Form.Group className="mb-3">
                <select className="form-control" name="status" value={this.state.status} onChange={this.handleChange}>
                    <option>Select</option>
                    <option value={"true"}>True</option>
                    <option value={"false"}>False</option>
                </select>
            </Form.Group>
          :
            " "
          }

          <br/>
          <Button variant="success" type="submit">
              Save
          </Button>&nbsp;&nbsp;
          {this.state.country === " "?
              <Link to={{pathname: "/countries"}}><Button variant="danger" type="cancel">
                  Cancel
              </Button></Link>
            : <Button variant="danger" type="cancel" onClick={() => {this.cancel()}}>
              Cancel
              </Button> 
          }
        </Form>
      </div>
    )
  }
}