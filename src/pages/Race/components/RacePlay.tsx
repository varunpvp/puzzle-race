import { Box, Container, Typography, Grid } from "@material-ui/core";
import React from "react";
import { useSnackbar } from "../../../App";
import PuzzleBoard from "../../../components/PuzzleBoard";
import { errorSound, moveSound } from "../../../constants";
import Race from "../../../models/Race";
import { formatTime } from "../../../utils/utils";
import RaceStanding from "./RaceStanding";

const RacePlay: React.FC<{
  race: Race;
  onSolve: () => void;
  onFinish: () => void;
}> = ({ race, onSolve, onFinish }) => {
  const racer = race.currentRacer!;
  const puzzle = race.currentPuzzle;
  const snackbar = useSnackbar();

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
          <Grid>{race.formatedTimeLeft}</Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RacePlay;
