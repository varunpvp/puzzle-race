import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Race from "./pages/Race";
import RaceCreate from "./pages/RaceCreate";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={RaceCreate} />
        <Route path="/:raceId" exact component={Race} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
