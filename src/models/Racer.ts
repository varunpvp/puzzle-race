import firebase from "firebase/app";
import { Database } from "../config/Firebase";
import IRacer from "../entities/IRacer";
import { observable } from "mobx";

export default class Racer implements IRacer {
  @observable id: string;
  @observable name: string;
  @observable currentPuzzleIndex: number;
  @observable finishedAt?: number;

  ref: firebase.database.Reference;

  constructor(
    raceId: string,
    { id, name, currentPuzzleIndex, finishedAt }: IRacer
  ) {
    this.id = id;
    this.name = name;
    this.currentPuzzleIndex = currentPuzzleIndex;
    this.finishedAt = finishedAt;

    this.ref = Database.ref("race").child(raceId).child("racers").child(id);
  }

  finish() {
    this.ref.child("finishedAt").set(firebase.database.ServerValue.TIMESTAMP);
  }

  goToNext() {
    this.ref
      .child("currentPuzzleIndex")
      .set(firebase.database.ServerValue.increment(1));
  }
}
