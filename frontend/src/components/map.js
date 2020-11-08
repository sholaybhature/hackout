import React, { useState, useEffect, useCallback } from 'react';
import DeckGL from '@deck.gl/react';
import { FlyToInterpolator } from 'deck.gl';
import { LineLayer, ScatterplotLayer, IconLayer } from '@deck.gl/layers';
import { StaticMap } from 'react-map-gl';

// const MAPBOX_ACCESS_TOKEN = 'your_mapbox_token';
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic3AxbmFsY29yZCIsImEiOiJja2g3ZWFsaG4wM2Z6MnRuc2NjYXhtZHB5In0.S4-p_UNU2crlAlmNafjLow';

// Data to be used by the LineLayer
const data = [
  { position: [-122.45, 37.78], message: 'Hover over me' },
  { position: [42.45, 37.78], message: 'Hover over me' }
];

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true }
};

export default function Map(props) {



  const [initialViewState, setInitialViewState] = useState({
    latitude: 22.5937,
    longitude: 79.9629,
    zoom: 4,
    pitch: 0,
    bearing: 0,
  });
  // const [hoverInfo, setHoverInfo] = useState();

  const [dataReady, setDataReady] = useState(false);
  useEffect(() => {
    if (dataReady == false) {
      return
    }
    setInitialViewState({
      longitude: props.longitude,
      latitude: props.latitude,
      zoom: 14,
      pitch: 0,
      bearing: 0,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator()
    })
  }, [props.changeLocation == true])


  const [pointData, setPointData] = useState([]);

  const [layerState, setlayerState] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/list/")
      .then(res => res.json())
      .then((repos) => {
        setPointData(repos)
        setDataReady(true)
      });

  }, [])

  const colors = {
    'RD': [95, 23, 219, 100],
    'SL': [17, 205, 216, 100],
    'PW': [234, 216, 191, 100],
    'SW': [195, 93, 71, 100],
    'GB': [223, 34, 230, 100],
    'OR': [29, 24, 31, 100]
  }

  console.log(colors[props.dis])
  return (
    <div>
      {dataReady ?
        <div>
          <ul className="map-legend">
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
                getRadius: d => [d.radius * 100],
                getFillColor: d => colors[d.variant],
                // Enable picking
                pickable: true,
                // Update app state
                // onHover: info => setHoverInfo(info)
              }),
              layerState
            ]}
            onClick={(info, event) => {
              setlayerState([])
              setlayerState(oldArray => [...oldArray,
              new ScatterplotLayer({
                id: 'scatterplot2',
                data: { d: info['coordinate'] },
                // getPosition: info['coordinate'],
                getPosition: info['coordinate'],
                getRadius: 100,
                // getFillColor: [255, 255, 0],
                getFillColor:  colors[props.dis],

                // Enable picking
                pickable: true,
                // Update app state
                // onHover: info => setHoverInfo(info)
              })
              ]);
              console.log(info)
              props.onChangeValueHandlerLat(info['coordinate'][0])
              props.onChangeValueHandlerLong(info['coordinate'][1])
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
        >
          <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
        </DeckGL>
      }
    </div>
  );
} 