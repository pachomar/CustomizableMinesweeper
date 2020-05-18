import React from 'react';

class Timer extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      startTime: new Date(),
      endTime: new Date(),
      mines: props.mines,
      timerRuning: false
    }
  }

  startTimer = () => {
    this.setState({startTime : Date.now(), timerRunning: true});
    this.props.resetBoard();
    this.props.startGTimer();
  }

  stopTimer = () => {
    this.setState({endTime : Date.now(), timerRunning: false});
    this.props.stopGTimer();
  }

  render() {
    return(
      <div>
        <button type="button" onClick={this.startTimer} className="btn btn-success start">Start</button>
        <button type="button" onClick={this.stopTimer} className="btn btn-danger start">Finish</button>
        <h5>Mines Left: {this.props.mines}</h5>
      </div>
    )
  }
}

export default Timer;