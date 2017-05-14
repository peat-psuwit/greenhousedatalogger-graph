import React, {Component} from 'react';
import {Container} from 'flux/utils';

import App from './App.js';

import filterStore from './Stores/FilterStore.js';
import sensorStore from './Stores/SensorStore.js';
import sensorDataStore from './Stores/SensorDataStore.js';

class AppContainer extends Component {
  static getStores() {
    return [filterStore, sensorStore, sensorDataStore];
  }

  static calculateState(prevState) {
    return {
      filter: filterStore.getState(),
      sensors: sensorStore.getState(),
      sensorData: sensorDataStore.getState(),
    };
  }

  render() {
    return <App
                filter={this.state.filter}
                sensors={this.state.sensors}
                sensorData={this.state.sensorData}
            />;
  }
}

export default Container.create(AppContainer);
