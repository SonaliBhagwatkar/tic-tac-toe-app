import React, {Component} from 'react';
import './App.css';
import calculateWinner from './calculateWinner';
import Panel from './Panel';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current =history[history.length - 1];
    const squares = current.squares.slice();
   // console.log(squares);
   if (calculateWinner(squares) || squares[i]) {
       return;
   }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
}

  jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status ='Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="app">
        <div  className="app-panel">
            <Panel 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
              />
        </div>
        <div className="app-info">
            <div>{status}</div>           
        </div>
      </div>
    );
  }
}

export default App;
