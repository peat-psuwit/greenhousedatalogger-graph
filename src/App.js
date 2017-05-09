import React, { Component } from 'react';
import { Content } from 'react-mdc-web/lib';

import TitleBar from './Components/TitleBar.js'
import Selector from './Components/Selector.js'

import './App.css';

class App extends Component {
  render() {
    return (
        <div>
          <TitleBar />

          <Content className="page-wrapper">
            <Selector {...this.props} />
          </Content>
      </div>
    );
  }
}

export default App;
