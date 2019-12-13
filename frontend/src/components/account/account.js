import React, { Component } from 'react'
import axios from 'axios'


const FoundDog = props => (
    <tr>
        <td key={1}>{props.dog.breed}</td>
        <td key={2}>{props.dog.description}</td>
        <td key={3}>{props.dog.sex}</td>
    </tr>
)
const LostDog = props => (
    <tr>
        <td key={1}>{props.dog.breed}</td>
        <td key={2}>{props.dog.description}</td>
        <td key={3}>{props.dog.sex}</td>
    </tr>
)

class Account extends Component {
    state = {
        name: '',
        myLost: [],
        myFound: []
    }
    componentDidMount() {
        axios.get("http://localhost:5000/api/account/" + this.props.match.params.id)
            .then(response => {
                console.log(response.data.myAdverts);

                this.setState({
                    name: response.data.name,
                    email: response.data.email,
                    myFound: response.data.myFound,
                    myLost: response.data.myLost,
                })
                // console.log(this.state);
                // const a = this.state.myAdverts[0];
                // const b = a.dogData.breed;
                // console.log(b);

            })
            .catch((error) => {
                console.log(error);

            })
    };
    foundDogList() {
        return this.state.myFound.map(e => {
            return <FoundDog dog={e.dogData} />
        })
    }
    lostDogList() {
        return this.state.myLost.map(e => {
            return <LostDog dog={e.dogData} />
        })
    }


    render() {

        return (
            <div>
                <h2>{this.state.name}</h2>
                <h2>{this.state.email}</h2>
                <h2>Тобою найденные псы</h2>
                <table>
                    <tr>
                        <th >Breed</th>
                        <th >Description</th>
                        <th >Sex</th>
                    </tr>
                    <tbody>
                        {this.foundDogList()}
                    </tbody>
                </table>
                <h2>Тобою потерянные псы</h2>
                <table >
                    <tr>
                        <th >Breed</th>
                        <th >Description</th>
                        <th >Sex</th>
                    </tr>
                    <tbody>
                        {this.lostDogList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Account;