import React, {Component} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class AddDocumenttype extends Component {
  constructor(props){
    super(props)
    this.state = {
      doctype: this.props.id? this.props.id : " ",
      status: "true",
      name: "",
    }
  }

  componentDidMount(){
    if(this.state.doctype !== " "){
        axios.get('http://localhost:3000/document-type/find/'+this.state.doctype).then(response => {
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

    var type = {}
    
    this.state.doctype === " " ? 
      type = {
        name: this.state.name,
      }
    : type = {
      name: this.state.name,
      status: this.state.status
    };

    this.state.doctype === " "? this.addDoctype(type) : this.editDoctype(type)

  }

  addDoctype(type){
    axios.post(`http://localhost:3000/document-type/create`, type ,
    {
      'Content-type':'application/json'
    }).then(res => {
      window.location.reload()
    })
  }

  editDoctype(type){
    axios.patch(`http://localhost:3000/roles/`+this.state.doctype, type ,
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
        {this.state.doctype === " "? <h2>Add document type</h2> : <h2>Edit document type</h2>}
        <label>Enter document type name:</label>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" >
              <Form.Control type="text" name="name" placeholder="Enter document type name" value={this.state.name} onChange={this.handleChange} required />
          </Form.Group>
          
          <br />
          {this.state.doctype !== " "?
            <label>Select status:</label>
          :
            ""
          }
          {this.state.doctype !== " "?
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
          {this.state.doctype === " "?
              <Link to={{pathname: "/documenttype"}}><Button variant="danger" type="cancel">
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
