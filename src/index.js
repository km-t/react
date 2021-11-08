import React from 'react'
import ReactDOM from 'react-dom'

/**
 *
 *
 * @class Square 1マスを表すクラス
 * @extends {React.Component}
 */
class Square extends React.Component {

    /**
     * Creates an instance of Square.
     * @param {*} props
     * @memberof Square
     */
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    /**
     * @return {*} 
     * @memberof Square
     */
    render() {
        return (
            <button className="square"
                onClick={() => { this.props.onClick(); }}
            >
                {this.props.value}
            </button>
        );
    }
}

/**
 * @class Board 盤面を表すクラス
 * @extends {React.Component}
 */
class Board extends React.Component {

    /**
     * Creates an instance of Board.
     * @param {*} props
     * @memberof Board
     */
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }

    /**
     * クリック時の処理を行う関数
     * @param {*} i
     * @memberof Board
     */
    handleClick(i){
        const squares = this.state.squares.slice();
        squares[i] = "X";
        this.setState({squares: squares});
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
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    /**
     * @return {*} 
     * @memberof Board
     */
    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

/**
 * @class Game ゲーム全般を表すクラス
 * @extends {React.Component}
 */
class Game extends React.Component {

    /**
     * @return {*} 
     * @memberof Game
     */
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);