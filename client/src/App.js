import React, { Component } from 'react'
// import {BASE_URL} from './index'
import {Switch,Route} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import Timeline from './components/Timeline'
import AddNewUser from './components/AddNewUser'
import Default from './components/Default'
import AllUsers from './components/AllUsers'
import ChangesHistory from './components/ChangesHistory'
import Navbar from './components/Navbar'



import './App.css';




export default class App extends Component {
  render() {

    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/add" component={AddNewUser} />
          <Route exact path="/" component={Timeline} />
          <Route exact path="/allusers" component={AllUsers} />
          <Route exact path="/changes" component={ChangesHistory} />
          <Route component={Default} />
        </Switch>
     </div>
    )
  }
}

