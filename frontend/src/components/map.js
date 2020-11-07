import React from 'react';
import DeckGL from '@deck.gl/react';
import {LineLayer} from '@deck.gl/layers';
import {StaticMap} from 'react-map-gl';

// const MAPBOX_ACCESS_TOKEN = 'your_mapbox_token';
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic3AxbmFsY29yZCIsImEiOiJja2g3ZWFsaG4wM2Z6MnRuc2NjYXhtZHB5In0.S4-p_UNU2crlAlmNafjLow';

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: 78.9629,
  latitude: 20.5937,
//   center: [78.9629, 20.5937],
  zoom: 4,
  pitch: 0,
  bearing: 0,
  width: "100%",
  height: "100%",
};

// Data to be used by the LineLayer
const data = [
  {sourcePosition: [28.4089,  77.3178], targetPosition: [28.4089, 77.3178]}
];

export default function Map({data}) {
  const layers = [
    new LineLayer({id: 'line-layer', data})
  ];

  return (
    //   <div class="my-container" style={{ height: '100vh', width: '41vw', position: 'relative' }}>
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    >
      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
    // </div>
  );
}