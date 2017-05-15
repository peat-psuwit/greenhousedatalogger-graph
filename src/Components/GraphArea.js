import React from 'react';
import { Elevation } from 'react-mdc-web/lib';

import FieldSelectorBar from './FieldSelectorBar.js';
import Grapher from './Grapher.js';

export default function GraphArea(props) {
    return (
        <Elevation z={4}>
            <FieldSelectorBar {...props} />

            <Grapher {...props} />
        </Elevation>
    );
}
