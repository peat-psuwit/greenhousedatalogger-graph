import React, { Component } from 'react';
import { FormField, Radio } from 'react-mdc-web/lib';

import Actions from '../Stores/Actions.js';

const FIELDS = [
    {
        fieldName: 'temperature',
        displayName: 'Temperature'
    },{
        fieldName: 'humidity',
        displayName: 'Humidity'
    },{
        fieldName: 'battery',
        displayName: 'Battery level'
    }
];

export default class FieldSelectorBar extends Component {
    handleOptionChange(changeEvent) {
        Actions.setFilterSelectedField(changeEvent.target.value);
    }

    render() {
        return (
            <div>
                Display:
                {
                    FIELDS.map((field) =>
                        <FormField id={'selectedField-' + field.fieldName} key={field.fieldName}>
                            <Radio name="selectedField" value={field.fieldName}
                                checked={this.props.filter.getSelectedField() === field.fieldName}
                                onChange={this.handleOptionChange} />
                            <label>{field.displayName}</label>
                        </FormField>
                    )
                }
            </div>
        );
    }
}
