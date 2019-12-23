import React from "react";
import { compose, withStateHandlers } from "recompose";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker
} from "react-google-maps";

export default class MapContainer extends React.Component {
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
        {props.isMarkerShown && null === getMark(props.markerPosition)}
      </GoogleMap>
    ));
    const getMark = location => {
      this.props.getLocation({ lat: location.lat(), lng: location.lng() });
    };
    return Map;
  };

  render() {
    const Map = this.initMap();
    return (
      <div
        className="map"
        style={{ height: "500px", width: "1400px", padding: "30px" }}
      >
        <Map
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&language=ru&region=RU`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}
