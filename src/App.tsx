import React from "react";
import {
  Box,
  Button,
  Container,
  createStyles,
  makeStyles,
  TextField,
} from "@material-ui/core";

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

function App() {
  const classes = useStyles();
  return (
    <Container maxWidth="xs" className={classes.container}>
      <TextField variant="outlined" placeholder="Race name" fullWidth />
      <Box height={8} />
      <Button color="primary" variant="contained" fullWidth>
        Create Race
      </Button>
    </Container>
  );
}

export default App;
