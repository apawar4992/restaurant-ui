import './App.css';
import RestaurantMenuComponent from '../src/Components/menu-component';
import { BrowserRouter } from 'react-router-dom';
import logo from './Images/IndianSpice.png';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <img className="app-logo" src={logo} />
        <RestaurantMenuComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
