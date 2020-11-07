import './App.css';
import Home from './components/home'
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
        <Route exact path = "/about" component = {Home} />
        <Route exact path = "/map" component = {Home} />
      </div>
    </BrowserRouter>  
  );
}

export default App;
