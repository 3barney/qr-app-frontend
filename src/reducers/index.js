import { combineReducers } from 'redux';

import appReducer from './app';
import authReducer from './auth';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
});

export default rootReducer;
