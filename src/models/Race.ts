import firebase from "firebase/app";
import { Database, getFirebaseServerTimestamp } from "../config/Firebase";
import IRace from "../entities/IRace";
import { formatTime, objectToList, sortRacerList } from "../utils/utils";
import Puzzle from "./Puzzle";
import Racer from "./Racer";

export default class Race implements IRace {
  id: string;
  userId: string;
  hostId: string = "";
  name: string = "";
  puzzleList: Puzzle[] = [];
  state: "waiting" | "starting" | "started" | "finished" | "aborted" =
    "waiting";
  startedAt: any;
  createdAt: any;
  time: number = 0;
  racerList: Racer[] = [];

  timeLeft: number = 0;

  ref: firebase.database.Reference;

  constructor(id: string, userId: string) {
    this.id = id;
    this.userId = userId;
    this.ref = Database.ref("race").child(id);
  }

  async joinRacer(userId: string, name: string) {
    await this.ref
      .child("racers")
      .child(userId)
      .set({ name, currentPuzzleIndex: 0 });
  }

  startCountDown() {
    this.ref.child("state").set("starting");
  }

  start() {
    this.ref.update({
      state: "started",
      startedAt: firebase.database.ServerValue.TIMESTAMP,
    });
  }

  finish() {
    this.ref.child("state").set("finished");
  }

  subscribe() {
    this.ref.on("value", (snapshot) => {
      if (snapshot.exists()) {
        this.update({
          ...snapshot.val(),
          puzzleList: objectToList(snapshot.val().puzzleList),
          racerList: objectToList(snapshot.val().racers),
        });
      }
    });
    this.tickTimer();
  }

  unsubscribe() {
    this.ref.off();
  }

  get isFinished() {
    return (
      this.racerList.every((racer) => racer.finishedAt) ||
      this.state === "finished"
    );
  }

  get currentRacer() {
    return this.racerList.find((it) => it.id === this.userId);
  }

  get currentPuzzle() {
    return this.puzzleList[this.currentRacer?.currentPuzzleIndex ?? 0];
  }

  hasRacer(id: string) {
    return this.racerList.find((it) => it.id === id) !== null;
  }

  get sortedRacerList() {
    return sortRacerList(this.racerList);
  }

  get formatedTimeLeft() {
    return formatTime(this.timeLeft);
  }

  private async tickTimer() {
    const serverTime = await getFirebaseServerTimestamp();

    const timePassed = serverTime - this.startedAt;
    const timeLeft = this.time * 1000 - timePassed;

    if (timeLeft > 0) {
      this.timeLeft = timeLeft;
      setTimeout(this.tickTimer, 1000);
    } else {
      this.timeLeft = 0;
      this.finish();
    }
  }

  private update({
    hostId,
    name,
    puzzleList,
    state,
    startedAt,
    createdAt,
    time,
    racerList,
  }: IRace) {
    this.hostId = hostId;
    this.name = name;
    this.puzzleList = puzzleList.map((it) => new Puzzle(it));
    this.state = state;
    this.startedAt = startedAt;
    this.createdAt = createdAt;
    this.time = time;
    this.racerList = racerList.map((it) => new Racer(this.id, it));
  }
}
