import _ from "lodash";
import Racer from "../types/Racer";

export function formatTime(millis: number) {
  const minutes = parseInt(`${millis / 60000}`);
  const seconds = parseInt(`${(millis % 60000) / 1000}`);

  return `${minutes}:${_.padStart(String(seconds), 2, "0")}`;
}

export function sortRacers(racers: Omit<Racer, "id">[]) {
  return _.orderBy(
    racers,
    ["currentPuzzleIndex", "finishedAt"],
    ["desc", "asc"]
  );
}

export function getSideToPlayFromFen(fen: string) {
  return fen.split(" ")[1];
}
