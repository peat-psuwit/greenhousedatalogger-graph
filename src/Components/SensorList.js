import React, { Component } from 'react';
import {Grid} from 'react-mdc-web/lib';

import SensorItem from './SensorItem.js';

export default class SensorList extends Component {
	render() {
		var sensors = this.props.sensors;

		if (sensors.error) {
			//TODO: proper error
			return <div>Error!</div>
		}

		return (
			<div>
				<Grid>
				{
					sensors.sensors.map(function(sensor, i){
						return <SensorItem sensorInfo={sensor} key={sensor.id} />
					}).toJS()
				}
				</Grid>

				{function() {
					if (sensors.loading)
						//TODO: proper spinner
						return <div>Loading</div>
					else
						return <div></div>
				} () }
			</div>
		);
	}
}
