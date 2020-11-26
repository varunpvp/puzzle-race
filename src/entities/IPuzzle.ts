import { ShortMove } from "chess.js";

export default interface IPuzzle {
  id: string;
  name: string;
  startFen: string;
  solution: Array<ShortMove>;
}
