import React, {Component} from 'react';
import {Container} from 'flux/utils';

import App from './App.js';
import filterStore from './Stores/FilterStore.js';

class AppContainer extends Component {
  static getStores() {
    return [filterStore];
  }

  static calculateState(prevState) {
    return {
      filter: filterStore.getState(),
    };
  }

  render() {
    return <App filter={this.state.filter} />;
  }
}

export default Container.create(AppContainer);
