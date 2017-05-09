import React, { Component } from 'react';
import {Toolbar,ToolbarRow,ToolbarSection,Button} from 'react-mdc-web/lib';
import {DateField,DatePicker} from 'react-date-picker';
import moment from 'moment';

import Actions from '../Stores/Actions.js';

import 'react-date-picker/index.css'

moment.locale('th');

export default class OptionBar extends Component {
	onStartDateChanged(dateMoment) {
		Actions.setFilter({
			startDate: dateMoment
		});
	}

	onEndDateChanged(dateMoment) {
		Actions.setFilter({
			endDate: dateMoment
		});
	}

	render() {
		return <Toolbar>
			<ToolbarRow>
				<ToolbarSection align="start">
					<label>Start date:</label>
					<DateField
						dateFormat="DD-MM-YYYY HH:mm:ss"
						forceValidDate={true}
						updateOnDateClick={true}
						value={this.props.filter.startDate}
						onChange={(dateString, { dateMoment, timestamp}) => {this.onStartDateChanged(dateMoment)}}
						style={{
							"color": "black",
							"margin-left": "5px",
							"margin-right": "5px"
						}}
					>
						<DatePicker
							navigation={true}
							locale="th"
							forceValidDate={true}
							highlightWeekends={true}
							highlightToday={true}
							weekNumbers={true}
							weekStartDay={0}
							footer={false}
						/>
					</DateField>

					<label>End date:</label>
					<DateField
						dateFormat="DD-MM-YYYY HH:mm:ss"
						forceValidDate={true}
						updateOnDateClick={true}
						value={this.props.filter.endDate}
						onChange={(dateString, { dateMoment, timestamp}) => {this.onEndDateChanged(dateMoment)}}
						style={{
							"color": "black",
							"margin-left": "5px",
							"margin-right": "5px"
						}}
					>
						<DatePicker
							navigation={true}
							locale="th"
							forceValidDate={true}
							highlightWeekends={true}
							highlightToday={true}
							weekNumbers={true}
							weekStartDay={0}
							footer={false}
						/>
					</DateField>
				</ToolbarSection>
				<ToolbarSection align="end">
					<Button raised accent>Select all</Button>
					<Button raised accent>Deselect all</Button>
				</ToolbarSection>
			</ToolbarRow>
		</Toolbar>
	}
}
