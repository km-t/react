/**
 * @class Board 盤面を表すクラス
 * @extends {React.Component}
 */
class Board extends React.Component {
  /**
   * 1マスを描画する関数
   * @param {*} props
   * @return {*}
   */
  Square(props) {
    return (
      <button className='square' onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
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
    return (
      <div>
        <div className='board-row'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className='board-row'>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className='board-row'>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
