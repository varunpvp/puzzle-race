import { Box, CircularProgress } from "@material-ui/core";
import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Auth } from "../../config/Firebase";
import RaceModel from "../../models/Race";
import RaceEnded from "./components/RaceEnded";
import RaceJoin from "./components/RaceJoin";
import RaceWaiting from "./components/RaceWaiting";
import RaceCountDown from "./components/RaceCoutDown";
import RacePlay from "./components/RacePlay";
import { observer } from "mobx-react";

interface Props extends RouteComponentProps<{ raceId: string }> {}

@observer
class Race extends Component<Props> {
  userId = Auth.currentUser?.uid!;
  race = new RaceModel(this.props.match.params.raceId, this.userId);

  componentDidMount() {
    this.race.subscribe();
  }

  render() {
    const race = this.race;
    const userId = this.userId;

    if (!race.loaded) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <CircularProgress />
        </Box>
      );
    }

    if (race.isFinished) {
      return <RaceEnded race={race} />;
    }

    if (!race.hasRacer(userId)) {
      return (
        <RaceJoin
          onJoin={async (name) => {
            await race.joinRacer(userId, name);
          }}
        />
      );
    }

    if (race.state === "waiting") {
      return (
        <RaceWaiting
          userId={userId}
          race={race}
          onStart={() => race.startCountDown()}
        />
      );
    }

    if (race.state === "starting") {
      return (
        <RaceCountDown
          onFinish={() => {
            race.start();
          }}
        />
      );
    }

    return <RacePlay race={race} />;
  }
}

export default withRouter(Race);
