import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import firebase from "firebase/app";
import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import PuzzleBoard from "../components/PuzzleBoard";
import { Auth, Database, getFirebaseServerTimestamp } from "../config/Firebase";
import { errorSound, moveSound } from "../constants";
import RaceType from "../types/Race";
import Racer from "../types/Racer";
import { formatTime } from "../utils/utils";
import ClipboardJS from "clipboard";
import { useSnackbar } from "../App";

interface Props extends RouteComponentProps<{ raceId: string }> {}

const Race: React.FC<Props> = () => {
  const userId = Auth.currentUser?.uid!;
  const params = useParams<{ raceId: string }>();
  const [race, setRace] = useState<null | RaceType>(null);
  const [raceRef] = useState(Database.ref("race").child(params.raceId));
  const snackbar = useSnackbar();

  useEffect(() => {
    const clipboard = new ClipboardJS(".copy-invite-link");

    clipboard.on("success", function () {
      snackbar.show("Copied!");
    });

    raceRef.on("value", (snapshot) => {
      setRace(snapshot.val());
    });

    return () => {
      clipboard.destroy();
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
            The race has ended
          </Typography>

          <List>
            {sortRacers(Object.values(race.racers)).map((r, i) => {
              return (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>{i + 1}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={r.name}
                    secondary={
                      r.finishedAt
                        ? `Finished in ${formatTime(
                            r.finishedAt - race.startedAt
                          )}`
                        : `Solved ${r.currentPuzzleIndex} of ${race.puzzleList.length} puzzles`
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </Container>
      </Box>
    );
  }

  if (!Object.keys(race.racers).includes(userId)) {
    return (
      <JoinRace
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
            <Box height={12} />
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
            <Box height={8} />
            <Button
              className="copy-invite-link"
              fullWidth
              variant="outlined"
              data-clipboard-text={window.location.href}
            >
              Copy Invite Link
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
        <Box height={12} />
        <Button
          className="copy-invite-link"
          variant="outlined"
          data-clipboard-text={window.location.href}
        >
          Copy Invite Link
        </Button>
      </Box>
    );
  }

  if (race.state === "starting") {
    return (
      <CountDown
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
    <PlayRace
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

const JoinRace: React.FC<{ onJoin: (name: string) => Promise<void> }> = ({
  onJoin,
}) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

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
        <TextField
          variant="outlined"
          placeholder="Your name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Box height={8} />
        <Button
          color="primary"
          variant="contained"
          fullWidth
          disabled={loading}
          onClick={async () => {
            try {
              setLoading(true);
              await onJoin(name);
            } finally {
              setLoading(false);
            }
          }}
        >
          Join
        </Button>
      </Container>
    </Box>
  );
};

const PlayRace: React.FC<{
  race: RaceType;
  userId: string;
  onSolve: () => void;
  onFinish: () => void;
  onTimeout: () => void;
}> = ({ race, userId, onSolve, onFinish, onTimeout }) => {
  const racer = race.racers[userId];
  const puzzle = race.puzzleList[racer.currentPuzzleIndex];
  const [time, setTime] = useState("0:00");
  const snackbar = useSnackbar();

  const tickTimer = useCallback(async () => {
    if (!race) {
      return;
    }

    const serverTime = await getFirebaseServerTimestamp();

    const timePassed = serverTime - race.startedAt;
    const timeLeft = race.time * 1000 - timePassed;

    if (timeLeft > 0) {
      setTime(formatTime(timeLeft));
      setTimeout(tickTimer, 1000);
    } else {
      onTimeout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setupTimer = useCallback(() => {
    setTimeout(tickTimer, 1000);
  }, [tickTimer]);

  useEffect(() => {
    setupTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            You finished the race, wait for others to finish.
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
      <Box height={60} paddingTop={1} display="flex">
        {sortRacers(_.values(race.racers)).map((r) => (
          <Box
            key={r.name}
            boxShadow="0px 0px 5px 0px #cccccc"
            borderRadius={5}
            padding={1}
            marginX={1}
            width={120}
          >
            <Box>
              <Typography variant="body1">{r.name}</Typography>
            </Box>
            <Box>
              {r.finishedAt ? (
                <Typography variant="body2">
                  Finished in {formatTime(r.finishedAt - race.startedAt)}
                </Typography>
              ) : (
                <Typography variant="body2">
                  {r.currentPuzzleIndex}/{race.puzzleList.length} puzzle
                </Typography>
              )}
            </Box>
          </Box>
        ))}
      </Box>
      <Box flex={1}>
        <PuzzleBoard
          fen={puzzle.startFen}
          solution={puzzle.solution}
          movable={true}
          onIncorrectMove={() => {
            errorSound.play();
          }}
          onSolve={() => {
            snackbar.show("Solved!");
            moveSound.play();

            setTimeout(() => {
              if (race.puzzleList.length - 1 === racer.currentPuzzleIndex) {
                onFinish();
              } else {
                onSolve();
              }
            }, 500);
          }}
          onCorrectMove={() => {
            moveSound.play();
          }}
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
          <Grid>{time}</Grid>
        </Grid>
      </Box>
    </Box>
  );
};

function sortRacers(racers: Omit<Racer, "id">[]) {
  return _.orderBy(racers, "currentPuzzleIndex", "desc");
}

export default Race;
