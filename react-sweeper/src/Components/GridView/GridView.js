import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class GridView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          columnDefs: [
            { headerName: "Started", field: "startTime", sortable: true },
            { headerName: "Finished", field: "endTime", sortable: true },
            { headerName: "Difficulty", field: "difficulty", sortable: true },
            { headerName: "Time (s)", field: "timeSpent", sortable: true },
            { headerName: "Result", field: "status", sortable: true }],
          rowData: []
        }

        this.fetchOptions = this.fetchOptions.bind(this);
      }

    componentDidMount() {
        this.fetchOptions();
    }

    fetchOptions(){
        fetch('http://localhost:3001/games',{method: 'GET'})
        .then(res => res.json())
        .then(data => { 
            this.setState({rowData: data }) //.sort(function(a,b){ return a.timeSpent - b.timeSpent })});
        })
        .catch((error) => {
            console.log(error);
            throw new Error('Failed to load games');
        });
    }

    addResults = (game) => {
        fetch('http://localhost:3001/games', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: game
        })
        .then((json) => {
            this.fetchOptions()
        })
        .catch((error) => {
            console.log(error);
            throw new Error('Failed to save game results');
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.addNewGame !== this.props.addNewGame) {
            this.addResults(this.props.addNewGame);
        }
    }

    render () {
        return (
            <div className="ag-theme-alpine" style={{height: '500px'}}>
                <AgGridReact columnDefs={this.state.columnDefs} rowData={this.state.rowData}></AgGridReact>
            </div>
        );
    }
}

export default GridView;