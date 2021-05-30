import React, { Component } from 'react';
import "../../css/seat.css"
import store from '../../services/store';
import { SeatProps, SeatState } from "../../interfaces"

class Seat extends Component<SeatProps, SeatState> {
    constructor(props: SeatProps) {
        super(props);
        this.state = {
            color: "white",
            style: "seat"
        }
    }

    componentDidMount() {
        if (this.props.data.id === "") {
            this.setState({ style: "hidden" })
        } else {
            if (this.props.data.reserved === true) {
                this.setState({ color: "#404040" })
            } else {
                for (let i = 0; i < this.props.proposalSeats.length; i++) {
                    if (this.props.proposalSeats[i] === this.props.data) {
                        this.setState({
                            color: "orange"
                        })
                        break
                    }
                }
            }
        }
    }

    pickSeat = () => {
        if (this.props.data.reserved !== true) {
            if (this.props.picked < store.getState().selected.amount) {
                if (this.state.color !== "orange") {
                    this.setState({
                        color: "orange"
                    }, () => {
                        this.props.icrement()
                        this.props.pick(this.props.data)
                    })
                } else {
                    this.setState({
                        color: "white"
                    }, () => {
                        this.props.decrement()
                        this.props.unpick(this.props.data)
                    })
                }
            } else {
                if (this.state.color === "orange") {
                    this.setState({
                        color: "white"
                    }, () => {
                        this.props.decrement()
                        this.props.unpick(this.props.data)
                    })
                }
                else if (this.state.color === "white") {
                    this.props.warning("Maksymalna liczba miejsc do wybrania została osiągnięta.")
                }
            }
        } else {
            this.props.warning("To miejsce jest już zajęte!")
        }
    }

    render() {
        return (
            <div onClick={this.pickSeat} className={this.state.style} style={{ backgroundColor: this.state.color, }}></div>
        );
    }
}

export default Seat;