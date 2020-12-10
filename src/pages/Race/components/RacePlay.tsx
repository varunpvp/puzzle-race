import { Box, Container, Typography } from "@material-ui/core";
import { Alert, AlertProps } from "@material-ui/lab";
import _ from "lodash";
import React, { useState, useCallback, useEffect } from "react";
import PuzzleBoard from "../../../components/PuzzleBoard";
import { getFirebaseServerTimestamp } from "../../../config/Firebase";
import { errorSound, moveSound } from "../../../constants";
import Race from "../../../types/Race";
import {
  formatTime,
  getSideToPlayFromFen,
  sortRacers,
} from "../../../utils/utils";
import RaceStanding from "./RaceStanding";

const RacePlay: React.FC<{
  race: Race;
  userId: string;
  onSolve: () => void;
  onFinish: () => void;
  onTimeout: () => void;
}> = ({ race, userId, onSolve, onFinish, onTimeout }) => {
  const racer = race.racers[userId];
  const puzzle = race.puzzleList[racer.currentPuzzleIndex];
  const [time, setTime] = useState("0:00");

  const [help, setHelp] = useState<
    "sideToPlay" | "incorrect" | "correct" | "solved"
  >();
  const sideToPlay = getSideToPlayFromFen(puzzle.startFen);

  useEffect(() => {
    setHelp("sideToPlay");
  }, [puzzle.startFen]);

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

          <RaceStanding race={race} />
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
            setHelp("incorrect");
            setTimeout(() => setHelp("sideToPlay"), 1000);
          }}
          onSolve={() => {
            // snackbar.show("Solved!");
            setHelp("solved");
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
            setHelp("correct");
          }}
        />
      </Box>

      <Box padding={2} display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h5">Puzzles</Typography>
          {racer.currentPuzzleIndex}/{race.puzzleList.length}
        </Box>

        {help === "sideToPlay" && (
          <MyAlert variant="filled" severity="info">
            {sideToPlay === "w" ? "White" : "Black"} to move
          </MyAlert>
        )}

        {help === "correct" && (
          <MyAlert variant="filled" severity="success">
            Correct!
          </MyAlert>
        )}

        {help === "solved" && (
          <MyAlert variant="filled" severity="success">
            Solved!
          </MyAlert>
        )}

        {help === "incorrect" && (
          <MyAlert variant="filled" severity="error">
            Incorrect
          </MyAlert>
        )}

        <Box>
          <Typography variant="h5">Time left</Typography>
          <Typography align="right">{time}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

const MyAlert: React.FC<AlertProps> = (props) => {
  return <Alert {...props} style={{ height: "min-content" }} />;
};

export default RacePlay;
