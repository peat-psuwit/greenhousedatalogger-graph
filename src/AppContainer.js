import React, {Component} from 'react';
import {Container} from 'flux/utils';

import App from './App.js';

import filterStore from './Stores/FilterStore.js';
import sensorStore from './Stores/SensorStore.js';

class AppContainer extends Component {
  static getStores() {
    return [filterStore, sensorStore];
  }

  static calculateState(prevState) {
    return {
      filter: filterStore.getState(),
      sensors: sensorStore.getState(),
    };
  }

  render() {
    return <App
                filter={this.state.filter}
                sensors={this.state.sensors}
            />;
  }
}

export default Container.create(AppContainer);
