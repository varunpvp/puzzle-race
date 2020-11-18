import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Race from "./pages/Race";
import RaceStart from "./pages/RaceStart";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={RaceStart} />
        <Route path="/:raceId" exact component={Race} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
