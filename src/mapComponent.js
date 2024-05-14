import React from "react";
import { APIProvider, Map, InfoWindow, Marker } from '@vis.gl/react-google-maps';
import { MarkerWithInfowindow } from './markerWithInfoWindow';
import data from "./secrets.json"

const API_KEY = data["key"];

export default class SimpleMap extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  state = {
    places: []
  }

  addMarker(e) {
    console.log(e)
    if (document.getElementById('vehicle1').checked) {
      const newPlace = {
        id: this.state.places.length,
        lat: e.detail.latLng.lat,
        lng: e.detail.latLng.lng,
      };
      this.setState({
        places: [...this.state.places, newPlace]
      })
    }
  }

  render() {
    return (
      <div style={{ height: '100vh', width: '80%', float: "left" }}>
        <APIProvider apiKey={API_KEY}>
          <Map
            defaultZoom={3}
            defaultCenter={{lat: 22.54992, lng: 0}}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            onClick={(e) => this.addMarker(e)}
          />
          {this.state.places.map(place => {
            return (
              <div>
                <Marker
                  key={place.id}
                  position={{ lat: place.lat, lng: place.lng}}
                />
                <InfoWindow position={{lat: place.lat, lng: place.lng}} maxWidth={200}>
                  <p>
                    This is the content for another infowindow with <em>HTML</em>
                    -elements.
                  </p>
                </InfoWindow>
                <MarkerWithInfowindow/>
              </div>
            )
          })}
            {/* <Marker
              position={{lat: 10, lng: 10}}
              clickable={true}
              onClick={() => alert('marker was clicked!')}
              title={'clickable google.maps.Marker'}
            /> */}
        </APIProvider>
      </div>
    )
  }
}
