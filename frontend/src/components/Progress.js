import React,  { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';

class Progress extends Component {

    render(){
        let now = 60;

        return(
            <div className="progress-container">
            <h2>Your List Progress</h2>
            <div className="circle"></div>
                <ProgressBar id="bar" now={60} label={`${now}%`} />
                <ProgressBar id="bar" now={10} label={`${10}%`} />
                <ProgressBar id="bar" now={75} label={`${75}%`} />
                <ProgressBar id="bar" now={100} label={`${100}%`} />
                <ProgressBar id="bar" now={35} label={`${35}%`} />
                <ProgressBar id="bar" now={10} label={`${10}%`} />
            </div>
        )
    }
}

export default Progress;
