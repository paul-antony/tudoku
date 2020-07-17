
let game_active = true;

let game_state = Array(9).fill().map(() => Array(9).fill(0));


let col_top_index = [8,8,8,8,8,8,8,8,8];

let next_number = 0;

const next_number_display = document.querySelector('.next--number');


function random_uniform_int(min,max,top){
    min = Math.floor(min);
    max = Math.floor(max) - min;
    top = Math.floor(top);
    let occur = Array(max).fill(0);

    function random_int(){
        let temp = [];
        for (let i = 0; i<max; i++){
            if (top - occur[i] > 0) {
                //console.log(i,occur,occur.length);
                temp = temp.concat(Array(top - occur[i]).fill(min+i));
            }
        }
        
        let index = Math.floor(Math.random() * temp.length);
        let val = temp[index];
        //console.log(val,temp,index);
        occur[val-min]++;

        //reset occur

        let minimum = Math.min(...occur);
        console.log(minimum,occur);

        if (minimum > 0){
            for (let i = 0; i<max; i++){
                occur[i] = occur[i] - minimum;
            }
        }
        return val;
    }

    random_int.min = min;
    random_int.max = max;
    random_int.top = top;
    random_int.occur = occur;

    return random_int;

}

let random = random_uniform_int(1,10,3);

function restart_game(){
    game_active = true;
    game_state = Array(9).fill().map(() => Array(9).fill(0));
    col_top_index = [8,8,8,8,8,8,8,8,8];
    set_next_number();
    update_display();
}


function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }


function set_next_number(){
    next_number = random();
    //next_number = 9;
    next_number_display.innerHTML = next_number;
}




function check_row(row){

    let flag = [0,0,0,0,0,0,0,0,0]

    for (let i = 0; i < 9; i++){
        if (game_state[row][i] === 0){
            return false;
        }
        flag[Math.abs(game_state[row][i]) -1 ]++;
    }

    for (let i = 0; i < 9; i++){
        if(flag[i] === 0 || flag[i] > 1){
            return false;
        }
    }
    console.log("row check true");
    //set delete value to -ve
    for (let i = 0; i < 9; i++){
        game_state[row][i] = -1 * Math.abs(game_state[row][i]);
    }
    return true

}

function check_col(col){

    if (game_state[0][col] === 0){
        return false;
    }

    let flag = [0,0,0,0,0,0,0,0,0];

    for (let i = 0; i < 9; i++){
        if (game_state[i][col] === 0){
            return false;
        }
        
        flag[Math.abs(game_state[i][col]) -1 ]++;
    }

    for (let i = 0; i < 9; i++){
        if(flag[i] === 0 || flag[i] > 1){
            return false;
        }
    console.log("col check true");
    for (let i = 0; i < 9; i++){
        game_state[i][col] = -1 * Math.abs(game_state[i][col]);
    }
    return true
    }   
}

//checks 3*3 sub-square where row,col is 0,0 of sub-square; 
//if subsquare not possible return false 
function check_box(row,col){
    if (row > 6 || col > 6){
        return false;
    }

    let flag = [0,0,0,0,0,0,0,0,0];

    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            if (game_state[i+row][j+col] === 0){
                return false;
            }

            flag[Math.abs(game_state[i+row][j+col]) -1 ]++;

        }
    }


    for (let i = 0; i < 9; i++){
        if(flag[i] === 0 || flag[i] > 1){
            return false;
        }
    console.log("square check true");
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            game_state[i+row][j+col] = -1 *Math.abs(game_state[i+row][j+col]);
        }
    }
    return true
    }  

}


function check_game_state(row=-1,col=-1,flag=1){

    let del_flag = false;

    if(flag === -1){
        //check whole board row

        for (let i = 0; i<8; i++){
            if (check_row(i) === true){
                del_flag = true;
            }  
        }

        //check whole board col

        for (let i = 0; i<8; i++){
            if (check_col(i) === true){
                del_flag = true;
            }  
        }
        
        //check whole board box

        for (let i = 0; i<7; i++){
            for(let j = 0; j<7; j++){
                if (check_box(i,j) === true){
                    del_flag = true;
                }
            }  
        }
    }

    else{
        if (check_row(row) === true){
            del_flag = true;
        }

        if (check_col(col) === true){
            del_flag = true;
        }

        if (check_box(row,col) === true){
            del_flag = true;
        }

    }

    return del_flag;
}

function update_display(){

    if (next_number === 0){
        next_number_display.innerHTML = "";
    }
    let x;
    for (let i=0; i < 9; i++){
        for (let j=0; j < 9; j++){
            x = document.querySelector(`div[data-cell-index="${i}${j}"]`);
            x.className = "cell";
            x.innerHTML = game_state[i][j] === 0 ? "":Math.abs(game_state[i][j]);

            if(game_state[i][j] < 0){
                x.classList.add("del--cell")
            }
        }
    }
}

function clean_board(){
    //sleep(3000);
    for (let i = 0; i<9; i++){
        for(let j = 0; j < 9; j++){
            if (game_state[i][j] < 0){
                game_state[i][j] = 0
            }
        }
    }

    update_display();
    //sleep(3000);

    for (let j = 0; j<9; j++){
        let k = 8;
        for(let i = 8; i>=0; i--){
            if (game_state[i][j] != 0){
                game_state[k--][j] = game_state[i][j];
            }
        }
        col_top_index[j] = k
        for (;k>=0;k--){
            game_state[k][j] = 0
        }
    }
}

function board_check(row,col){
    let del_flag = check_game_state(row,col)
    while (del_flag === true){
        update_display();
        //console.log("updated with del");
        clean_board();
        //console.log("board clean");
        del_flag = check_game_state(-1,-1,-1);
        }
    update_display();
}

function handle_click(clickedCellEvent) {
    const clicked_cell = clickedCellEvent.target;
    let column_id = parseInt(clicked_cell.getAttribute('data-col-index'));

    if (game_active === false) {
        return;
    }
    // if column is full
    if (col_top_index[column_id] === -1){
        return;
    }

    let row_id = col_top_index[column_id];
    col_top_index[column_id]--;
    game_state[row_id][column_id] = next_number;
    
    next_number = 0;
    update_display();
    //console.log(JSON.parse(JSON.stringify(game_state)));
    //sleep(5000);
    board_check(row_id,column_id);
    set_next_number();
}

update_display();
set_next_number();
document.querySelectorAll('.game--column').forEach(cell => cell.addEventListener('click', handle_click));
document.querySelector('#game--restart').addEventListener('click', restart_game);



