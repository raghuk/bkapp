import React, {Component} from 'react';
import {AppLoading, Asset, Font} from 'expo';
import {Ionicons} from '@expo/vector-icons';

import Main from './src';


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isReady: false
        };
    }

    _cacheFonts(fonts) {
        return fonts.map(font => Font.loadAsync(font));
    }

    _loadAssetsAsync = async () => {
        const fontAssets = this._cacheFonts([Ionicons.font, {'Opensans': require('./assets/fonts/Opensans.ttf') }]);

        const imageAssets = Asset.loadAsync([
            require('./assets/images/default-bg.png'),
            require('./assets/images/drawer-cover.png'),
            require('./assets/images/logo-cover.png'),
            require('./assets/images/pin.png'),
            require('./assets/images/splash.png')
        ]);

        await Promise.all([imageAssets, ...fontAssets]);
    };

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={(error) => console.warn(error)} />
            );
        }

        return <Main />;
    }
}
