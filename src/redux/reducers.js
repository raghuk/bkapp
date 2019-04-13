import { combineReducers } from 'redux';

import { reducer as app } from '../modules/app';
import { reducer as search } from '../modules/search';


export default combineReducers({
  app,
  search
});
