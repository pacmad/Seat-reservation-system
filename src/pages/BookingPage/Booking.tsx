import React, { Component } from 'react';
import { Button, InputNumber, Checkbox, Alert } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import store from "../../services/store"
import { pickSeats, getSeats } from "../../services/action"
import history from "../../history"
import { Props, BookingState, Seats } from "../../interfaces"
import "../../css/container.css"

class Booking extends Component<Props, BookingState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            amount: 0,
            together: false,
            disableCheckbox: true,
            warning: "",
            showPopUp: false
        }
    }

    componentDidMount() {
        if (!(store.getState().seats.length > 0)) {
            fetch("http://localhost:3000/seats")
                .then(res => res.json())
                .then(result => store.dispatch(getSeats(result)))
                .catch(err => console.log(err))
        }
    }

    getAmountOfSeats = (amount: number) => {
        if (amount === null) {
            this.setState({
                amount: 0,
                disableCheckbox: true
            })
        } else {
            this.setState({
                amount: amount
            }, () => {
                if (this.state.amount > 1) {
                    this.setState({
                        disableCheckbox: false
                    })
                } else {
                    this.setState({
                        disableCheckbox: true
                    })
                }
            })
        }
    }

    sideBySide = (e: CheckboxChangeEvent) => {
        this.setState({
            together: e.target.checked
        })
    }

    closePopUp = () => {
        setTimeout(() => this.setState({
            warning: "",
            showPopUp: false
        }), 500);
    }

    book = () => {
        if (this.state.amount !== 0) {
            store.dispatch(pickSeats(this.state.amount, this.state.together))
            const temp: Seats[] = store.getState().seats
            let emptySeats: number = 0
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].reserved === false) {
                    emptySeats++
                }
            }
            let amount: number = store.getState().selected.amount
            console.log(emptySeats, amount)
            if (emptySeats < amount) {
                this.setState({
                    warning: "Nie ma tylu wolnych miejsc na sali.",
                    showPopUp: true
                })
            } else {
                history.push("/screening-room")
            }
        } else {
            this.setState({
                warning: "Nie wybrano ilości miejsc do zarezerwowania!",
                showPopUp: true
            })
        }
    }

    render() {
        return (
            <div className="container" style={{ justifyContent: "center", alignItems: "center" }}>
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
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span>Liczba miejsc:</span>
                        <InputNumber min={0} onChange={this.getAmountOfSeats} style={{ width: "60%" }} />
                    </div>
                    <Checkbox disabled={this.state.disableCheckbox} onChange={this.sideBySide} style={{ marginBottom: "5%", marginTop: "5%" }}>Czy miejsca mają być obok siebie?</Checkbox>
                    <Button onClick={this.book} size="large" block>Wybierz miejsca</Button>
                </div>
            </div>
        );
    }
}

export default Booking;