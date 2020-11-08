import React, { useState, useEffect, useCallback } from 'react';
import DeckGL from '@deck.gl/react';
import { FlyToInterpolator } from 'deck.gl';
import { LineLayer, ScatterplotLayer, IconLayer } from '@deck.gl/layers';
import { StaticMap } from 'react-map-gl';

import MiniDrawer from './navbar'
import '../App.css'

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
  { sourcePosition: [28.4089, 77.3178], targetPosition: [28.4089, 77.3178] }
];

export default function MapPage({ data }) {
  const layers = [
    new LineLayer({ id: 'line-layer', data })
  ];
  const [initialViewState, setInitialViewState] = useState({
    latitude: 22.5937,
    longitude: 79.9629,
    zoom: 4,
    pitch: 0,
    bearing: 0,
  });
  const [pointData, setPointData] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const [hotData, setHotData] = useState([])

  useEffect(() => {
    fetch("http://localhost:8000/api/list/")
      .then(res => res.json())
      .then((repos) => {
        setPointData(repos)
        setDataReady(true)
      });
    // fetch("http://127.0.0.1:8000/api/list/?filter=upvotes")
    //   .then(res => res.json())
    //   .then((repos) => {
    //     setHotData(repos)
    //   });

  }, [])

  const colors = {
    'RD': [95, 23, 219, 100],
    'SL': [17, 205, 216, 100],
    'PW': [234, 216, 191, 100],
    'SW': [195, 93, 71, 100],
    'GB': [223, 34, 230, 100],
    'OR': [29, 24, 31, 100]
  }

  return (
    <div>
      <MiniDrawer />
      <div>
        {dataReady ?
          <div>
            <ul className="map-legend-page">
            <li className="list-item">Road<span className="list-road"></span></li>
            <li className="list-item">Street Light<span className="list-light"></span></li>
            <li className="list-item">Public Washroom<span className="list-washroom"></span></li>
            <li className="list-item">Sewage<span className="list-sewage"></span></li>
            <li className="list-item">Garbage<span className="list-garbage"></span></li>
            <li className="list-item">Other<span className="list-other"></span></li>
          </ul>
            <DeckGL
              initialViewState={initialViewState}
              controller={true}
              layers={[
                new ScatterplotLayer({
                  id: 'scatterplot',
                  data: pointData,
                  getPosition: d => [d.longitude, d.latitude],
                  getRadius: d => [d.radius * 1000],
                  getFillColor: d => colors[d.variant],
                  // Enable picking
                  pickable: true,
                  // Update app state
                  // onHover: info => setHoverInfo(info)
                }),
              ]}
              onClick={(info, event) => {

              }}

            >
              {/* {hoverInfo.object && (
              <div style={{ position: 'absolute', zIndex: 1, pointerEvents: 'none', left: hoverInfo.x, top: hoverInfo.y }}>
                { hoverInfo.object.message}
              </div>
            )} */}
              <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
            </DeckGL>
          </div>
          :
          <DeckGL
            initialViewState={initialViewState}
            controller={true}
            layers={[
              new ScatterplotLayer({
                id: 'scatterplot',
                data,
                getPosition: d => [42.45, 37.78],
                getRadius: 500000,
                getFillColor: [255, 255, 0],
                // Enable picking
                pickable: true,
                // Update app state
                // onHover: info => setHoverInfo(info)
              }),
            ]}
            onClick={(info, event) => {
              // setlayerState([])
              // setlayerState(oldArray => [...oldArray,
              // new ScatterplotLayer({
              //   id: 'scatterplot',
              //   data,
              //   // getPosition: info['coordinate'],
              //   getPosition: info['coordinate'],
              //   getRadius: 100000,
              //   getFillColor: [255, 255, 0],
              //   // Enable picking
              //   pickable: true,
              //   // Update app state
              //   // onHover: info => setHoverInfo(info)
              // })]);
            }}
          >
            <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
          </DeckGL>
        }
      </div>
      <div className='footer'>
        A crowdsourced initiative.
        </div>
    </div>
  );
} 