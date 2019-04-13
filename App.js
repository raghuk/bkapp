/* eslint-disable global-require */
import React, { Component } from 'react';
import { AppLoading, Asset, Font, Icon } from 'expo';

import Main from './src';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false
    };
  }

  loadResourcesAsync = async () => (
    Promise.all([
      Asset.loadAsync([
        require('./assets/images/default-bg.png'),
        require('./assets/images/drawer-cover.png'),
        require('./assets/images/logo-cover.png'),
        require('./assets/images/pin.png'),
        require('./assets/images/splash.png'),
        require('./assets/images/statusbar.png'),
        require('./assets/images/steps/relaxation.png'),
        require('./assets/images/steps/concentration.png'),
        require('./assets/images/steps/contemplation.png'),
        require('./assets/images/steps/realisation.png'),
        require('./assets/images/steps/meditation.png')
      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        Opensans: require('./assets/fonts/Opensans.ttf'),
        Titillium: require('./assets/fonts/Titillium.ttf')
      })
    ])
  )

  handleLoadingError = (error) => {
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({ isReady: true });
  };

  render() {
    const { isReady } = this.state;

    if (!isReady) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }

    return <Main />;
  }
}

export default App;
