import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom"

import Booking from "./pages/BookingPage/Booking"
import ScreeningRoom from "./pages/ScreeningRoomPage/ScreeningRoom"
import Summary from "./pages/SummaryPage/Summary"


class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Booking} />
        <Route exact path="/screening-room" component={ScreeningRoom} />
        <Route exact path="/summary" component={Summary} />
      </Switch>
    );
  }
}

export default App
