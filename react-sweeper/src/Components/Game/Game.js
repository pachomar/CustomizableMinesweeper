import React from 'react';
import Board from '../Board/Board';
import Timer from '../Timer/Timer';
import GridView from '../GridView/GridView';
import './Game.css';

class Game extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            height: 8,
            width: 8,
            mines: 10,
            difficulty: "Easy",
            remainingMines: 10,
            timerRunning: false,
            resultMessage: "",
            gameFinished: false,
            startTime: new Date(),
            endTime: new Date(),
            newGame: ""
        };
    }

    ChangeDifficulty = () => {
        let difficulty = document.querySelector("#level_select").value;
        document.querySelector("#custom_height").readOnly = true;
        document.querySelector("#custom_width").readOnly = true;
        document.querySelector("#custom_mines").readOnly = true;

        this.setState( {difficulty : difficulty });

        if (difficulty === "Easy") {
            this.setState({height: 8, width: 8, mines: 10, difficulty : difficulty});
        }
        if (difficulty === "Normal") {
            this.setState({height: 12,width: 12,mines: 20, difficulty : difficulty});
        }
        if (difficulty === "Hard") {
            this.setState({height: 16,width: 16,mines: 40, difficulty : difficulty});
        }
        if (difficulty === "Custom") {
            this.setState({difficulty : difficulty});
            document.querySelector("#custom_height").readOnly = false;
            document.querySelector("#custom_width").readOnly = false;
            document.querySelector("#custom_mines").readOnly = false;
        }
    }

    HandleHeightChange = (text) => { this.setState({height: parseInt(text.target.value), width: parseInt(text.target.value)})}
    HandleWidhtChange = (text) => { this.setState({height: parseInt(text.target.value), width: parseInt(text.target.value)})}
    HandleMineChange = (text) => { this.setState({mines: parseInt(text.target.value)})}

    UpdateMineCount = (mines) => {
        this.setState({ remainingMines: mines });
    }

    StopGameTimer = () => {
        this.setState({ timerRunning: false, resultMessage: "" });
    }

    StartGameTimer = () => {
        this.setState({ timerRunning: true, resultMessage: "", startTime: Date.now() });
    }

    FinishGame = (message) => {
        this.setState({ resultMessage: message, gameFinished: true, endTime: Date.now()}, () => this.createRecord());
    }
    
    createRecord = () => {
        var game = JSON.stringify({
            "startTime": new Date(this.state.startTime).toLocaleString('en-US', { hour12: true }),
            "endTime": new Date(this.state.endTime).toLocaleString('en-US', {hour12: true }),
            "difficulty": document.querySelector("#level_select").value,
            "timeSpent": (new Date(this.state.endTime).getTime() - new Date(this.state.startTime).getTime()) / 1000,
            "status": this.state.resultMessage.replace("You ", "")
        });

        this.setState({ newGame: game });
    }

    render() {
        return (
            <div className="game">
                <div className="game-info">
                    <h2>Custom Minesweeper</h2>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td className="cellClass">
                                <select id="level_select" className="dropdown btn btn-secondary select" onChange={this.ChangeDifficulty}>
                                    <option value="Easy"> Easy </option>
                                    <option value="Normal"> Normal </option>
                                    <option value="Hard"> Hard </option>
                                    <option value="Custom"> Custom </option>
                                </select><br /><br />
                            </td>
                            <td rowSpan={2} className="cellClass">
                                <Timer mines={this.state.remainingMines} isOn={this.state.timerRunning} stopGTimer={this.StopGameTimer} 
                                    startGTimer={this.StartGameTimer} stopTimer={this.state.gameFinished} resetBoard={this.ChangeDifficulty}></Timer>
                                <h4>{this.state.resultMessage}</h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Height:&nbsp;</label><input className="text-field" id="custom_height" onChange={this.HandleHeightChange} value={this.state.height} readOnly={true} ></input><br />
                                <label>Width:&nbsp;</label><input className="text-field" id="custom_width" onChange={this.HandleWidhtChange} value={this.state.width} readOnly={true} ></input><br />
                                <label>Mines:&nbsp;</label><input className="text-field" id="custom_mines" onChange={this.HandleMineChange} value={this.state.mines} readOnly={true} ></input><br />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Board height={this.state.height} width={this.state.width} mines={this.state.mines}
                    UpdateMineCount = {this.UpdateMineCount} timerRunning={this.state.timerRunning}
                    onGameFinish={this.FinishGame} stopTimer={this.state.gameFinished}/>
                    <br/><br/>
                <GridView addNewGame={this.state.newGame}></GridView>
            </div>
        );
    }
}

export default Game;