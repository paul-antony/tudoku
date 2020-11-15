import React, { Component } from 'react';
import Board from './Board/Board';



class game extends Component {

    constructor() {
        super();
        this.state = {game_state : Array(9).fill().map(() => Array(9).fill(0)),
                    col_top_index : [8,8,8,8,8,8,8,8,8],
                    next_number : 0
                }
      }


    render() {
      return (
        <div>
          <Board game_state = {this.state.game_state} />
        </div>

      )
    }
}

export default game;