import React, { useState } from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';

export const MarkerWithInfowindow = ({ lat, lng, title, onClickFunc }) => {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();

  function handleMarkerClick(e) {
    // console.log(e)
    if (document.getElementById('remove').checked) {
      onClickFunc(e);
    } else {
      setInfowindowOpen(true);
    }
  }

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={(e) => handleMarkerClick(e)}
        position={{ lat, lng }}
        title={title}
      />
      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}
        >
          This is an example for the{' '}
          <code style={{ whiteSpace: 'nowrap' }}>&lt;AdvancedMarker /&gt;</code>{' '}
          combined with an Infowindow.
        </InfoWindow>
      )}
    </>
  );
};
