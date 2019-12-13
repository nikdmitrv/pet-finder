import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class Maps extends Component {
  state = {
    marker: {}
  };

  placeMarker(event) {
    console.log(event);
  }

  // componentDidMount() {
  //   let map = document.getElementById("map");
  //   console.log(map);

  //   this.props.google.maps.event.addListener(map, "click", function(event) {
  //     placeMarker(event.latLng);
  //   });

  //   function placeMarker(location) {
  //     var marker = new this.props.google.maps.Marker({
  //       position: location,
  //       map: map
  //     });
  //     console.log(marker);

  //     this.setState({ marker });
  //   }
  // }

  render() {
    const mapStyle = {
      height: "80%",
      margin: "30px"
    };
    return (
      <>
        <Map
          google={this.props.google}
          zoom={10}
          style={mapStyle}
          initialCenter={{ lat: 55.752376, lng: 37.6722358 }}
          onClick={e => this.placeMarker(e)}
        >
          <Marker position={this.state.marker} />
        </Map>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyA4kMIIQwBwC_BN98wv7uDKLKjGG4WPdAU"
})(Maps);
