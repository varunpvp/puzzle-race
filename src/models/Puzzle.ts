import { ShortMove } from "chess.js";
import IPuzzle from "../entities/IPuzzle";
import { observable } from "mobx";

export default class Puzzle implements IPuzzle {
  @observable id: string;
  @observable name: string;
  @observable startFen: string;
  @observable solution: ShortMove[];

  constructor({ id, name, solution, startFen }: IPuzzle) {
    this.id = id;
    this.name = name;
    this.startFen = startFen;
    this.solution = solution;
  }
}
