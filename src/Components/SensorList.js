import React, { Component } from 'react';
import {Grid,Cell} from 'react-mdc-web/lib';

import SensorItem from './SensorItem.js';

export default Class SensorList extends Component {	
	render() {
		return
		 <Grid>
			{this.props.sensors.map(function(sensor, i){
				return 
					<Cell col={4} > 
						<SensorItem sensorInfo={sensor}/>
					</Cell>
			})}
		 </Grid>
	}
}