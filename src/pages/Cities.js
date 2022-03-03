import React from 'react';
import axios from 'axios';

const initialState = {
    sname:"",
    StateData: [],
    city: "",
}

export default class Cities extends React.Component {
    state = initialState;

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    // handleFormValidation() {

    //     let nameError = "";
    //     if (!this.state.name) {
    //         nameError = "Country cannot be empty";
    //         this.setState({ nameError });
    //         return false;
    //     } else if (!(/^[aA-zZ\s]+$/.test(this.state.name))) {
    //         nameError = "Invalid country name";
    //         this.setState({ nameError });
    //         return false;
    //     }
    //     return true;
    // };

    componentDidMount() {

        axios.get('http://localhost:3000/states').then(response => {
            console.log(response.data);
            this.setState({
                StateData: response.data
            });
        });
    }
    handleSubmit = event => {
        event.preventDefault();

     /*    const isValid = this.handleFormValidation();
        if (isValid) { */
            const user = {
                state_id: +this.state.sname,    // "+" string to integer conversion
                name: this.state.city //column name:value
            };
//console.log(user);
             axios.post(`http://localhost:3000/cities/create`, user,
                {
                    'Content-type': 'application/json'
                })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                }) 
            //clear form 
            this.setState(initialState);
       // }
    }

    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            Choose state:
                            <select className="form-control" name="sname" value={this.state.sname} onChange={this.handleChange}>
                                <option>Select state</option>
                                {this.state.StateData.map((e, id) => {
                                    return <option value={e.id}>{e.name}</option>;
                                })}
                            </select>
                        </label>
                        <label>
                            City name:
                            <input type="text" name="city" value={this.state.city} placeholder="Enter city name" onChange={this.handleChange} />
                            {/* <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div> */}
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
