import './App.css';
import Home from './components/home'
import About from './components/about'
import MapPage from './components/mappage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <div className = "App">
        <Route exact path = "/" component = {Home} />
        <Route exact path = "/about" component = {About} />
        <Route exact path = "/map" component = {MapPage} />
      </div>
    </BrowserRouter>  
  );
}

export default App;
