import React from "react";
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import data from "./secrets.json"

const API_KEY = data["key"];

const SimpleMap = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <APIProvider apiKey={API_KEY}>
        <Map
          defaultZoom={3}
          defaultCenter={{lat: 22.54992, lng: 0}}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        />
          <Marker
            position={{lat: 10, lng: 10}}
            clickable={true}
            onClick={() => alert('marker was clicked!')}
            title={'clickable google.maps.Marker'}
          />
      </APIProvider>
    </div>
  );
};

export default SimpleMap;

