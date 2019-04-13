import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './redux';
import Setup from './setup';


const { store, persistor } = configureStore();

const Main = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Setup />
    </PersistGate>
  </Provider>
);

export default Main;
