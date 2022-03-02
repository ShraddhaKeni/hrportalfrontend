import React from 'react';
import axios from 'axios';

const initialState = {
    country: "",
    CountryData: [],
    sname:"",
}

export default class States extends React.Component {
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
        // console.log('ssss');
        // console.log(this.state.country);

        axios.get('http://localhost:3200/states').then(response => {
            console.log(response.data);
            this.setState({
                CountryData: response.data
            });
        });
    }
    handleSubmit = event => {
        event.preventDefault();

     /*    const isValid = this.handleFormValidation();
        if (isValid) { */
            const user = {
                country_id: +this.state.country,    // "+" string to integer conversion
                name: this.state.sname //column name:value
            };
//console.log(user);
             axios.post(`http://localhost:3200/states/create`, user,
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
                            Choose country:
                            <select className="form-control" name="country" value={this.state.country} onChange={this.handleChange}>
                                <option>Select country</option>
                                {this.state.CountryData.map((e, id) => {
                                    return <option value={e.id}>{e.name}</option>;
                                })}
                            </select>
                        </label>
                        <label>
                            State name:
                            <input type="text" name="sname" value={this.state.sname} placeholder="Enter state name" onChange={this.handleChange} />
                            <div style={{ color: "red", paddingBottom: 10 }}>{this.state.nameError}</div>
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
