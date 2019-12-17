import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

class FoundDogsMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      activeMarker: null,
      showInfo: true
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch("/api/lost");
      if (response.status === 200) {
        const result = await response.json();
        this.setState({ list: result });
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  onMapClicked = props => {
    if (this.state.showInfo) {
      this.setState({
        showInfo: false,
        activeMarker: null
      });
    }
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      activeMarker: marker,
      showInfo: true
    });

  renderMarkers = (dog, index) => {
    return (
      <Marker
        name={dog._id}
        title={dog.dogData.breed}
        key={dog._id}
        label={String(index + 1)}
        position={{ lat: dog.location.lat, lng: dog.location.lng }}
        onClick={this.onMarkerClick}
      >
        <InfoWindow marker={this.state.activeMarker} visible={this.state.showInfo}>
          <div>
            <h2>{dog.dogData.breed}</h2>
            <span>Something</span>
          </div>
        </InfoWindow>
      </Marker>
    );
  };

  render() {
    return (
      <div className="maps-app">
        <div
          className="map-container"
          style={{ width: "80vw", height: "90vh", margin: "30px" }}
        >
          <Map
            google={this.props.google}
            zoom={10}
            style={{ width: "80vw", height: "90vh", margin: "30px" }}
            initialCenter={{ lat: 55.752376, lng: 37.6722358 }}
            onClick={this.onMapClicked}
          >
            {this.state.list &&
              this.state.list.map((dog, index) =>
                this.renderMarkers(dog, index)
              )}
          </Map>
        </div>
        <div className="maps-list-container">
          <ol>
            {this.state.list &&
              this.state.list.map(dog => (
                <li key={dog._id}>
                  <span>{dog.dogData.breed} </span>
                  <span>{dog.dogData.sex} </span>
                  <span>{dog.dogData.description} </span>
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyA4kMIIQwBwC_BN98wv7uDKLKjGG4WPdAU"
})(FoundDogsMap);
