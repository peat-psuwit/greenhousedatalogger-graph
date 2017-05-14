import React from 'react';
import { Elevation } from 'react-mdc-web/lib';

import Grapher from './Grapher.js';

export default function GraphArea(props) {
    return (
        <Elevation z={4}>
            {/* TODO: FieldSelectorBar */}

            <Grapher {...props} />
        </Elevation>
    );
}
