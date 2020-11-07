import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import MiniDrawer from './components/navbar'
import Fields from './components/fields'
import Map from'./components/map'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  buttonSpace: {
    marginTop: '6%',
    width: '23.25ch',
    height: '5vh',
  },
}));

function App() {

  const classes = useStyles();

  return (
    <div className="App">
        <div className = "grid">
          <div className = "grid-item">
            <MiniDrawer />1
          </div>

          <div className = "grid-item">
            <h1 className = "Heading-Text">
              DISREPAIR.IO
            </h1>

            <div className = "home-text">
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget ti
            </div>

            <div className = "grid2">
              <div className = "grid2-item1">
                <div></div>
                <Fields />
                <div className = "button-align">
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={() => navigator.geolocation.getCurrentPosition(function(position) {
                      console.log(position.coords.latitude);
                      console.log(position.coords.longitude);
                    })}
                    className={classes.buttonSpace}>
                      <div className = "field-text">
                          Get Location
                      </div>
                  </Button>
                </div>
              </div>

              <div className = "grid2-item">
                <img src="https://cdn.discordapp.com/attachments/293282760351547392/774359241044525068/Capture_1.png" alt="alternatetext" /> 
              </div>
            </div>
          </div>
          {/* <div className = "grid-item-map">
            <Map></Map> */}

          <div className = "grid-item">
            
          </div>

          <div className = "grid-item">

          </div>

          <div className = "grid-item-footer">
            <div className = "footer-text">
              Developed by BAKAET
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
