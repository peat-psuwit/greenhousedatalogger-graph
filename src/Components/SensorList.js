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

		if (sensors.get('error')) {
			//TODO: proper error
			return <div>Error!</div>
		}

		return (
			<div>
				<Grid>
				{
					sensors.get('sensors').map(function(sensor, i){
						return <SensorItem
									sensorInfo={sensor}
									selected={filter.get('sensors').has(sensor.id)}
									onSelectionChanged={(checked) => onSelectionChanged(sensor.id, checked)}
									key={sensor.id}
								/>
					}).toJS()
				}
				</Grid>

				{function() {
					if (sensors.get('loading'))
						//TODO: proper spinner
						return <div>Loading</div>
					else
						return <div></div>
				} () }
			</div>
		);
	}
}
