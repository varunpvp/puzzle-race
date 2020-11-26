import IPuzzle from "./IPuzzle";
import IRacer from "./IRacer";

export default interface IRace {
  hostId: string;
  name: string;
  puzzleList: IPuzzle[];
  state: "waiting" | "starting" | "started" | "finished" | "aborted";
  startedAt: any;
  createdAt: any;
  time: number;
  racerList: IRacer[];
}
