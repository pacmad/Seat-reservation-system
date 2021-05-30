import React, { Component } from 'react';
import store from '../../services/store'
import { Props, State, Seats } from "../../interfaces"
import "../../css/summary.css"

class Summary extends Component<Props, State> {
    render() {
        return (
            <div className="container" style={{ justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column", paddingTop: "2%", paddingLeft: "2%" }}>
                <span className="greetings">Twoja rezerwacja przebiegła pomyślnie!</span>
                <span className="summary">Wybrałeś miejsca:</span>
                {store.getState().recentlyBooked.map((item: Seats, key: number) => (<span className="summary" key={key}>- rząd x{item.cords.x}, miejsce y{item.cords.y} {"(id" + key + ")"}</span>))}
                <span className="sendOff">Dziękujemy! W razie problemów prosimy o kontakt z działem administracji.</span>
            </div>
        );
    }
}

export default Summary;