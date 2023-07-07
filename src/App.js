import './App.css';
import RestaurantMenuComponent from './Components/MenuComponent';
import { BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from 'react-router-dom';
import Error from './Components/Error';
import store from './Store/store';
import { Provider } from 'react-redux';
import React, { lazy, Suspense } from 'react';

// import AddMenu from './Components/AddMenu';
// import UserProfile from './Components/UserProfile';
// import RegisterUser from './Components/RegisterUser';
// import LoginUser from './Components/LoginUser';

const AddMenu = lazy(() => import('./Components/AddMenu'));
const UserProfile = lazy(() => import('./Components/UserProfile'));
const RegisterUser = lazy(() => import('./Components/RegisterUser'));
const LoginUser = lazy(() => import('./Components/LoginUser'));

const Veg = lazy(() => import("./Components/Veg"));
const NonVeg = lazy(() => import("./Components/NonVeg"));
const Drinks = lazy(() => import("./Components/Drinks"));
const Desserts = lazy(() => import("./Components/Desserts"));

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="tiles-container">
          <Provider store={store}>
            <Routes>
              <Route path='/' element={<RestaurantMenuComponent />} />
              <Route path='/*' element={<Error />} />

              {/* Veg NonVeg Desserts Drinks */}
              <Route path="/Veg" element={<Suspense fallback={<h4 style={{ padding: 50 }}>Loading...</h4>}>
                <Veg />
              </Suspense>} />
              <Route path="/Non-Veg" element={<Suspense fallback={<h4 style={{ padding: 50 }}>Loading...</h4>}>
                <NonVeg />
              </Suspense>} />
              <Route path="/Desserts" element={<Suspense fallback={<h4 style={{ padding: 50 }}>Loading...</h4>}>
                <Desserts />
              </Suspense>} />
              <Route path="/Drinks" element={<Suspense fallback={<h4 style={{ padding: 50 }}>Loading...</h4>}>
                <Drinks />
              </Suspense>} />

              <Route path="/AddMenu/:id" element={<Suspense fallback={<h4 style={{ padding: 50 }}>Loading...</h4>}>
                <AddMenu />
              </Suspense>} />
              <Route path='/Login' element={<Suspense fallback={<h4 style={{ padding: 50 }}>Loading...</h4>}>
                <LoginUser />
              </Suspense>} />
              <Route path='/Register' element={<Suspense fallback={<h4 style={{ padding: 50 }}>Loading...</h4>}>
                <RegisterUser />
              </Suspense>} />
              <Route path='/Profile' element={<Suspense fallback={<h4 style={{ padding: 50 }}>Loading...</h4>}>
                <UserProfile />
              </Suspense>} />
            </Routes>
          </Provider >
        </div >
      </div >
    </BrowserRouter >
  );
}

export default App;
