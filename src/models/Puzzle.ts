import { ShortMove } from "chess.js";
import IPuzzle from "../entities/IPuzzle";

export default class Puzzle implements IPuzzle {
  id: string;
  name: string;
  startFen: string;
  solution: ShortMove[];

  constructor({ id, name, solution, startFen }: IPuzzle) {
    this.id = id;
    this.name = name;
    this.startFen = startFen;
    this.solution = solution;
  }
}
