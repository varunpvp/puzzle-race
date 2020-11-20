import Puzzle from "./types/Puzzle";
import { Howl } from "howler";

export const moveSound = new Howl({
  src: ["/move.mp3"],
});

export const errorSound = new Howl({
  src: ["/error.mp3"],
});

export const START_FEN =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const puzzleList: Puzzle[] = [
  {
    id: "",
    name: "",
    startFen: "5r1k/p2q2bp/1p6/2p5/8/1P1Pr1P1/P3P2P/B4RK1 w - - 0 1",
    solution: [{ from: "f1", to: "f8" }],
  },
  {
    id: "",
    name: "",
    startFen: "r1b1q1kr/ppNnb1pp/5n2/8/3P4/8/PPP2PPP/R1BQKB1R b KQ - 0 1",
    solution: [{ from: "e7", to: "b4" }],
  },
  {
    id: "",
    name: "",
    startFen: "1R2B1k1/6p1/7p/8/1p6/q1p5/P7/1K6 w - - 0 1",
    solution: [{ from: "e8", to: "g6" }],
  },
  {
    id: "",
    name: "",
    startFen: "2r3k1/5pp1/2p5/2P5/3bqQ2/6P1/PP2B2P/R1B2K2 b - - 0 1",
    solution: [{ from: "e4", to: "h1" }],
  },
  {
    id: "",
    name: "",
    startFen: "r1bqk2r/bppN1ppp/8/PB6/8/B7/2PPnnPP/RN2K2R w KQkq - 0 1",
    solution: [{ from: "d7", to: "f6" }],
  },
  {
    id: "",
    name: "",
    startFen: "8/8/8/knN5/1n6/8/3N4/4K3 w - - 0 1",
    solution: [{ from: "d2", to: "c4" }],
  },
  {
    id: "",
    name: "",
    startFen: "K6R/B1kr4/1p6/1P1pp3/8/8/6p1/7b w - - 0 1",
    solution: [{ from: "a7", to: "b8" }],
  },
  {
    id: "",
    name: "",
    startFen: "1r6/3N4/4pp2/8/4K1k1/3PP3/2b5/5R2 b - - 0 1",
    solution: [{ from: "b8", to: "b4" }],
  },
  {
    id: "",
    name: "",
    startFen: "r3r3/2qn2b1/b2p3p/1npPk3/1p6/4B1NP/1P3RP1/1B2R1K1 w - - 0 1",
    solution: [{ from: "f2", to: "f5" }],
  },
  {
    id: "",
    name: "",
    startFen: "8/7k/6p1/3pPp2/5K1P/P4PQ1/6q1/8 b - - 0 1",
    solution: [{ from: "g2", to: "d2" }],
  },
  {
    id: "",
    name: "",
    startFen: "2r4k/7q/2b2P1R/p7/3B3p/1P4N1/1PP3rP/5K2 w - - 0 1",
    solution: [{ from: "f6", to: "f7" }],
  },
  {
    id: "",
    name: "",
    startFen: "6r1/4p2k/2p1PpnB/1b5R/8/6P1/5PKP/r7 w - - 0 1",
    solution: [{ from: "h6", to: "f8" }],
  },
  {
    id: "",
    name: "",
    startFen: "4k1r1/2r2p2/2N1p3/4R3/ppq2P2/8/PPP3PP/2KR4 w - - 0 1",
    solution: [{ from: "d1", to: "d8" }],
  },
  {
    id: "",
    name: "",
    startFen: "r2r3R/5pk1/p5p1/1p1N1b2/7R/2P2P2/PP6/3K4 w - - 0 1",
    solution: [{ from: "h4", to: "h7" }],
  },
  {
    id: "",
    name: "",
    startFen: "2k5/pp6/2p1bp2/8/QP3B2/5nP1/2r4P/3R1K2 b - - 0 1",
    solution: [{ from: "e6", to: "h3" }],
  },
  {
    id: "",
    name: "",
    startFen: "6k1/p4pp1/2Q2b1p/8/1P6/q2B3P/2K3P1/3R4 b - - 0 1",
    solution: [{ from: "a3", to: "b2" }],
  },
  {
    id: "",
    name: "",
    startFen: "rn3bnr/ppp2kpp/5p2/1B1p1b2/1q6/5N2/PPPP1PPP/RNBQR1K1 w - - 0 1",
    solution: [{ from: "b5", to: "e8" }],
  },
  {
    id: "",
    name: "",
    startFen: "r5k1/pQ3ppp/4r3/2B5/8/P7/1PP1nPPK/3R1R2 b - - 0 1",
    solution: [{ from: "e6", to: "h6" }],
  },
  {
    id: "",
    name: "",
    startFen: "2k5/2p5/1p6/p1p1n3/P1P4B/1R4Pp/2Q1RK2/7q b - - 0 1",
    solution: [{ from: "e5", to: "g4" }],
  },
  {
    id: "",
    name: "",
    startFen: "5rr1/7k/5Pp1/3R4/8/3B2P1/6K1/8 w - - 0 1",
    solution: [{ from: "d5", to: "h5" }],
  },
  {
    id: "",
    name: "",
    startFen: "5bk1/1p5p/p5p1/8/5P2/P1B2rP1/1PP5/1K3B2 w - - 0 1",
    solution: [{ from: "f1", to: "c4" }],
  },
  {
    id: "",
    name: "",
    startFen: "6k1/1p5p/3p1rp1/P2Pb3/1PB4P/3Qn3/4R3/4B1K1 b - - 0 1",
    solution: [{ from: "f6", to: "f1" }],
  },
  {
    id: "",
    name: "",
    startFen: "2kr2r1/1p5p/2n1P3/3N4/4q3/p5BP/6P1/5RK1 w - - 0 1",
    solution: [{ from: "d5", to: "b6" }],
  },
  {
    id: "",
    name: "",
    startFen: "3bkr2/R6p/4N3/4n3/6Pq/2P4P/7K/8 w - - 0 1",
    solution: [{ from: "e6", to: "g7" }],
  },
  {
    id: "",
    name: "",
    startFen: "r2q1b1r/pppbk2p/3p2B1/3Pp3/2P5/4B2P/PP3PP1/R3K2R w KQ - 0 1",
    solution: [{ from: "e3", to: "g5" }],
  },
  {
    id: "",
    name: "",
    startFen: "7B/8/8/8/8/2K5/p7/k7 w - - 0 1",
    solution: [{ from: "c3", to: "c2" }],
  },
  {
    id: "",
    name: "",
    startFen: "8/6k1/2b5/6p1/8/1r6/6P1/4R1RK b - - 0 1",
    solution: [{ from: "b3", to: "h3" }],
  },
  {
    id: "",
    name: "",
    startFen: "rnbq1bnr/pppp1kP1/7p/4Q3/4pP2/8/PPPP2PP/RNB1KBNR w KQ - 0 1",
    solution: [{ from: "g7", to: "h8" }],
  },
  {
    id: "",
    name: "",
    startFen:
      "rn1qkb1r/pp2pppp/2p2n2/4N3/2BP4/2N5/PPP2PPP/R1BbK2R w KQkq - 0 1",
    solution: [{ from: "c4", to: "f7" }],
  },
  {
    id: "",
    name: "",
    startFen: "4k3/4P3/4K3/8/4N3/8/8/3q4 w - - 0 1",
    solution: [{ from: "e4", to: "f6" }],
  },
  {
    id: "",
    name: "",
    startFen: "2b1k1nr/p4ppp/4p3/3p4/1b6/8/P2NPPPP/R1qQKBNR b KQk - 0 1",
    solution: [{ from: "b4", to: "d2" }],
  },
  {
    id: "",
    name: "",
    startFen: "8/8/4K3/8/4bkn1/2R5/5N2/8 w - - 0 1",
    solution: [{ from: "f2", to: "h3" }],
  },
  {
    id: "",
    name: "",
    startFen: "7q/1k6/1p2R3/7p/pP6/K5P1/4PQ2/8 b - - 0 1",
    solution: [{ from: "h8", to: "a1" }],
  },
  {
    id: "",
    name: "",
    startFen: "8/pk1p2R1/2q5/P7/3p1KP1/4r3/3Q4/5B2 b - - 0 1",
    solution: [{ from: "c6", to: "f6" }],
  },
  {
    id: "",
    name: "",
    startFen: "r1b1kbnr/pppp1Npp/8/8/3nq3/8/PPPPBP1P/RNBQKR2 b Qkq - 0 1",
    solution: [{ from: "d4", to: "f3" }],
  },
  {
    id: "",
    name: "",
    startFen: "3R4/7k/1q5p/7P/6n1/8/1BP5/3K4 w - - 0 1",
    solution: [{ from: "d8", to: "h8" }],
  },
  {
    id: "",
    name: "",
    startFen: "1R6/3k4/qp1r3p/3p2pQ/p2Nb3/1P4P1/K7/8 w - - 0 1",
    solution: [{ from: "h5", to: "f7" }],
  },
  {
    id: "",
    name: "",
    startFen: "r2q1b1r/pppbk2p/5pB1/3Pp3/2P5/4B2P/PP3PP1/R3K2R w KQ - 0 1",
    solution: [{ from: "e3", to: "c5" }],
  },
  {
    id: "",
    name: "",
    startFen: "7k/p2r2qp/1p4p1/2p5/8/1P4P1/PB5P/5RK1 w - - 0 1",
    solution: [{ from: "f1", to: "f8" }],
  },
  {
    id: "",
    name: "",
    startFen: "5rr1/7k/5Pp1/3R4/8/3B2P1/6K1/8 w - - 0 1",
    solution: [{ from: "d5", to: "h5" }],
  },
  {
    id: "",
    name: "",
    startFen: "6k1/ppN5/3p2p1/3P3p/2PbQ2K/1P4BP/P7/8 b - - 0 1",
    solution: [{ from: "d4", to: "f6" }],
  },
  {
    id: "",
    name: "",
    startFen: "5k2/4b2p/7N/8/p7/1pPqP3/1P3PR1/2K5 w - - 0 1",
    solution: [{ from: "g2", to: "g8" }],
  },
  {
    id: "",
    name: "",
    startFen: "rk3n1r/pn5p/2p2Rp1/2N5/1PP3B1/8/P5PP/6K1 w - - 0 1",
    solution: [{ from: "c5", to: "a6" }],
  },
  {
    id: "",
    name: "",
    startFen: "3r2k1/ppp2ppp/6Q1/b7/3n1B2/2p3n1/P4PPP/RN3RK1 b - - 0 1",
    solution: [{ from: "d4", to: "e2" }],
  },
  {
    id: "",
    name: "",
    startFen: "2R5/1k6/1r6/pP5r/8/5bP1/P4P2/2R3K1 w - - 0 1",
    solution: [{ from: "c1", to: "c7" }],
  },
  {
    id: "",
    name: "",
    startFen: "8/8/b4pB1/5P2/Qn6/6nP/8/2k1K3 b - - 0 1",
    solution: [{ from: "b4", to: "d3" }],
  },
  {
    id: "",
    name: "",
    startFen: "6k1/p4p2/7p/4K1p1/3QP3/7q/PPP5/R1B2R2 b - - 0 1",
    solution: [{ from: "h3", to: "e6" }],
  },
  {
    id: "",
    name: "",
    startFen: "4Q3/8/qp3p2/5kb1/1Pb5/2P2P2/1K4P1/8 w - - 0 1",
    solution: [{ from: "e8", to: "e4" }],
  },
  {
    id: "",
    name: "",
    startFen: "2k5/8/2p4q/1pQ5/6p1/1P4P1/5PK1/6R1 b - - 0 1",
    solution: [{ from: "h6", to: "h3" }],
  },
  {
    id: "",
    name: "",
    startFen: "r1b4r/1p1k1Npp/2p2n2/1B6/3p4/Bn6/P4PPP/4R1K1 w - - 0 1",
    solution: [{ from: "e1", to: "e7" }],
  },
  {
    id: "",
    name: "",
    startFen: "4r3/ppR2p1k/6p1/8/3B4/P6P/1PP3P1/2K2n2 b - - 0 1",
    solution: [{ from: "e8", to: "e1" }],
  },
  {
    id: "",
    name: "",
    startFen: "3rk3/3qbp1p/5p1Q/p6N/Pp6/7P/1PP2PP1/3rR1K1 w - - 0 1",
    solution: [{ from: "h5", to: "f6" }],
  },
  {
    id: "",
    name: "",
    startFen: "r3r3/3nk1b1/b1qp3p/1npP4/1p6/4B1NP/1P3RP1/1B2R1K1 w - - 0 1",
    solution: [{ from: "e3", to: "g5" }],
  },
  {
    id: "",
    name: "",
    startFen: "4r1k1/1p3ppp/p7/2P3N1/5P1q/1Qn5/P5P1/2B2RK1 b - - 0 1",
    solution: [{ from: "c3", to: "e2" }],
  },
  {
    id: "",
    name: "",
    startFen: "r3k2r/ppR2npp/4N1P1/8/1qN5/1P6/P4PP1/5K1R w kq - 0 1",
    solution: [{ from: "g6", to: "f7" }],
  },
  {
    id: "",
    name: "",
    startFen: "7Q/4kb2/5pQ1/4pK2/4P3/3p1P2/8/8 b - - 0 1",
    solution: [{ from: "f7", to: "e6" }],
  },
  {
    id: "",
    name: "",
    startFen: "N1bk4/pp1p1Qpp/8/2b5/7q/8/PPP1n1PP/RNB2R1K b - - 0 1",
    solution: [{ from: "e2", to: "g3" }],
  },
  {
    id: "",
    name: "",
    startFen: "3r2k1/6pp/8/8/6Q1/2P2pP1/1P3P1P/5K2 b - - 0 1",
    solution: [{ from: "d8", to: "d1" }],
  },
  {
    id: "",
    name: "",
    startFen: "8/8/4p3/4kp2/R3N1b1/4K3/7r/8 w - - 0 1",
    solution: [{ from: "a4", to: "a5" }],
  },
  {
    id: "",
    name: "",
    startFen: "r3rn2/pp2pkn1/1qpp1p2/5N1b/3P4/3B1N2/PPP3PP/R1B1R2K w - - 0 1",
    solution: [{ from: "f5", to: "h6" }],
  },
];
