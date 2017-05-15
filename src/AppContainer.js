import React, {Component} from 'react';
import {Container} from 'flux/utils';

import App from './App.js';

import filterStore from './Stores/FilterStore.js';
import sensorStore from './Stores/SensorStore.js';
import sensorDataStore from './Stores/SensorDataStore.js';
import sensorDataRangeStore from './Stores/SensorDataRangeStore.js';

class AppContainer extends Component {
  static getStores() {
    return [filterStore, sensorStore, sensorDataStore, sensorDataRangeStore];
  }

  static calculateState(prevState) {
    return {
      filter: filterStore.getState(),
      sensors: sensorStore.getState(),
      sensorData: sensorDataStore.getState(),
      sensorDataRangeStore: sensorDataRangeStore.getState(),
    };
  }

  render() {
    return <App
                filter={this.state.filter}
                sensors={this.state.sensors}
                sensorData={this.state.sensorData}
                sensorDataRangeStore={this.state.sensorDataRangeStore}
            />;
  }
}

export default Container.create(AppContainer);
