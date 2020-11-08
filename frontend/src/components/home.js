import React, { useState, useEffect } from 'react'
import MiniDrawer from './navbar'
import Fields from './fields'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';
import Map from './map'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  buttonSpace: {
    marginTop: "6%",
    width: "23.25ch",
    height: "5vh",
  },
  buttonSpace2: {
    marginTop: "16%",
    marginLeft: "12%",
    width: "23.25ch",
    height: "5vh",
  },
}));

export default function Home() {
  //   const [latitude, setLatitude] = useState(20.5937)
  //   const [longitude, setLongitude] = useState(78.9629)
  //   const [changeLocation, setChangeLocation] = useState(false)

  //   const classes = useStyles();

  //   return (
  //     <div className="App">
  //       <div className="grid-home">
  //         <div className="grid-item">
  //           <MiniDrawer />
  //         </div>

  //         <div className="grid-item">
  //           <h1 className="Heading-Text">
  //             DISREPAIR.IO
  //             </h1>

  //           <div className="home-text">
  //             Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget ti
  //             </div>

  //           <div className="grid2">
  //             <div className="grid2-item1">
  //               <div></div>
  //               <Fields />
  //               <div className="button-align">
  //                 <Button
  //                   variant="outlined"
  //                   color="primary"
  //                   onClick={() => navigator.geolocation.getCurrentPosition(function (position) {
  //                     // console.log(position.coords.latitude);
  //                     setLatitude(position.coords.latitude)
  //                     setLongitude(position.coords.longitude)
  //                     setChangeLocation(true)
  //                     // console.log(position.coords.longitude);
  //                   })}
  //                   className={classes.buttonSpace}>
  //                   <div className="field-text">
  //                     Get Location
  //                       </div>
  //                 </Button>

  const classes = useStyles();
  const [latitude, setLatitude] = useState(20.5937)
  const [longitude, setLongitude] = useState(78.9629)
  const [changeLocation, setChangeLocation] = useState(false)
  const [dis, setDis] = React.useState('RD');
  const [name, setName] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [lat, setLat] = React.useState(0);
  const [long, setLong] = React.useState(0);
  const [imgurl, setImg] = React.useState('');
  const [resData, setResData] = React.useState();
  const [showPopUp, setShowPopUp] = React.useState(false);

  let history = useHistory();

  const onChangeValueHandlerLat = (val) => {
    setLat(val)
  }
  const onChangeValueHandlerLong = (val) => {
    setLong(val)
  }

  const formSubmit = () => {
    console.log(lat, long, name, dis)
    fetch("http://localhost:8000/api/post/", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        name: name,
        latitude: long,
        longitude: lat,
        variant: dis
      })
    })
    .then(res => res.json()).then((repos) => {
      setResData(repos)
      setShowPopUp(true)
      history.push(`/${repos.id}`);
    });
  }

  console.log(resData)
  return (
    <div className="App">
      <div className="grid-home">
        <div className="grid-item">
          <MiniDrawer />
        </div>

        <div className="grid-item">
          <h1 className="Heading-Text">DISREPAIR.IO</h1>

          <div className="home-text">
          Disrepair.IO is a public infrastructure repository with the aim
          to collate public complaints of disrepairs hoping that a
          collective voice brings about ground reality changes.
          <br></br>
          <br></br>
          Fill in the following details then
          click on the map to mark the location and submit to report any disrepair.
          </div>

          <div className="grid2">
            <div className="grid2-item1">
              <div></div>
              <Fields
                setDis={setDis}
                setName={setName}
                setNumber={setNumber}
              />
              <div className="button-align">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() =>
                    navigator.geolocation.getCurrentPosition(function (position) {
                      setLatitude(position.coords.latitude);
                      setLat(position.coords.latitude);
                      setLongitude(position.coords.longitude);
                      setLong(position.coords.longitude);
                      setChangeLocation(true)
                      // console.log(position.coords.latitude);
                      // console.log(position.coords.longitude);
                    })
                  }
                  className={classes.buttonSpace}
                >
                  <div className="field-text">Get Location</div>
                </Button>

                <input
                  accept="image/*"
                  className={classes.input}
                  style={{ display: "none" }}
                  id="raised-button-file"
                  multiple
                  type="file"
                  value={imgurl}
                  onChange={e => setImg(e.target.value)}
                />
                <label htmlFor="raised-button-file">
                  <Button
                    variant="outlined"
                    color="primary"
                    component="span"
                    className={classes.buttonSpace2}
                  >
                    <div className="field-text">Upload Image</div>
                  </Button>
                </label>

                {/* <div>
                  {name} {dis} {number} {lat} {long} {imgurl}
                </div> */}

              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttonSpace}
                  disableElevation
                  onClick={formSubmit}
                >
                  <div className="field-text">
                    SUBMIT
                    </div>
                </Button>
              </div>
            </div>

            <div className="grid2-item">
              <img
                src="https://cdn.discordapp.com/attachments/293282760351547392/774359241044525068/Capture_1.png"
                alt="alternatetext"
              />
            </div>
          </div>
        </div>

        {/* <div className = "grid-item">
            
          </div>

          <div className = "grid-item">

          </div> */}
        <div className="grid-item-map">
          <Map lat={lat} long={long} onChangeValueHandlerLat={onChangeValueHandlerLat} onChangeValueHandlerLong={onChangeValueHandlerLong}
            latitude={latitude} longitude={longitude} changeLocation={changeLocation} dis={dis}></Map>
        </div>
        <div className="footer">
          A crowdsourced initiative.
          </div>
      </div>
    </div>
  )
}
