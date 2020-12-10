import { Box, Container, Typography } from "@material-ui/core";
import { Alert, AlertProps } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import PuzzleBoard from "../../../components/PuzzleBoard";
import { errorSound, moveSound } from "../../../constants";
import { formatTime, getSideToPlayFromFen } from "../../../utils/utils";
import RaceStanding from "./RaceStanding";
import Race from "../../../models/Race";

const RacePlay: React.FC<{
  race: Race;
}> = ({ race }) => {
  const racer = race.currentRacer;
  const puzzle = race.currentPuzzle;

  const [help, setHelp] = useState<
    "sideToPlay" | "incorrect" | "correct" | "solved"
  >();
  const sideToPlay = getSideToPlayFromFen(puzzle.startFen);

  useEffect(() => {
    setHelp("sideToPlay");
  }, [puzzle.startFen]);

  if (racer?.finishedAt) {
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
        {race.sortedRacerList.map((r) => (
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
              if (race.isLastPuzzle) {
                race.currentRacer?.finish();
              } else {
                race.currentRacer?.goToNext();
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
          {racer?.currentPuzzleIndex ?? 0}/{race.puzzleList.length}
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
          <Typography align="right">{race.formattedTimeLeft}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

const MyAlert: React.FC<AlertProps> = (props) => {
  return <Alert {...props} style={{ height: "min-content" }} />;
};

export default RacePlay;
