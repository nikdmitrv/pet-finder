import React, { Component } from "react";

class LostDogsList extends Component {
  render() {
    return (
      <ul>
        {this.props.lostDogsList &&
          this.props.lostDogsList.map(dog => (
            <li>
              <div>{dog.dogData.breed}</div>
              <div>{dog.dogData.breed}</div>
              <div>{dog.createdAt}</div>
            </li>
          ))}
      </ul>
    );
  }
}

function mapStateToProps(store) {
  return {
    lostDogsList: store.lostDogsList
  };
}

export default connect(mapStateToProps)(LostDogsList);
