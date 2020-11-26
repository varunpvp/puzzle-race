import React, { useEffect } from "react";
import { Box, Container, Typography, Button } from "@material-ui/core";
import _ from "lodash";
import Race from "../../../types/Race";
import { useSnackbar } from "../../../App";
import ClipboardJS from "clipboard";

const RaceWaiting: React.FC<{
  userId: string;
  race: Race;
  onStart: () => void;
}> = ({ userId, race, onStart }) => {
  const snackbar = useSnackbar();

  useEffect(() => {
    const clipboard = new ClipboardJS(".copy-invite-link");

    clipboard.on("success", function () {
      snackbar.show("Copied!");
    });

    return () => {
      clipboard.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const joinStatus =
    _.size(race.racers) === 1
      ? "Waiting for players to join"
      : `${_.entries(race.racers)
          .filter(([id]) => id !== race.hostId)
          .map(([id, r]) => (id === userId ? "You" : r.name))
          .join(", ")} has joined`;

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
            {joinStatus}
          </Typography>
          <Box height={12} />
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={onStart}
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
      <Typography variant="body1" align="center">
        {joinStatus}
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
};

export default RaceWaiting;
