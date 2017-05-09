import React, { Component } from 'react';
import {Toolbar,ToolbarRow,ToolbarSection,ToolbarTitle} from 'react-mdc-web/lib';

export default class TitleBar extends Component {
	render() {
		return <Toolbar fixed>
				  <ToolbarRow>
					<ToolbarSection align="start">
					  <ToolbarTitle>Greenhouse Data Grapher</ToolbarTitle>
					</ToolbarSection>
				  </ToolbarRow>
				</Toolbar>
	}
}
