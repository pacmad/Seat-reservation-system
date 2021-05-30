import React, { Component } from 'react';
import store from "../../services/store"
import Seat from "./Seat"
import Legend from "./Legend"
import history from "../../history"
import { bookSeats, recentlyBooked } from "../../services/action"
import { Props, Seats, ScreeningRoomState } from "../../interfaces"
import { Alert } from "antd"

class ScreeningRoom extends Component<Props, ScreeningRoomState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            seats: [],
            picked: 0,
            toBook: [],
            warning: "",
            showPopUp: false
        }
    }

    componentDidMount() {
        if (store.getState().seats.length > 0) {
            let temp: Seats[] = []
            for (let i = 0; i < 150; i++) {
                for (let j = 0; j < store.getState().seats.length; j++) {
                    if (i === ((store.getState().seats[j].cords.x * 15) + (store.getState().seats[j].cords.y))) {
                        temp.push(store.getState().seats[j])
                    }
                }
                if (temp[i] === undefined) {
                    temp.push({
                        cords: {
                            x: 0,
                            y: 0
                        },
                        id: "",
                        reserved: true
                    })
                }
            }
            let row: number = 0
            let proposalSeats: Seats[] = []
            let pop: boolean = true
            if (store.getState().selected.together === true) {
                for (let i = 0; i < 150; i++) {
                    if (temp[i].id === "") {
                        proposalSeats = []
                        row = NaN
                        continue
                    }
                    if (row === temp[i].cords.x && temp[i].reserved === false) {
                        proposalSeats.push(temp[i])
                    }
                    else if (temp[i].reserved === false) {
                        row = temp[i].cords.x
                        proposalSeats = []
                        proposalSeats.push(temp[i])
                    }
                    else if (temp[i].reserved === true) {
                        proposalSeats = []
                    }
                    if (store.getState().selected.amount === proposalSeats.length) {
                        pop = false
                        this.setState({
                            toBook: proposalSeats,
                            picked: proposalSeats.length
                        })
                        break
                    }
                }
            } else {
                for (let i = 0; i < 150; i++) {
                    if (temp[i].reserved === false) {
                        proposalSeats.push(temp[i])
                    }
                    if (store.getState().selected.amount === proposalSeats.length) {
                        this.setState({
                            toBook: proposalSeats,
                            picked: proposalSeats.length
                        })
                        break
                    }
                }
            }
            if (store.getState().selected.together === true && pop === true) {
                this.setState({
                    warning: "Niestety, nie ma odpowiedniej ilości wolnych miejsc obok siebie w jednym rzędzie, proszę wybrać miejsca ręcznie.",
                    showPopUp: true
                })
            }

            this.setState({
                seats: temp
            })
        }
        else {
            history.push('/')
        }
    }

    incrementPicked = () => {
        this.setState({
            picked: this.state.picked + 1
        })
    }

    decrementPicked = () => {
        if (this.state.picked > 0) {
            this.setState({
                picked: this.state.picked - 1
            })
        }
    }

    pick = (seat: Seats) => {
        let temp: Seats[] = this.state.toBook
        temp.push(seat)
        this.setState({
            toBook: temp
        })
    }

    unpick = (seat: Seats) => {
        let temp: Seats[] = this.state.toBook
        let index = temp.indexOf(seat)
        if (index > -1) {
            temp.splice(index, 1);
        }
        this.setState({
            toBook: temp
        })
    }

    closePopUp = () => {
        setTimeout(() => this.setState({
            warning: "",
            showPopUp: false
        }), 500);
    }

    warning = (warningText: string) => {
        this.setState({
            warning: warningText,
            showPopUp: true
        })
    }

    book = () => {
        if (this.state.picked === store.getState().selected.amount) {
            let temp = this.state.toBook
            for (let i = 0; i < temp.length; i++) {
                temp[i].reserved = true
                store.dispatch(bookSeats(temp[i]))
            }
            store.dispatch(recentlyBooked(temp))
            history.push("/summary")
        } else {
            this.setState({
                warning: "Wybrałeś mniej miejsc, niż zadeklarowana wartość z poprzedniej podstrony!",
                showPopUp: true
            })
        }
    }

    render() {
        return (
            <div className="container" style={{ flexWrap: "wrap", paddingTop: "1.5%", paddingLeft: "18.56%", paddingRight: "18.56%" }}>
                {this.state.showPopUp &&
                    <Alert
                        style={{ position: "fixed", left: "50%", top: "5%", transform: "translate(-50%, -50%)" }}
                        message={this.state.warning}
                        type="warning"
                        showIcon
                        closable
                        onClose={this.closePopUp}
                    />
                }
                {this.state.seats.map((item: Seats, key: number) => (<Seat key={key} icrement={this.incrementPicked} decrement={this.decrementPicked} pick={this.pick} unpick={this.unpick} warning={this.warning} picked={this.state.picked} data={item} proposalSeats={this.state.toBook} />))}
                <Legend book={this.book} />
            </div>
        );
    }
}

export default ScreeningRoom;