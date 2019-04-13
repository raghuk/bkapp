import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

// import { multiClientMiddleware } from 'redux-axios-middleware';
// import clients from './clients';

import rootReducer from './reducers';
import resetStore from './resetStore';
import { APP_RESET } from '../modules/app/store/constants';

const persistConfig = { key: 'root', storage };
const persistedReducer = persistReducer(persistConfig, rootReducer);


export default function configureStore() {
  const store = createStore(
    persistedReducer,
    compose(
      applyMiddleware(thunk, logger),
      resetStore(APP_RESET)
    )
  );

  const persistor = persistStore(store);

  return { store, persistor };
}
