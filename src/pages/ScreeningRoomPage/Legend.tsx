import React, { Component } from 'react';
import { Button } from 'antd'
import "../../css/legend.css"
import { LegendProps, State } from "../../interfaces"

class Legend extends Component<LegendProps, State> {

    render() {
        return (
            <div className="legend">
                <div className="divForBoxes">
                    <div className="box" style={{ backgroundColor: "white" }}></div>
                    <span className="info">Miejsca dostęne</span>
                </div>
                <div className="divForBoxes">
                    <div className="box" style={{ backgroundColor: "#404040" }}></div>
                    <span className="info">Miejsca zarezerwowane</span>
                </div>
                <div className="divForBoxes">
                    <div className="box" style={{ backgroundColor: "orange" }}></div>
                    <span className="info">Twój wybór</span>
                </div>

                <Button onClick={this.props.book} size="large" style={{ width: "20%", height: "60px" }}>Rezerwuj</Button>
            </div>
        );
    }
}

export default Legend;