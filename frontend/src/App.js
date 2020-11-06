import logo from './logo.svg';
import './App.css';
import MiniDrawer from './components/navbar'
import Fields from './components/fields'

function App() {
  return (
    <div className="App">
        <div className = "grid">
          <div className = "grid-item">
            <MiniDrawer />
          </div>
          <div className = "grid-item">
            <h1 className = "Heading-Text">
            DISREPAIR.IO
            </h1>
            <Fields />
          </div>
          <div className = "grid-item">

          </div>
        </div>
        
    </div>
  );
}

export default App;
