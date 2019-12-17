import React, { Component } from "react";
import axios from 'axios';




export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {

      myDogs: []

    }
  }

  foundDog(dog) {
    console.log("func",dog);
    
    return <li key={dog._id}>
    <span key={1}>{dog.dogData.breed}</span>
    <span key={2}>{dog.dogData.description}</span>
    <span key={3}>{dog.dogData.sex}</span>

  </li>
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/found/')
      .then(response => {
        let newMass = response.data.reverse();

        this.setState({
          myDogs: newMass
        })
        // const result = this.state.myDogs.sort(function(a,b){
        //   let one = a.dogData.date;
        //   let two = b.dogData.date;
        //   return one - two;

        // for(let i=this.state.myDogs.length -1; i> 0; i-- ){
        //   newMass.push(i)
        // }
        // console.log(newMass);

      })
      .catch(function (error) {
        console.log(error);
      })

  }


  render() {

    return (


      <div><ul>
       {this.state.myDogs.slice(2).map(e => this.foundDog(e))}
       </ul>
      </div>
    );
  }
}

