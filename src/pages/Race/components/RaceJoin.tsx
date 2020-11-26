import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";

const RaceJoin: React.FC<{ onJoin: (name: string) => Promise<void> }> = ({
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

export default RaceJoin;
