import React, { Component } from 'react';
import {Toolbar,ToolbarRow,ToolbarSection,Button} from 'react-mdc-web/lib';
import {DateField,DatePicker} from 'react-date-picker';
import moment from 'moment';

import Actions from '../Stores/Actions.js';

import 'react-date-picker/index.css'
import '../css/OptionBar.css';

moment.locale('th');

export default class OptionBar extends Component {
	onStartDateChanged(dateMoment) {
		Actions.setFilterStartDate(dateMoment);
	}

	onEndDateChanged(dateMoment) {
		Actions.setFilterEndDate(dateMoment);
	}

	onSelectAll() {
		Actions.setFilterAddAllSensors();
	}

	onUnselectAll() {
		Actions.setFilterRemoveAllSensors();
	}

	render() {
		return <Toolbar>
			<ToolbarRow>
				<ToolbarSection align="start" className="optionbar-toolbarsection">
					<label>Start date:</label>
					<DateField
						dateFormat="DD-MM-YYYY HH:mm:ss"
						forceValidDate={true}
						updateOnDateClick={true}
						value={this.props.filter.getStartDate()}
						onChange={(dateString, { dateMoment, timestamp}) => {this.onStartDateChanged(dateMoment)}}
						className="optionbar-datefield-fix"
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
						value={this.props.filter.getEndDate()}
						onChange={(dateString, { dateMoment, timestamp}) => {this.onEndDateChanged(dateMoment)}}
						className="optionbar-datefield-fix"
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
				<ToolbarSection align="end" className="optionbar-toolbarsection">
					<Button raised accent
							onClick={() => {this.onSelectAll()}} >
						Select all
					</Button>
					<Button raised accent
							onClick={() => {this.onUnselectAll()}} >
						Deselect all
					</Button>
				</ToolbarSection>
			</ToolbarRow>
		</Toolbar>
	}
}
