import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import firebase from "firebase/app";
import React, { useCallback, useEffect, useState } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import PuzzleBoard from "../components/PuzzleBoard";
import { Auth, Database } from "../config/Firebase";
import RaceType from "../types/Race";

interface Props extends RouteComponentProps<{ raceId: string }> {}

const Race: React.FC<Props> = () => {
  const userId = Auth.currentUser?.uid!;
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

  if (Object.values(race.racers).every((racer) => racer.finishedAt)) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        flexDirection="column"
      >
        <Container maxWidth="sm">
          <Typography variant="h5" align="center">
            Finished
          </Typography>

          <Typography variant="body1" align="center">
            The has ended
          </Typography>
        </Container>
      </Box>
    );
  }

  if (!Object.keys(race.racers).includes(userId)) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        flexDirection="column"
      >
        <Container maxWidth="xs">
          <Typography variant="h5" align="center">
            Join the race
          </Typography>

          <Typography variant="body1" align="center">
            Please enter your name to join race
          </Typography>
          <Box height={8} />
          <TextField variant="outlined" placeholder="Your name" fullWidth />
          <Box height={8} />
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={() => {
              raceRef
                .child("racers")
                .child(userId)
                .set({ name: "get the name", currentPuzzleIndex: 0 });
            }}
          >
            Join
          </Button>
        </Container>
      </Box>
    );
  }

  if (race.state === "waiting") {
    if (race.hostId === userId) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          flexDirection="column"
        >
          <Container maxWidth="sm">
            <Typography variant="h5" align="center">
              Waiting
            </Typography>

            <Typography variant="body1" align="center">
              for you to start the race
            </Typography>
            <Box height={8} />
            <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={() => {
                raceRef.child("state").set("starting");
              }}
            >
              Start
            </Button>
          </Container>
        </Box>
      );
    }

    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        flexDirection="column"
      >
        <Typography variant="h5" align="center">
          Waiting for race to start
        </Typography>
      </Box>
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

  const racer = race.racers[userId];
  const puzzle = race.puzzleList[racer.currentPuzzleIndex];

  if (racer.finishedAt) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        flexDirection="column"
      >
        <Container maxWidth="sm">
          <Typography variant="h5" align="center">
            Finished
          </Typography>

          <Typography variant="body1" align="center">
            You finished the race, wait other to finish.
          </Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      height="100%"
      maxWidth={768}
      margin="auto"
    >
      <Box height={60}>Puzzle Race</Box>
      <Box flex={1}>
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
      </Box>

      <Box padding={2}>
        <Grid container justify="space-between">
          <Grid>
            <Typography variant="h5">Puzzles</Typography>
          </Grid>
          <Grid>
            <Typography variant="h5">Time left</Typography>
          </Grid>
        </Grid>
        <Grid container justify="space-between">
          <Grid>
            {racer.currentPuzzleIndex}/{race.puzzleList.length}
          </Grid>
          <Grid>1:11</Grid>
        </Grid>
      </Box>
    </Box>
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

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      flexDirection="column"
    >
      <Typography variant="h5" align="center">
        Starting in {count}
      </Typography>
    </Box>
  );
};

export default Race;
