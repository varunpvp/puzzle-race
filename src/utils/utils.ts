import _ from "lodash";
import Racer from "../types/Racer";

export function formatTime(millis: number) {
  const minutes = parseInt(`${millis / 60000}`);
  const seconds = parseInt(`${(millis % 60000) / 1000}`);

  return `${minutes}:${_.padStart(String(seconds), 2, "0")}`;
}

export function sortRacerList(racerList: Racer[]) {
  return _.orderBy(
    racerList,
    ["currentPuzzleIndex", "finishedAt"],
    ["desc", "asc"]
  );
}

export function objectToList<T>(obj: any, keyPropName = "id"): T[] {
  return _.entries(obj).map(([key, value]: [string, any]) => ({
    [keyPropName]: key,
    ...value,
  }));
}

export function getSideToPlayFromFen(fen: string) {
  return fen.split(" ")[1];
}
