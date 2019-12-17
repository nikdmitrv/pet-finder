import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const FoundDog = props => (
  <tr>
    <td key={1}>{props.dog.dogData.breed}</td>
    <td key={2}>{props.dog.dogData.description}</td>
    <td key={3}>{props.dog.dogData.sex}</td>
    <Link to={"/editFound/" + props.dog._id}>Редактировать/Удалить</Link>
  </tr>
);
const LostDog = props => (
  <tr>
    <td key={1}>{props.dog.dogData.breed}</td>
    <td key={2}>{props.dog.dogData.description}</td>
    <td key={3}>{props.dog.dogData.sex}</td>
    <Link to={"/editLost/" + props.dog._id}>Редактировать/Удалить</Link>
  </tr>
);

class Account extends Component {
  state = {
    name: "",
    myLost: [],
    myFound: []
  };
  componentDidMount() {
    axios
      .get("/api/account/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          email: response.data.email,
          myFound: response.data.myFound,
          myLost: response.data.myLost
        });
        // console.log(this.state);
        // const a = this.state.myAdverts[0];
        // const b = a.dogData.breed;
        // console.log(b);
      })
      .catch(error => {
        console.log(error);
      });
  }
  foundDogList() {
    return this.state.myFound.map(e => {
      return <FoundDog dog={e} />;
    });
  }
  lostDogList() {
    return this.state.myLost.map(e => {
      return <LostDog dog={e} />;
    });
  }

  // deleteLostDog(id) {
  //     axios.delete('http://localhost:5000/api/lost'+id)
  //       .then(response => { console.log(response.data)});

  //     this.setState({
  //       tasks: this.state.tasks.filter(el => el._id !== id)
  //     })
  //   }

  //   deleteFoundDog(id) {
  //     axios.delete('http://localhost:5000/api/found'+id)
  //       .then(response => { console.log(response.data)});

  //     this.setState({
  //       tasks: this.state.tasks.filter(el => el._id !== id)
  //     })
  //   }

  render() {
    return (
      <div>
        <h2>{this.state.name}</h2>
        <h2>{this.state.email}</h2>
        <h2>Ваши объявления о пропаже</h2>
        <table>
          <tr>
            <th>Breed</th>
            <th>Description</th>
            <th>Sex</th>
          </tr>
          <tbody>{this.foundDogList()}</tbody>
        </table>
        <h2>Ваши объявления о находке</h2>
        <table>
          <tr>
            <th>Breed</th>
            <th>Description</th>
            <th>Sex</th>
          </tr>
          <tbody>{this.lostDogList()}</tbody>
        </table>
        <p>
          <Link to="/add-lost-dog">Добавить объявление о пропаже</Link>
          <Link to="/add-found-dog">Добавить объявление о находке</Link>
        </p>
      </div>
    );
  }
}

export default Account;
