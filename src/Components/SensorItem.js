import React, { Component } from 'react';
import {Cell,Checkbox} from 'react-mdc-web/lib';

export default class SensorItem extends Component {
	render() {
		return <Cell col={4} > 
			<Checkbox 
				onChange={({target: {checked}}) =>
					(null /* TODO */)
				}
				checked={true}
			/>
			<label>{this.props.sensorInfo.id}</label>
		</Cell>
	}
}