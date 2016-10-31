import React from 'react';

const TimerApp = React.createClass({
    getInitialState() {
        return {minutesLeft: 1440};
    },

    componentDidMount() {
        this.calcMinutesLeft();
        this.interval = setInterval(() => this.calcMinutesLeft(), 5000);
    },

    componentWillUnmount() {
        clearInterval(this.interval);
    },

    calcMinutesLeft() {
        let today = new Date();
        let tomorrow = new Date();
        if (today.getHours() > 5) {
            tomorrow.setDate(today.getDate() + 1);
        }
        tomorrow.setHours(5); // 05:00
        tomorrow.setMinutes(0);
        tomorrow.setSeconds(0);

        let minutesLeft = Math.round((tomorrow - today) / (60 * 1000));
        console.log((tomorrow - today) / (60 * 1000));
        this.setState({minutesLeft});
    },

    render() {
        let styles = {
            margin: '0 auto',
            marginTop: '70px',
            fontSize: '200px',
            fontFamily: 'fantasy',
            fontWeight: 'bold',
            color: '#F49732',
            height: '315px',
            border: '35px solid #863B1C',
            borderLeft: 'none',
            borderRight: 'none',
            lineHeight: '247px',
        };
        return (
            <div className="container">
                <div className="row _full-height">
                    <div style={styles}>
                        { this.state.minutesLeft }
                    </div>
                </div>
            </div>
        );
    },
});

export default TimerApp;
