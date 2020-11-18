import React, { useState, useEffect } from "react";
import { ShortMove } from "chess.js";
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
  const [fen, setFen] = useState(chess.fen());
  const [orientation, setOrientation] = useState(chess.turn());
  const [solution, setSolution] = useState<ShortMove[]>(initialSolution);

  useEffect(() => {
    const newChess = new Chess(initialFen);
    setChess(newChess);
    setFen(newChess.fen());
    setOrientation(newChess.turn());
    setSolution(initialSolution);
  }, [initialFen, initialSolution]);

  const handleMove = async (move: ShortMove) => {
    if (solution.length === 0) {
      return onSolve();
    }

    const correctMove = solution[0];

    if (
      move.from !== correctMove.from ||
      move.to !== correctMove.to ||
      move.promotion !== correctMove.promotion
    ) {
      onIncorrectMove();
      return;
    }

    // correct move; proceed to respond
    if (chess.move(move)) {
      setFen(chess.fen());
      if (solution.length === 0) {
        onSolve();
      } else {
        onCorrectMove && onCorrectMove();
        setTimeout(() => {
          chess.move(solution[1]);
          setFen(chess.fen());
          if (solution.length === 2) {
            onSolve();
          } else {
            setSolution(solution.slice(2));
          }
        }, 1);
      }
    }
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
              position={fen}
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

export default PuzzleBoard;
