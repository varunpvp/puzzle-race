import Puzzle from "./Puzzle";
import Racer from "./Racer";

export default interface Race {
  hostId: string;
  name: string;
  puzzleList: Puzzle[];
  state: "waiting" | "starting" | "started" | "finished" | "aborted";
  puzzleCount: string;
  startedAt: number;
  time: number;
  racers: {
    [id: string]: Omit<Racer, "id">;
  };
}
