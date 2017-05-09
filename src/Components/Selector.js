import React from 'react';
import { Elevation } from 'react-mdc-web/lib';

import OptionBar from './OptionBar.js';
import SensorList from './SensorList.js';

export default function Selector(props) {
    return (
        <Elevation z={4}>
            <OptionBar {...props} />

            <SensorList {...props} />
        </Elevation>
    );
}
