import React from "react";
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { MarkerWithInfowindow } from './markerWithInfoWindow';
import { collection, getDocs, addDoc, GeoPoint, doc, deleteDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { db } from './config.js';
import data from "./secrets.json"

const API_KEY = data["key"];

export default class SimpleMap extends React.Component {

  state = {
    places: []
  }

  componentDidMount() {
    // this.readData();
  }

  async readData() {
    const querySnapshot = await getDocs(collection(db, "markers"));
    const places = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const markerData = data.marker; // Access marker data
      if (markerData) { // Check if marker data is defined
        const { geoPoint } = markerData;
        if (geoPoint) { // Check if geoPoint is defined
          const lat = geoPoint.latitude;
          const lng = geoPoint.longitude;
          places.push({
            id: doc.id,
            lat,
            lng
          });
        }
      }
    });
    this.setState({ places });
  }

  async addMarker(e) {
    if (document.getElementById('add').checked) {
      const newPlace = {
        id: uuidv4(),
        lat: e.detail.latLng.lat,
        lng: e.detail.latLng.lng,
      };

      const newDoc = {
        id: uuidv4(),
        geoPoint: new GeoPoint(e.detail.latLng.lat, e.detail.latLng.lng),
      }

        try {
          await addDoc(collection(db, "markers"), {
            marker: newDoc,    
          });
          this.setState({
            places: [...this.state.places, newPlace]
          })
        } catch (e) {
          alert("Error adding document: ", e);
        }
    }
  }

  async removeMarker(e) {
    // Only remove if the remove checkbox is true.
    if (document.getElementById('remove').checked) {
      const lat = e.latLng.lat()
      const lng = e.latLng.lng()

      // Get the id of the marker by checking the state
      let id = 0;
      for (let i = 0; i < this.state.places.length; i++) {
        const place = this.state.places[i];
        if (place.lat === lat && place.lng === lng) {
          id = place.id;
        }
      }

      // Remove from firestore
      try {
        await deleteDoc(doc(db, "markers", id));
        // If it was removed from firestore, then remove from the state
        this.setState(prevState => ({
          places: prevState.places.filter(place => !(place.lat === lat && place.lng === lng))
        }));
      } catch (e) {
        alert("Error adding marker");
      }
    }
  }

  render() {
    return (
      <div style={{ height: '100vh', width: '80%', float: "left" }}>
        <APIProvider apiKey={API_KEY}>
          <Map
            key={"Map"}
            mapId={"0"}
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
              </div>
            )
          })}
            <MarkerWithInfowindow 
              lat={10}
              lng={10}
              title={"Title"}
            />
        </APIProvider>
      </div>
    )
  }
}
