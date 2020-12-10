import { Box, CircularProgress } from "@material-ui/core";
import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Auth } from "../../config/Firebase";
import RaceEnded from "./components/RaceEnded";
import RaceJoin from "./components/RaceJoin";
import RaceWaiting from "./components/RaceWaiting";
import RaceCountDown from "./components/RaceCoutDown";
import RacePlay from "./components/RacePlay";
import { inject, observer } from "mobx-react";
import RaceStore from "../../models/Race";

interface Props extends RouteComponentProps<{ raceId: string }> {
  race?: RaceStore;
}

@inject("race")
@observer
class Race extends Component<Props> {
  userId = Auth.currentUser?.uid!;

  componentDidMount() {
    this.props.race?.subscribe(this.props.match.params.raceId);
  }

  componentWillUnmount() {
    this.props.race?.unsubscribe();
  }

  render() {
    const race = this.props.race!;
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

    if (race.isFinished) {
      return <RaceEnded race={race} />;
    }

    return <RacePlay race={race} />;
  }
}

export default withRouter(Race);
