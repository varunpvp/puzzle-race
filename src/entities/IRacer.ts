export default interface IRacer {
  id: string;
  name: string;
  currentPuzzleIndex: number;
  finishedAt?: number;
}
