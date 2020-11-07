import React, {useState, useEffect} from 'react';
import DeckGL from '@deck.gl/react';
import { LineLayer,ScatterplotLayer, IconLayer } from '@deck.gl/layers';
import { StaticMap } from 'react-map-gl';

// const MAPBOX_ACCESS_TOKEN = 'your_mapbox_token';
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic3AxbmFsY29yZCIsImEiOiJja2g3ZWFsaG4wM2Z6MnRuc2NjYXhtZHB5In0.S4-p_UNU2crlAlmNafjLow';

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: 78.9629,
  latitude: 20.5937,
  zoom: 4,
  pitch: 0,
  bearing: 0,

};

// Data to be used by the LineLayer
const data = [
  { position: [-122.45, 37.78], message: 'Hover over me' },
  { position: [42.45, 37.78], message: 'Hover over me' }
];

const data_icon = {
  marker: {x: -122.45, y: 37.78, width: 1280, height: 1280, mask: true}
};

export default function Map() {
  // const [hoverInfo, setHoverInfo] = useState();

  const [pointData, setPointData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/list/")
        .then(res => res.json())
        .then((repos) => {
          setPointData(repos)
        });
    
  },[])
  
  

  const [layerState, setlayerState] = useState([
    // new ScatterplotLayer({
    //   id: 'scatterplot',
    //   data,
    //   getPosition: d => d.position,
    //   getRadius: 100000,
    //   getFillColor: [255, 255, 0],
    //   // Enable picking
    //   pickable: true,
    //   // Update app state
    //   // onHover: info => setHoverInfo(info)
    // }),
    new ScatterplotLayer({
      id: 'scatterplot',
      data,
      getPosition: d =>  [42.45, 37.78],
      getRadius: 500000,
      getFillColor: [255, 255, 0],
      // Enable picking
      pickable: true,
      // Update app state
      // onHover: info => setHoverInfo(info)
    }),
  ]);

  console.log(pointData)
  
  if(!pointData){
    return null;
  }

  return (
    // <div class="my-container" style={{ height: '100vh', width: '41vw', position: 'relative' }}>
    <div>
      <DeckGL
        // width='100%'
        // height='80%'
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layerState}
        onClick={(info, event) => {
          setlayerState([])
          setlayerState(oldArray => [...oldArray, 
            new ScatterplotLayer({
              id: 'scatterplot',
              data,
              // getPosition: info['coordinate'],
              getPosition: info['coordinate'],
              getRadius: 100000,
              getFillColor: [255, 255, 0],
              // Enable picking
              pickable: true,
              // Update app state
              // onHover: info => setHoverInfo(info)
            })]);
        }}
        // {...hoverInfo.object && (
        //   <div style={{ position: 'absolute', zIndex: 1, pointerEvents: 'none', left: hoverInfo.x, top: hoverInfo.y }}>
        //     {hoverInfo.object.message}
        //   </div>
        //   )}
          >
          <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
    </div>
  );
} 