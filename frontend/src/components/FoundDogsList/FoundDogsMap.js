import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class FoundDogsMap extends Component {
  render() {
    console.log(this.props);

    return (
      <Map
        google={this.props.google}
        zoom={10}
        style={{ width: "90vw", height: "90vh", margin: "30px" }}
        initialCenter={{ lat: 55.752376, lng: 37.6722358 }}
      >
        {this.props.foundDogsList &&
          this.props.foundDogsList.map(dog => (
            <Marker
              key={dog._id}
              id={dog._id}
              position={{ lat: dog.location.lat, lng: dog.location.lng }}
            />
          ))}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyA4kMIIQwBwC_BN98wv7uDKLKjGG4WPdAU"
})(FoundDogsMap);
