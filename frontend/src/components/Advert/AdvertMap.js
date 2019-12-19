import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class AdvertMap extends Component {
  renderMarkers = location => {
    return <Marker position={location}></Marker>;
  };

  render() {
    return (
      <div className="map" style={{ height: "500px", width: "1400px", padding: "30px" }}>
        
          <Map
            google={this.props.google}
            zoom={10}
            style={{ height: "400px", width: "500px", padding: "30px" }}
            initialCenter={{ lat: 55.752376, lng: 37.6722358 }}
            onClick={this.onMapClicked}
          >
            {this.renderMarkers(this.props.location)}
          </Map>
        
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyA4kMIIQwBwC_BN98wv7uDKLKjGG4WPdAU"
})(AdvertMap);
