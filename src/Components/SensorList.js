import React, { Component } from 'react';
import {Grid} from 'react-mdc-web/lib';

import Actions from '../Stores/Actions.js';

import SensorItem from './SensorItem.js';

function onSelectionChanged(sensorID, checked) {
	if (checked)
		Actions.setFilterAddSensor(sensorID);
	else
		Actions.setFilterRemoveSensor(sensorID);
}

export default class SensorList extends Component {
	render() {
		var sensors = this.props.sensors;
		var filter = this.props.filter;

		if (sensors.getError()) {
			//TODO: proper error
			return <div>Error!</div>
		}

		return (
			<div>
				{function() {
					if (sensors.isLoading())
						//TODO: proper spinner
						return <div>Loading</div>
					else
						return <div></div>
				} () }

				<Grid>
				{
					sensors.getValue().map(function(sensor, i){
						return <SensorItem
									sensorInfo={sensor}
									selected={filter.getSensors().has(sensor.id)}
									onSelectionChanged={(checked) => onSelectionChanged(sensor.id, checked)}
									key={sensor.id}
								/>
					}).toJS()
				}
				</Grid>
			</div>
		);
	}
}
