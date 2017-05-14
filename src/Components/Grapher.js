import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import randomColor from 'randomcolor';

function getDataSet(sensorData, filter) {
    if (!filter.getStartDate() || !filter.getEndDate())
        return [];

    return sensorData.toSeq()
        .filter((value, key) => filter.getSensors().has(key))
        .map(function(currentSensorData, sensorID) {
            var data = currentSensorData.toSeq()
                .filter((value, key) =>
                    (filter.getStartDate().isBefore(value.timestamp) &&
                    filter.getEndDate().isAfter(value.timestamp))
                ).map((value, key) => ({
                    x: value.timestamp,
                    y: value[filter.getSelectedField()]
                })).toJS();

            return {
                label: sensorID,
                borderColor: randomColor(), //TODO: cache color
                data: data
            };
        }).toArray();
}

export default class Grapher extends Component {
    render() {
        var data = {
            datasets: getDataSet(
                this.props.sensorData.getValue(),
                this.props.filter
            )
        };

        return (
            <Line
                data={data}

                options={{
                    scales: {
                        xAxes: [{
                            type: "time"
                        }]
                    }
                }}
            />
        );
    }
}
