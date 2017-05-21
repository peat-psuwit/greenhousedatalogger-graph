import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import randomColor from 'randomcolor';

import '../css/Grapher.css';

export default class Grapher extends Component {
    constructor() {
        super();

        this._colorCache = {};
    }

    getColorForSensor(sensorID) {
        if (!this._colorCache[sensorID])
            this._colorCache[sensorID] = randomColor();

        return this._colorCache[sensorID];
    }

    getDataSet(sensorData, filter) {
        if (!filter.getStartDate() || !filter.getEndDate())
            return [];

        return sensorData.toSeq()
            .filter((value, key) => filter.getSensors().has(key))
            .map((currentSensorData, sensorID) => {
                var data = currentSensorData.toSeq()
                    .filter((value, key) =>
                        (
                            (
                                filter.getStartDate().isBefore(value.timestamp) ||
                                filter.getStartDate().isSame(value.timestamp)
                            ) && (
                                filter.getEndDate().isAfter(value.timestamp) ||
                                filter.getEndDate().isSame(value.timestamp)
                            )
                        )
                    ).map((value, key) => ({
                        x: value.timestamp,
                        y: value[filter.getSelectedField()]
                    })).toJS();

                return {
                    label: sensorID,
                    borderColor: this.getColorForSensor(sensorID),
                    lineTension: 0.1,
                    data: data
                };
            }).toArray();
    }

    render() {
        var data = {
            datasets: this.getDataSet(
                this.props.sensorData.getValue(),
                this.props.filter
            )
        };

        var options = {
            scales: {
                xAxes: [{
                    type: "time"
                }]
            },
            maintainAspectRatio: false
        };

        return (
            <div className="grapher-wrapper">
                <Line data={data} options={options} />
            </div>
        );
    }
}
