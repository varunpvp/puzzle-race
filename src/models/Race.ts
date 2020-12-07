import firebase from "firebase/app";
import { Database, getFirebaseServerTimestamp } from "../config/Firebase";
import IRace from "../entities/IRace";
import { formatTime, objectToList, sortRacerList } from "../utils/utils";
import Puzzle from "./Puzzle";
import Racer from "./Racer";
import { observable, action, computed } from "mobx";

export default class Race implements IRace {
  @observable id: string = "";
  @observable userId: string;
  @observable hostId: string = "";
  @observable name: string = "";
  @observable puzzleList: Puzzle[] = [];
  @observable state:
    | "waiting"
    | "starting"
    | "started"
    | "finished"
    | "aborted" = "waiting";
  @observable startedAt: any;
  @observable createdAt: any;
  @observable time: number = 0;
  @observable racerList: Racer[] = [];

  @observable timeLeft: number = 0;
  @observable loaded = false;

  ref: firebase.database.Reference = Database.ref("/");

  constructor(userId: string) {
    this.userId = userId;
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

  subscribe(id: string) {
    this.id = id;
    this.ref = Database.ref("race").child(id);

    this.ref.on("value", (snapshot) => {
      if (snapshot.exists()) {
        this.update({
          ...snapshot.val(),
          puzzleList: objectToList(snapshot.val().puzzleList),
          racerList: objectToList(snapshot.val().racers),
        });
        this.setLoaded(true);
      }
    });
    this.tickTimer();
  }

  unsubscribe() {
    if (this.ref) {
      this.ref.off();
    }
  }

  @computed
  get isFinished() {
    return (
      this.racerList.every((racer) => racer.finishedAt) ||
      this.state === "finished"
    );
  }

  @computed
  get currentRacer() {
    return this.racerList.find((it) => it.id === this.userId);
  }

  @computed
  get currentPuzzle() {
    return this.puzzleList[this.currentRacer?.currentPuzzleIndex ?? 0];
  }

  hasRacer(id: string) {
    return this.racerList.find((it) => it.id === id) !== null;
  }

  @computed
  get sortedRacerList() {
    return sortRacerList(this.racerList);
  }

  @computed
  get formattedTimeLeft() {
    return formatTime(this.timeLeft);
  }

  @computed
  get isLastPuzzle() {
    return this.puzzleList.length - 1 === this.currentRacer?.currentPuzzleIndex;
  }

  @action
  setLoaded(loaded: boolean) {
    this.loaded = loaded;
  }

  @action
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

  @action
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
