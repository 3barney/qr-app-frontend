import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import CssBaseline from '@material-ui/core/CssBaseline';
import { PersistGate } from 'redux-persist/integration/react';

import Routes from './route/routes';
import registerServiceWorker from './registerServiceWorker';


import store from './store';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
});

// TODO: In loading indicator add spinner for not null

const app = (
  <Provider store={store.store}>
    <PersistGate loading={null} persistor={store.persistor}>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </MuiThemeProvider>
    </PersistGate>
  </Provider>
);


ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
