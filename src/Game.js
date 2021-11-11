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
          squares: Array(props.boardSize ** 1)
            .fill()
            .map(() => Array(props.boardSize ** 1).fill(null)),
          move: Array(2).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  calculateWinnerWithRight(squares) {
    for (let y = 0; y < squares.length; y++) {
      for (let x = 0; x < squares[0].length - 2; x++) {
        if (
          squares[y][x] &&
          squares[y][x] === squares[y][x + 1] &&
          squares[y][x] === squares[y][x + 2]
        ) {
          return squares[y][x];
        }
      }
    }
    return null;
  }
  calculateWinnerWithDown(squares) {
    for (let y = 0; y < squares.length - 2; y++) {
      for (let x = 0; x < squares[0].length; x++) {
        if (
          squares[y][x] &&
          squares[y][x] === squares[y + 1][x] &&
          squares[y][x] === squares[y + 2][x]
        ) {
          return squares[y][x];
        }
      }
    }
    return null;
  }

  calculateWinnerWithRightDown(squares) {
    for (let y = 0; y < squares.length - 2; y++) {
      for (let x = 0; x < squares[0].length - 2; x++) {
        if (
          squares[y][x] &&
          squares[y][x] === squares[y + 1][x + 1] &&
          squares[y][x] === squares[y + 2][x + 2]
        ) {
          return squares[y][x];
        }
      }
    }
    return null;
  }
  

  calculateWinnerWithLeftDown(squares) {
    for (let y = 0; y < squares.length - 2; y++) {
      for (let x = 2; x < squares[0].length; x++) {
        if (
          squares[y][x] &&
          squares[y][x] === squares[y + 1][x - 1] &&
          squares[y][x] === squares[y + 2][x - 2]
        ) {
          return squares[y][x];
        }
      }
    }
    return null;
  }

  /**
   * 勝敗判定をする関数
   *
   * @param {*} squares
   * @return 勝敗がついているならその人が置いているマスの番号を返す。勝敗がついていないならnullを返す
   */
  isExistWinner(squares) {
    if (this.calculateWinnerWithDown(squares) || this.calculateWinnerWithRight(squares) || this.calculateWinnerWithRightDown(squares) || this.calculateWinnerWithLeftDown(squares)) {
      return true;
    }
    return false;
  }

  /**
   * クリック時の処理を行う関数
   * @param {*} i
   * @memberof Board
   */
  handleClick(x, y) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = JSON.parse(JSON.stringify(current.squares));
    if (this.isExistWinner(squares) || squares[y][x]) {
      return;
    }
    squares[y][x] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          move: [x, y],
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
    console.log("stepnumber="+this.state.stepNumber);
    console.log(history[this.state.stepNumber]);
    const winner = this.isExistWinner(current.squares);

    const moves = history.map((step, move) => {
      const point = "(" + step.move[0] + "," + step.move[1] + ")";
      const desc = move ? "Go to move # " + move + point : "Go to game start";
      let className = "un-selected";
      if (step === current) {
        className = "selected";
      }

      return (
        <li key={move}>
          <button className={className} onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });
    let status;
    if (winner) {
      status = "Winner" + (this.state.xIsNext ? "O" : "X");
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(x, y) => this.handleClick(x, y)}
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
