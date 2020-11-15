// import React from 'react';
import Cell from './Cell/Cell'

import "./Board.css";

function board(params) {
    let grid = [];

    for (let i = 0; i<9; i++){
        for (let j = 0; j < 9 ; j++){
            grid.push(<Cell value = {params.game_state.[i][j]} index = '{j}' key = "{ij}"/>)
        }
    }
    return (
        <div className = "game--board">
        {grid}
        </div>
    );
    
}

export default board;