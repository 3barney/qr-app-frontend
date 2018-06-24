import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducers';

const initialState = {};

const persistConfig = {
  key: 'root',
  storage,
};

const middleware = [
  thunk,
  logger,
];

const composedEnhancers = compose(applyMiddleware(...middleware));
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, initialState, composedEnhancers);
const persistor = persistStore(store);

export default { store, persistor };
