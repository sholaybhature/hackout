import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeckGL from '@deck.gl/react';
import { FlyToInterpolator } from 'deck.gl';
import { LineLayer, ScatterplotLayer, IconLayer } from '@deck.gl/layers';
import { StaticMap } from 'react-map-gl';
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic3AxbmFsY29yZCIsImEiOiJja2g3ZWFsaG4wM2Z6MnRuc2NjYXhtZHB5In0.S4-p_UNU2crlAlmNafjLow';


const LocationInfo = () => {
    const { id } = useParams()
    const classes = useStyles();

    const pointData2 = [
        { sourcePosition: [28.4089, 77.3178], targetPosition: [28.4089, 77.3178] }
    ];

    const [pointData, setPointData] = useState([]);
    const [dataReady, setDataReady] = useState(true);
    const [pointDataReady, setPointDataReady] = useState(false);
    const [dataChangeUpvote, setDataChangeUpvote] = useState(false);
    const [dataChangeDownvote, setDataChangeDownvote] = useState(false);

    const upvoteChange = () => {
        fetch(`http://localhost:8000/api/update/${id}/`, {
            method: "patch",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify({
                upvotes: pointData.upvotes + 1,
            })
        })
        setDataChangeUpvote(true)
        setDataChangeDownvote(false)
    }

    const downvoteChange = () => {
        fetch(`http://localhost:8000/api/update/${id}/`, {
            method: "patch",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify({
                upvotes: pointData.upvotes - 1,
            })
        })
        setDataChangeDownvote(true)
        setDataChangeUpvote(false)
    }

    useEffect(() => {
        fetch(`http://localhost:8000/api/update/${id}/`)
            .then(res => res.json())
            .then((repos) => {
                setPointData(repos)
                setPointDataReady(true)
            });

    }, [])

    console.log(pointData)



    const colors = {
        'RD': [95, 23, 219, 100],
        'SL': [17, 205, 216, 100],
        'PW': [234, 216, 191, 100],
        'SW': [195, 93, 71, 100],
        'GB': [223, 34, 230, 100],
        'OR': [29, 24, 31, 100]
    }

    useEffect(() => {
        fetch(`http://localhost:8000/api/update/${id}`)
            .then(res => res.json())
            .then((repos) => {
                setPointData(repos)
            })
            .catch(setDataReady(false));
    }, [dataChangeUpvote, dataChangeDownvote])

    const fullForm = {
        'RD': "Road",
        'SL': "Street Light",
        'PW': "Public Washroom",
        'SW': "Sewage",
        'GB': "Garbage",
        'OR': "Other"
    }

    let d = new Date(pointData.created_on);
    let date = d.getDate()
    let month = d.getMonth()
    let year = d.getFullYear()
    console.log(pointData)
    const initialViewState = {
        latitude: pointData.latitude,
        longitude: pointData.longitude,
        zoom: 14,
        pitch: 0,
        bearing: 0,
    };
    const location = useLocation();
    return (
        <div>
            <div className="center-button-container">
                <h1>Upvotes: {pointData.upvotes}</h1>
                <h1>Disrepair: {fullForm[pointData.variant]}</h1>
                <h1>Latitude: {pointData.latitude}</h1>
                <h1>Longitude: {pointData.longitude}</h1>
                <h1>Created on: {date}/{month + 1}/{year}</h1>
                <Button className="button-vote" variant="contained" color="primary" onClick={upvoteChange}>
                    +1
                </Button>
                <Button className="button-vote" variant="contained" color="primary" onClick={downvoteChange}>
                    -1
                </Button>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <h1>Link: <a>http://localhost:3000{location.pathname}</a></h1>
                <h1>Share the link and get people to upvote for your report.</h1>
            </div>
            <div className="map-location">
                <div>
                    <DeckGL
                        width="50%"
                        height="50%"
                        initialViewState={initialViewState}
                        controller={true}
                        layers={[
                            new ScatterplotLayer({
                                id: 'bart-stations',
                                data: [
                                    { name: 'Colma', passengers: 4214, coordinates: [-122.466233, 37.684638] },
                                    { name: 'Civic Center', passengers: 24798, coordinates: [-122.413756, 37.779528] },
                                ],
                                // data: pointData,
                                stroked: false,
                                filled: true,
                                getPosition: d => [pointData.longitude, pointData.latitude],
                                // getPosition: d => d.coordinates,
                                // getPositon: d=> [d.longitude, d.latitude],
                                // getPositon: d=> [pointData.latitude, pointData.longitude],*
                                getRadius: d => [pointData.radius * 100],
                                getFillColor: d => colors[pointData.variant],
                            })
                        ]}
                    >
                        <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
                    </DeckGL>
                </div>
                
            </div>
        </div>
    );
}

export default LocationInfo;