import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import Race from "../../../models/Race";

import { formatTime } from "../../../utils/utils";

const RaceStanding: React.FC<{ race: Race }> = ({ race }) => {
  return (
    <List>
      {race.sortedRacerList.map((r, i) => {
        return (
          <ListItem>
            <ListItemAvatar>
              <Avatar>{i + 1}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={r.name}
              secondary={
                r.finishedAt
                  ? `Finished in ${formatTime(r.finishedAt - race.startedAt)}`
                  : `Solved ${r.currentPuzzleIndex} of ${race.puzzleList.length} puzzles`
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default RaceStanding;
