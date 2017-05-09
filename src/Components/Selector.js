import React from 'react';
import { Elevation } from 'react-mdc-web/lib';

import OptionBar from './OptionBar.js';
import SensorList from './SensorList.js';

export default function Selector(props) {
    var sensors = [{
        id: "GH001"
    },{
        id: "GH002"
    }];

    return (
        <Elevation z={4}>
            <OptionBar {...props} />

            <SensorList sensors={sensors} />
        </Elevation>
    );
}
