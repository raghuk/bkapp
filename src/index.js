import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import Setup from './Setup';

import configureStore from './helpers/configureStore';
import ApiClient from './helpers/apiClient';
import AppSdkFactory from './helpers/sdk';

const client = new ApiClient();
const sdkFactory = new AppSdkFactory(client);
const appSdk = sdkFactory.buildSdk(2);

const {store, persistor} = configureStore(appSdk, client);


const Main = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Setup/>
        </PersistGate>
    </Provider>
);

export default Main;
