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
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  /**
   * @return {*}
   * @memberof Board
   */
  render() {
    const items = [];
    const boardSize = Math.sqrt(this.props.squares.length);
    for (let i = 0; i < boardSize; i++) {
      let item = [];
      for (let j = 0; j < boardSize; j++) {
        item.push(this.renderSquare(i * boardSize + j));
      }
      items.push(<div>{item}</div>);
    }
    return (
      <div>{items}</div>
    );
  }
}
