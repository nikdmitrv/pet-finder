import React, { Component } from "react";
import { compose, withStateHandlers } from "recompose";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker
} from "react-google-maps";

export default class FoundDogsMap extends Component {
  initMap = () => {
    const Map = compose(
      withStateHandlers(
        () => ({
          isMarkerShown: false,
          markerPosition: null
        }),
        {
          onMapClick: ({ isMarkerShown }) => e => ({
            markerPosition: e.latLng,
            isMarkerShown: true
          })
        }
      ),
      withScriptjs,
      withGoogleMap
    )(props => (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 55.752376, lng: 37.6722358 }}
        onClick={props.onMapClick}
      >
        {props.isMarkerShown && <Marker position={props.markerPosition} />}
      </GoogleMap>
    ));
    return Map;
  };

  render() {
    const Map = this.initMap();
    return (
      <div style={{ height: "80vh", width: "80vw", padding: "30px" }}>
        <Map
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA4kMIIQwBwC_BN98wv7uDKLKjGG4WPdAU&language=ru&region=RU"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}
