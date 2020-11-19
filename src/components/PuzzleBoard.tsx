import React, { useState, useEffect } from "react";
import { ChessInstance, ShortMove } from "chess.js";
import ReactResizeDetector from "react-resize-detector";
import Chessboard from "chessboardjsx";
const Chess = require("chess.js");

interface Props {
  fen: string;
  solution: ShortMove[];
  onCorrectMove?: () => void;
  onIncorrectMove: () => void;
  onSolve: () => void;
  movable: boolean;
}

const PuzzleBoard: React.FC<Props> = ({
  onCorrectMove,
  onIncorrectMove,
  onSolve,
  fen: initialFen,
  solution: initialSolution,
  movable,
}) => {
  const [chess, setChess] = useState(new Chess(initialFen));
  const [orientation, setOrientation] = useState(chess.turn());
  const [solution, setSolution] = useState<ShortMove[]>(initialSolution);

  useEffect(() => {
    const newChess = new Chess(initialFen);
    setChess(newChess);
    setOrientation(newChess.turn());
    setSolution(initialSolution);
  }, [initialFen, initialSolution]);

  const handleMove = async (move: ShortMove) => {
    const result = makeMove(chess, move, solution);

    if (!result) {
      return onIncorrectMove();
    }

    setChess(result.chess);
    setSolution(result.solution);

    if (result.solution.length === 0) {
      return onSolve();
    } else {
      onCorrectMove && onCorrectMove();
    }

    // make computer's move

    setTimeout(() => {
      const computerResult = makeMove(
        result.chess,
        result.solution[0],
        result.solution
      );

      if (computerResult) {
        setChess(computerResult.chess);
        setSolution(computerResult.solution);

        if (computerResult.solution.length === 0) {
          return onSolve();
        }
      }
    }, 500);
  };

  return (
    <ReactResizeDetector handleHeight handleWidth>
      {({ width, height }: { width: number; height: number }) => {
        const size = Math.min(width, height) || 400;
        return (
          <div style={{ width: "100%", height: "100%" }}>
            <Chessboard
              boardStyle={{ background: "black" }}
              orientation={orientation}
              position={chess.fen()}
              width={size}
              draggable={movable && solution.length > 0}
              onDrop={({ sourceSquare, targetSquare }) =>
                handleMove({ from: sourceSquare, to: targetSquare })
              }
              transitionDuration={100}
            />
          </div>
        );
      }}
    </ReactResizeDetector>
  );
};

function makeMove(
  chess: ChessInstance,
  move: ShortMove,
  solution: ShortMove[]
): null | { solution: ShortMove[]; chess: ChessInstance } {
  if (solution.length === 0) {
    return null;
  }

  const correctMove = solution[0];

  if (
    move.from !== correctMove.from ||
    move.to !== correctMove.to ||
    move.promotion !== correctMove.promotion
  ) {
    return null;
  }

  if (!chess.move(move)) {
    return null;
  }

  return {
    chess: new Chess(chess.fen()),
    solution: solution.slice(1),
  };
}

export default PuzzleBoard;
