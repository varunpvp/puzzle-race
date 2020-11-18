import Puzzle from "./types/Puzzle";

export const START_FEN =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const puzzleList: Puzzle[] = [
  {
    id: "",
    name: "",
    startFen: START_FEN,
    solution: [
      { from: "e2", to: "e4" },
      { from: "e7", to: "e5" },
    ],
  },
  {
    id: "",
    name: "",
    startFen: START_FEN,
    solution: [
      { from: "e2", to: "e4" },
      { from: "d7", to: "d5" },
    ],
  },
  {
    id: "",
    name: "",
    startFen: START_FEN,
    solution: [
      { from: "d2", to: "d4" },
      { from: "d7", to: "d5" },
    ],
  },
  {
    id: "",
    name: "",
    startFen: START_FEN,
    solution: [
      { from: "d2", to: "d4" },
      { from: "e7", to: "e5" },
    ],
  },
];
