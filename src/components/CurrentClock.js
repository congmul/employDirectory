import React, { Component } from 'react';



class CurrentClock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date : new Date()
        }
    }

    componentDidMount() {
        this.timeID = setInterval(() => {
            this.tic()
        }
        , 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
      }

    tic = () => {
        this.setState({
            date: new Date()
        })
    }

    render(){
        return <p>{this.state.date.toLocaleTimeString()}</p>
    }

}

export default CurrentClock;