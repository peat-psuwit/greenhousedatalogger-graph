import React, { Component } from 'react';
import {Card,CardText,Checkbox} from 'react-mdc-web/lib';

export default Class SensorItem extends Component {
	render() {
		return
		<Card> 
		    <CardText>
				<Checkbox 
					onChange={({target: {checked}}) =>
						{this.setState({checked})
					}}
					checked={this.state.checked}
				/>
				<label>{this.props.sensorInfo.id}</label>
		    </CardText> 
		</Card>
	}
}