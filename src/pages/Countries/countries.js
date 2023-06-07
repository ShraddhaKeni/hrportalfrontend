import { Component } from 'react';
import axios from 'axios';
import { Table, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddCountries from './addCountries';
import './styles/Countries.css'
import Pagination from '../../components/paginate/Pagination';
import Navbar from '../../components/Navbar';

const initialState = {
    countries: [],
    isEdit: false,
    editValue: null,
    currentPage:1,
    postPerPage:12,
    currentPosts:[],
}

export default class Countries extends Component {
    constructor(props) {
        super(props)
        this.state = initialState;
    }

    componentDidMount() {
        axios.get('/countries').then(response => {
            this.setState({
                countries: response.data.data
            });
        }).then(() => {
            const indexOfLast = (this.state.currentPage * this.state.postPerPage);
            const indexOfFirst = (indexOfLast - this.state.postPerPage);
            this.setState({ currentPosts: this.state.countries.slice(indexOfFirst, indexOfLast) });

        });
    }

    editClicked(id) {
        this.setState({
            isEdit: true,
            editValue: id,
        })
    }
    async changeStatus(id, status) {
        var statuscode = status.toString().toLowerCase() == 'true'
        const data = {
            status: !statuscode
        }
        console.log(data)
        const requestChangeStatus = await axios.patch(`/countries/${id}`, data, {
            'Content-type': 'application/json'
        })
        window.location.reload()
    }

    paginate = (pageNumber) => {

        const page = pageNumber;
        console.log(page)
        const totalPages = (this.state.countries.length / this.state.postPerPage)
        if (page < 1) {
            this.setState({ currentPage: 1 })
            const indexOfLast = (1 * this.state.postPerPage);
            const indexOfFirst = (indexOfLast - this.state.postPerPage);
            this.setState({ currentPosts: this.state.countries.slice(indexOfFirst, indexOfLast) });
        }
        else {
            this.setState({ currentPage: page })
            const indexOfLast = (page * this.state.postPerPage);
            const indexOfFirst = (indexOfLast - this.state.postPerPage);
            this.setState({ currentPosts: this.state.countries.slice(indexOfFirst, indexOfLast) });
        }
    }

    render() {
        if (this.state.isEdit === true) {
            return (
                <AddCountries id={this.state.editValue} />
            )
        } else {
            var srno = 1
            return (
                <>
                <Navbar/>
                <div className='mainViewCountry'>
                <div style={{display:'flex', margin: '3% 0% 0% 51%'}}>
                    <div><b><h1>Countries</h1></b></div>
                    <div style={{marginLeft: '4%'}}><Link to={{ pathname: "/add-country" }}><button className='viewAddDesignationButton btn btn-primary'>Add Country</button></Link></div>
                    </div>
               
                    {/* <h2> <span style={{ float: 'right' }}><Link to={{ pathname: "/add-country" }}><button className='viewAddCountryButton'>Add Country<span style={{ fontSize: 18, color: "white" }}></span></button></Link></span></h2> */}
                    <div className='viewDesignationContainer table-responsive'>
                        <table className='table table-sm table-hover' responsive>
                            <thead >
                                <tr>
                                    <th scope="col">Sr no.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                        this.state.currentPosts.map((country,index) => (
                                        <tr key={country.id}>
                                             <td scope="row">{this.state.currentPage<=2?(this.state.currentPage-1)*12+(index+1):(this.state.currentPage-1+1)+(index+1)}</td>
                                            <td>{country.name}</td>
                                            {
                                                country.status === true ? <td><span style={{ fontSize: 24, color: "green" }}>&#10003;</span></td>
                                                    : <td><span style={{ fontSize: 12, color: "red" }}>&#10060;</span></td>
                                            }
                                            <td>
                                                {country.status != false ? <Button className='deleteButton' onClick={() => { this.changeStatus(country.id, country.status) }} >
                                                    Inactivate
                                                </Button> : <Button className='deleteButton' onClick={() => { this.changeStatus(country.id, country.status) }} >
                                                    Activate
                                                </Button>}
                                                <Button className='editButton' onClick={() => { this.editClicked(country.id) }} >
                                                    Edit
                                                </Button>
                                            </td>
                                        </tr>

                                    ))}
                            </tbody>
                        </table>
                        <Pagination postPerPage={this.state.postPerPage} totalPosts={this.state.countries.length} paginate={this.paginate} currentPage={this.state.currentPage} />
                    </div>
                </div>
                </>
            )
        }
    }
}