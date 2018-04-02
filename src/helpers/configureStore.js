import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'remote-redux-devtools';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import promise from './promise';
import resetStore from './resetStore';

import {APP_RESET} from '../actions/actionTypes';

const __DEV__ = (process.env.NODE_ENV !== 'production');

const persistConfig = {key: 'root', storage};
const persistedReducer = persistReducer(persistConfig, require('../reducers').default);


export default function configureStore(sdk, client) {
    let finalCreateStore;

    if (__DEV__) {
        finalCreateStore = composeWithDevTools(
            applyMiddleware(thunk, promise(sdk, client)),
            resetStore(APP_RESET)
        )(createStore);
    } else {
        finalCreateStore = compose(
            applyMiddleware(thunk, promise(sdk, client)),
            resetStore(APP_RESET)
        )(createStore);
    }

    let store = finalCreateStore(persistedReducer);
    let persistor = persistStore(store)

    return { store, persistor };
}
