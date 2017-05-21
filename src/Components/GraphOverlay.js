import React from 'react';

import '../css/GraphOverlay.css';

export default function GraphOverlay(props) {
    var message = null;

    if (props.sensors.isLoading() || props.sensorData.isLoading())
        message = 'Loading...';
    else if (props.sensors.getError() || props.sensorData.getError())
        message = 'An error has occured. Please reload this page to retry.';
    else if (props.filter.getSensors().isEmpty())
        message = 'Select a sensor from the list below to get started.'

    if (message === null)
        return null;

    return (
        <div className="graphoverlay-parent">
            <div className="graphoverlay-child">
                {message}
            </div>
        </div>
    );
}
