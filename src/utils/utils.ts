import _ from "lodash";

export function formatTime(millis: number) {
  const minutes = parseInt(`${millis / 60000}`);
  const seconds = parseInt(`${(millis % 60000) / 1000}`);

  return `${minutes}:${_.padStart(String(seconds), 2, "0")}`;
}
