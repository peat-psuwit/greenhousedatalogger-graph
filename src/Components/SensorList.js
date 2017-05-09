import React, { Component } from 'react';
import {Grid} from 'react-mdc-web/lib';

import SensorItem from './SensorItem.js';

export default class SensorList extends Component {
	render() {
		return <Grid>
			{
				this.props.sensors.map(function(sensor, i){
					return <SensorItem sensorInfo={sensor} key={sensor.id} />
				})
			}
		 </Grid>
	}
}
