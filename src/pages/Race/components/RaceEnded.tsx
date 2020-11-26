import React from "react";
import { Box, Container, Typography } from "@material-ui/core";
import RaceStanding from "./RaceStanding";
import Race from "../../../models/Race";

const RaceEnded: React.FC<{ race: Race }> = ({ race }) => {
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

        <RaceStanding race={race} />
      </Container>
    </Box>
  );
};

export default RaceEnded;
