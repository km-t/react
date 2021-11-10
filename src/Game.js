import React from "react";
import { Board } from "./Board";

/**
 * @class Game ゲーム全般を表すクラス
 * @extends {React.Component}
 */
export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(props.boardSize ** 2).fill(null),
          move: Array(2).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  /**
   * 勝敗判定をする関数
   *
   * @param {*} squares
   * @return 勝敗がついているならその人が置いているマスの番号を返す。勝敗がついていないならnullを返す
   */
  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  /**
   * クリック時の処理を行う関数
   * @param {*} i
   * @memberof Board
   */
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          move: [i%this.props.boardSize, parseInt(i/this.props.boardSize)],
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  /**
   * 過去の盤面に戻る関数
   * @param {*} step
   * @memberof Game
   */
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }
  /**
   * @return {*}
   * @memberof Game
   */
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const point = "(" + step.move[0] + "," + step.move[1] + ")";
      const desc = move ? "Go to move # " + move + point : "Go to game start";
      let className = "un-selected";
      if (step === current) {
        className = "selected";
      }

      return (
        <li key={move}>
          <button className={className} onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status;
    if (winner) {
      status = "Winner" + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
