import React from 'react';
import { Elevation } from 'react-mdc-web/lib';

import FieldSelectorBar from './FieldSelectorBar.js';
import Grapher from './Grapher.js';
import GraphOverlay from './GraphOverlay.js';

import '../css/GraphArea.css';

export default function GraphArea(props) {
    return (
        <Elevation z={4} className="graph-area">
            <FieldSelectorBar {...props} />

            <Grapher {...props} />

            <GraphOverlay {...props} />
        </Elevation>
    );
}
