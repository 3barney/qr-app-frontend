import * as packageJSON from '../../package.json';

const initialState = {
  apiUrl: 'http://localhost:3033',
  appVersion: packageJSON.version,
  appName: packageJSON.name,
};

const appReducer = (state = initialState, action) => {
  switch (action.types) {
    default:
      return state;
  }
};

export default appReducer;
