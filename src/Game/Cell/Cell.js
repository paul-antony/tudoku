import React from 'react';
import './Cell.css';

const cell = (props) => {
    let value = props.value === 0 ? "":Math.abs(props.value);
    let cell_class = "cell"; 
    if (props.value > 0){
        cell_class = cell_class + " cell--active"
    }
    else if (props.value < 0){
        cell_class = cell_class + " cell--del"
    }

    return (
    <div className={cell_class} data-cell-index = "{props.index}">{value}</div>
    )
};

export default cell;