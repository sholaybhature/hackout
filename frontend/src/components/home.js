import React, { useState, useEffect } from 'react'
import MiniDrawer from './navbar'
import Fields from './fields'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';
import Map from './map'

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
  const [dis, setDis] = React.useState('');
  const [name, setName] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [lat, setLat] = React.useState("");
  const [long, setLong] = React.useState("");
  const [imgurl, setImg] = React.useState('');

  return (
    <div className="App">
      <div className="grid-home">
        <div className="grid-item">
          <MiniDrawer />
        </div>

        <div className="grid-item">
          <h1 className="Heading-Text">DISREPAIR.IO</h1>

          <div className="home-text">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
            ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
            egestas semper. Aenean ultricies mi vitae est. Mauris placerat
            eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
            Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit
            amet, wisi. Aenean fermentum, elit eget ti
          </div>

          <div className="grid2">
            <div className="grid2-item1">
              <div></div>
              <Fields 
                setDis = {setDis}
                setName = {setName}
                setNumber = {setNumber}
              />
              <div className="button-align">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() =>
                    navigator.geolocation.getCurrentPosition(function (position) {
                      setLatitude(position.coords.latitude);
                      setLongitude(position.coords.longitude);
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
                  value = {imgurl}
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
          <Map latitude={latitude} longitude={longitude} changeLocation={changeLocation}></Map>
        </div>
        <div className="footer">
          A crowdsourced initiative.
          </div>
      </div>
    </div>
  )
}
