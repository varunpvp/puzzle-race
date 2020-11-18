import React, { useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { START_FEN } from "../constants";
import Puzzle from "../types/Puzzle";
import PuzzleBoard from "../components/PuzzleBoard";

interface Props extends RouteComponentProps<{ raceId: string }> {}

const puzzleList: Puzzle[] = [
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

const Race: React.FC<Props> = () => {
  const [puzzles, setPuzzles] = useState(puzzleList);

  return (
    <div>
      <PuzzleBoard
        fen={puzzles[0].startFen}
        solution={puzzles[0].solution}
        movable={true}
        onIncorrectMove={() => console.log("Incorrect move")}
        onSolve={() => {
          // TODO: notify solved

          setTimeout(() => {
            if (puzzles.length === 1) {
              // TODO: notify complete
            } else {
              setPuzzles(puzzles.slice(1));
            }
          }, 2000);
        }}
        onCorrectMove={() => console.log("Correct Move")}
      />
    </div>
  );
};

export default withRouter(Race);
