import {combineReducers} from 'redux';

import app from './app';
import auth from './auth';
import search from './search';


export default combineReducers({
    app,
    auth,
    search
});
