import React, { Component } from 'react';
import {Toolbar,ToolbarRow,ToolbarSection,Elevation} from 'react-mdc-web/lib';

export default class OptionBar extends Component {
	render() {
		return <Toolbar fixed>
			<ToolbarRow>
				<ToolbarSection align="start">
				</ToolbarSection>
			</ToolbarRow>
		</Toolbar>
	}
}
