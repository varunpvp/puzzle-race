import { Box, CircularProgress } from "@material-ui/core";
import firebase from "firebase/app";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import { Auth, Database } from "../../config/Firebase";
import RaceType from "../../types/Race";
import RaceEnded from "./components/RaceEnded";
import RaceJoin from "./components/RaceJoin";
import RaceWaiting from "./components/RaceWaiting";
import RaceCountDown from "./components/RaceCoutDown";
import RacePlay from "./components/RacePlay";

interface Props extends RouteComponentProps<{ raceId: string }> {}

const Race: React.FC<Props> = () => {
  const userId = Auth.currentUser?.uid!;
  const params = useParams<{ raceId: string }>();
  const [race, setRace] = useState<null | RaceType>(null);
  const [raceRef] = useState(Database.ref("race").child(params.raceId));

  useEffect(() => {
    raceRef.on("value", (snapshot) => {
      setRace(snapshot.val());
    });

    return () => {
      raceRef.off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  if (
    Object.values(race.racers).every((racer) => racer.finishedAt) ||
    race.state === "finished"
  ) {
    return <RaceEnded race={race} />;
  }

  if (!Object.keys(race.racers).includes(userId)) {
    return (
      <RaceJoin
        onJoin={async (name) => {
          await raceRef
            .child("racers")
            .child(userId)
            .set({ name, currentPuzzleIndex: 0 });
        }}
      />
    );
  }

  if (race.state === "waiting") {
    return (
      <RaceWaiting
        userId={userId}
        race={race}
        onStart={() => raceRef.child("state").set("starting")}
      />
    );
  }

  if (race.state === "starting") {
    return (
      <RaceCountDown
        onFinish={() => {
          raceRef.update({
            state: "started",
            startedAt: firebase.database.ServerValue.TIMESTAMP,
          });
        }}
      />
    );
  }

  return (
    <RacePlay
      race={race}
      userId={userId}
      onFinish={() => {
        raceRef
          .child("racers")
          .child(userId)
          .child("finishedAt")
          .set(firebase.database.ServerValue.TIMESTAMP);
      }}
      onSolve={() => {
        raceRef
          .child("racers")
          .child(userId)
          .child("currentPuzzleIndex")
          .set(firebase.database.ServerValue.increment(1));
      }}
      onTimeout={() => {
        raceRef.child("state").set("finished");
      }}
    />
  );
};

export default Race;
