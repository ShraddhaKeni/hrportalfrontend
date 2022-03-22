import {Component} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class AddLeveltype extends Component {
  constructor(props){
    super(props)
    this.state = {
      level: this.props.id? this.props.id : " ",
      status: "true",
      name: "",
    }
  }  

  componentDidMount(){
    if(this.state.level !== " "){
        axios.get('http://localhost:3000/level-types/'+this.state.level).then(response => {
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

    var level = {}
    
    this.state.level === " " ? 
      level = {
        name: this.state.name,
      }
    : level = {
      name: this.state.name,
      status: this.state.status
    };

    this.state.level === " "? this.addLeveltype(level) : this.editLeveltype(level)
  }

  addLeveltype(level){
    axios.post(`http://localhost:3000/level-types/add`, level ,
    {
      'Content-type':'application/json'
    }).then(res => {
      window.location.reload()
    })
  }

  editLeveltype(level){
    axios.patch(`http://localhost:3000/level-types/`+this.state.level, level ,
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
        {this.state.level === " "? <h2>Add level type</h2> : <h2>Edit level type</h2>}
        <label>Enter level type name:</label>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" >
              <Form.Control type="text" name="name" placeholder="Enter level type name" value={this.state.name} onChange={this.handleChange} required />
          </Form.Group>
          
          <br />
          {this.state.level !== " "?
            <label>Select status:</label>
          :
            ""
          }
          {this.state.level !== " "?
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
          {this.state.level === " "?
              <Link to={{pathname: "/leveltype"}}><Button variant="danger" type="cancel">
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
