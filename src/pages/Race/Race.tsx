import { Box, CircularProgress } from "@material-ui/core";
import React from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import { Auth } from "../../config/Firebase";
import RaceType from "../../models/Race";
import RaceEnded from "./components/RaceEnded";
import RaceJoin from "./components/RaceJoin";
import RaceWaiting from "./components/RaceWaiting";
import RaceCountDown from "./components/RaceCoutDown";
import RacePlay from "./components/RacePlay";

interface Props extends RouteComponentProps<{ raceId: string }> {}

const Race: React.FC<Props> = () => {
  const userId = Auth.currentUser?.uid!;
  const params = useParams<{ raceId: string }>();

  const race = new RaceType(params.raceId, userId);

  if (race === null) {
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

  return (
    <RacePlay
      race={race}
      onFinish={() => {
        race.currentRacer?.finish();
      }}
      onSolve={() => {
        race.currentRacer?.goToNext();
      }}
    />
  );
};

export default Race;
