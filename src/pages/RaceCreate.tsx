import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import firebase from "firebase/app";
import React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import shortid from "shortid";
import { Auth, Database } from "../config/Firebase";
import { puzzleList } from "../constants";
import Race from "../types/Race";
import _ from "lodash";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      marginTop: "10rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

const RaceCreate: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const { control, getValues } = useForm({
    defaultValues: { name: "", time: 120, puzzleCount: 5 },
  });

  const handleCreateRace = async () => {
    try {
      setLoading(true);
      const values = getValues();

      const raceId = shortid();
      const hostId = Auth.currentUser?.uid!;

      const race: Race = {
        hostId,
        name: values.name,
        puzzleList: _.sampleSize(puzzleList, values.puzzleCount),
        state: "waiting",
        startedAt: null,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        time: values.time,
        racers: {
          [hostId]: {
            name: values.name,
            currentPuzzleIndex: 0,
          },
        },
      };

      await Database.ref("race").child(raceId).set(race);
      history.push(`/${raceId}`);
    } finally {
      setLoading(false);
      setDetailsDialogOpen(false);
    }
  };

  return (
    <Container maxWidth="xs" className={classes.container}>
      <Typography variant="h5" align="center">
        Start a Race
      </Typography>
      <Box height={8} />
      <Typography variant="body1" align="center">
        Race your puzzle skills
      </Typography>
      <Box height={16} />
      <Controller
        name="name"
        control={control}
        as={<TextField variant="outlined" placeholder="Name" fullWidth />}
      />

      <Box height={8} />
      <Button
        color="primary"
        variant="contained"
        fullWidth
        onClick={() => setDetailsDialogOpen(true)}
      >
        Create Race
      </Button>
      <Dialog
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
      >
        <DialogTitle>Race Info</DialogTitle>
        <DialogContent>
          <Controller
            name="time"
            control={control}
            as={
              <TextField
                autoFocus
                margin="dense"
                label="Time in seconds"
                fullWidth
              />
            }
          />
          <Controller
            name="puzzleCount"
            control={control}
            as={
              <TextField margin="dense" label="Number of puzzles" fullWidth />
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateRace} color="primary" disabled={loading}>
            Start
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RaceCreate;
