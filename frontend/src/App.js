import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import {SignIn} from './contents/SIgnIn';
import { LogIn } from './contents/logIn';


export default function App() {  
    return (
      <Router>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/register" component={LogIn} />
      </Router>
    )
}
