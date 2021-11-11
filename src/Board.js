import React from "react";

/**
 * 1マスを描画する関数
 * @param {*} props
 * @return {*}
 */
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

/**
 * @class Board 盤面を表すクラス
 * @extends {React.Component}
 */
export class Board extends React.Component {
  /**
   * 1マスを描画する関数
   * @param {*} i
   * @return {*}
   * @memberof Board
   */
  renderSquare(x, y) {
    return (
      <Square
        value={this.props.squares[y][x]}
        onClick={() => this.props.onClick(x, y)}
      />
    );
  }

  /**
   * @return {*}
   * @memberof Board
   */
  render() {
    const items = [];
    const boardSize =this.props.squares.length;
    for (let y = 0; y < boardSize; y++) {
      let item = [];
      for (let x = 0; x < boardSize; x++) {
        item.push(this.renderSquare(x, y));
      }
      items.push(<div className="board-row">{item}</div>);
    }
    return <div>{items}</div>;
  }
}
