import { ShortMove } from "chess.js";

export default interface Puzzle {
  id: string;
  name: string;
  startFen: string;
  solution: Array<ShortMove>;
}
