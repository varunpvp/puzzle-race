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
import React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

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

const RaceCreate = () => {
  const classes = useStyles();
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const { control } = useForm({
    defaultValues: { name: "", time: 120, puzzleCount: 5 },
  });

  const handleStartRace = () => {
    setDetailsDialogOpen(false);
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
        as={<TextField variant="outlined" placeholder="Race name" fullWidth />}
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
          <Button onClick={handleStartRace} color="primary">
            Start
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RaceCreate;
