import firebase from "firebase/app";
import React, { useCallback, useEffect, useState } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import PuzzleBoard from "../components/PuzzleBoard";
import { Auth, Database } from "../config/Firebase";
import RaceType from "../types/Race";

interface Props extends RouteComponentProps<{ raceId: string }> {}

const Race: React.FC<Props> = () => {
  const [race, setRace] = useState<null | RaceType>(null);
  const params = useParams<{ raceId: string }>();
  const [raceRef] = useState(Database.ref("race").child(params.raceId));

  useEffect(() => {
    raceRef.on("value", (snapshot) => {
      setRace(snapshot.val());
    });

    return () => {
      raceRef.off();
    };
  }, [raceRef]);

  if (race === null) {
    return <div>loading...</div>;
  }

  if (race.state === "waiting") {
    return (
      <div>
        waiting for race to start{" "}
        <button
          onClick={() => {
            raceRef.child("state").set("starting");
          }}
        >
          Start
        </button>
      </div>
    );
  }

  if (race.state === "starting") {
    return (
      <CountDown
        onFinish={() => {
          raceRef.child("state").set("started");
        }}
      />
    );
  }

  if (race.state === "finished") {
    return <div>finished</div>;
  }

  const userId = Auth.currentUser?.uid!;
  const racer = race.racers[userId];
  const puzzle = race.puzzleList[racer.currentPuzzleIndex];

  if (racer.finishedAt) {
    return <div>You finished the race</div>;
  }

  return (
    <div>
      <PuzzleBoard
        fen={puzzle.startFen}
        solution={puzzle.solution}
        movable={true}
        onIncorrectMove={() => console.log("Incorrect move")}
        onSolve={() => {
          // TODO: notify solved

          if (race.puzzleList.length - 1 === racer.currentPuzzleIndex) {
            setTimeout(() => {
              raceRef
                .child("racers")
                .child(userId)
                .child("finishedAt")
                .set(firebase.database.ServerValue.TIMESTAMP);
            }, 1000);
          } else {
            setTimeout(() => {
              raceRef
                .child("racers")
                .child(userId)
                .child("currentPuzzleIndex")
                .set(firebase.database.ServerValue.increment(1));
            }, 500);
          }
        }}
        onCorrectMove={() => console.log("Correct Move")}
      />
    </div>
  );
};

const CountDown: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [count, setCount] = useState(3);

  const countDown = useCallback(() => {
    setCount((x) => {
      if (x > 1) {
        setTimeout(countDown, 1000);
        return x - 1;
      } else {
        onFinish();
        return x;
      }
    });
  }, [onFinish]);

  useEffect(() => {
    setTimeout(countDown, 1000);
  }, [countDown]);

  return <div>starting...{count}</div>;
};

export default Race;
