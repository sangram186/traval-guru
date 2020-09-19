import React, { createContext, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './component/Home/Home';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Booking from './component/Booking/Booking';
import Login from './component/Login/Login';
import Hotel from './component/Hotel/Hotel';
import SignUp from './component/SignUp/SignUp';
import Header from './component/Header/Header';
export const useContent = createContext();

function App() {
  // state for custom login system
  const [user, setUser] = useState({
    isLoggedIn: false,
    email: '',
    name: '',
    photo: '',
    error: '',
    passwordResetMessage: '',
})

  const [content, setContent] = useState([]);
  return (
    <div className='App'>
      <useContent.Provider value={[content, setContent], [user, setUser]}>
        <Router>
          <Header></Header>
          <Switch>
            <Route path='/booking'>
              <Booking></Booking>
            </Route>
            <Route path='/login'>
              <Login></Login>
            </Route>
            <Route path='/signup'>
              <SignUp></SignUp>
            </Route>
            <Route path='/home'>
              <Home></Home>
            </Route>
            <PrivateRoute path='/hotel'>
              <Hotel></Hotel>
            </PrivateRoute>
            <Route exact path='/'>
              <Home></Home>
            </Route>
            
          </Switch>
        </Router>
      </useContent.Provider>
    </div>
  );
}

export default App;
