import React from "react";
import { APIProvider, Map, InfoWindow, Marker } from '@vis.gl/react-google-maps';
import { MarkerWithInfowindow } from './markerWithInfoWindow';
import { collection, addDoc, GeoPoint } from "firebase/firestore";
import {db} from './config.js';
import data from "./secrets.json"

const API_KEY = data["key"];

export default class SimpleMap extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  state = {
    places: []
  }

  async addMarker(e) {
    if (document.getElementById('vehicle1').checked) {
      const newPlace = {
        id: this.state.places.length,
        lat: e.detail.latLng.lat,
        lng: e.detail.latLng.lng,
      };

      const newDoc = {
        id: this.state.places.length,
        geoPoint: new GeoPoint(e.detail.latLng.lat, e.detail.latLng.lng),
      }
      // const addMarkerToFirestore = async (e) => {
        // e.preventDefault();  
       
        try {
          const docRef = await addDoc(collection(db, "markers"), {
            marker: newDoc,    
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
    // }

      this.setState({
        places: [...this.state.places, newPlace]
      })
    }
  }

  removeMarker(e) {
    let lat = e.latLng.lat()
    let lng = e.latLng.lng()
    if (document.getElementById('vehicle2').checked) {
      this.setState(prevState => ({
        places: prevState.places.filter(place => !(place.lat === lat && place.lng === lng))
      }));
    }
  }

  render() {
    return (
      <div style={{ height: '100vh', width: '80%', float: "left" }}>
        <APIProvider apiKey={API_KEY}>
          <Map
            key={"Map"}
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
                  onClick={(e) => this.removeMarker(e)}
                />
                {/* <InfoWindow position={{lat: place.lat, lng: place.lng}} maxWidth={200}>
                  <p>
                    This is the content for another infowindow with <em>HTML</em>
                    -elements.
                  </p>
                </InfoWindow> */}
                {/* <MarkerWithInfowindow/> */}
              </div>
            )
          })}
            {/* <Marker
              position={{lat: 10, lng: 10}}
              clickable={true}
              // onClick={() => alert('marker was clicked!')}
              onClick={(e) => this.removeMarker(e)}
              title={'clickable google.maps.Marker'}
            /> */}
        </APIProvider>
      </div>
    )
  }
}
