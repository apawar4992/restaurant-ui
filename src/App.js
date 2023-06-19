import './App.css';
import RestaurantMenuComponent from './Components/MenuComponent';
import { BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
// import MyErrorBoundary from './Components/MyErrorBoundary';
import LoginUser from './Components/LoginUser';
import { Route, Routes } from 'react-router-dom';
import Error from './Components/Error';
import Desserts from './Components/Desserts';
import Drinks from './Components/Drinks';
import Veg from './Components/Veg';
import NonVeg from './Components/NonVeg';
import AddMenu from './Components/AddMenu';
import UserProfile from './Components/UserProfile';
import RegisterUser from './Components/RegisterUser';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="tiles-container">
          <Routes>
            <Route path='/' element={<RestaurantMenuComponent />} />
            <Route path="/Veg" element={<Veg />} />
            <Route path="/Non-Veg" element={<NonVeg />} />
            <Route path="/Desserts" element={<Desserts />} />
            <Route path="/Drinks" element={<Drinks />} />
            <Route path="/AddMenu" element={<AddMenu />} />
            <Route path='/*' element={<Error />} />

            <Route path='/Login' element={<LoginUser />} />
            <Route path='/Register' element={<RegisterUser />} />
            <Route path='/Profile' element={<UserProfile />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
