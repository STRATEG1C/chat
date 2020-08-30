import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Routing from './routing/router';
import { Provider } from 'mobx-react';
import { configure } from 'mobx';
import stores from './store/stores';
import Amplify from 'aws-amplify';
import awsExports from './aws-exports';
import { cognito } from './appConfig/aws';
import './asset/style/common.scss';

configure({ enforceActions: 'observed' });

Amplify.configure({
    ...awsExports,
    ...cognito
});

ReactDOM.render(
  <React.StrictMode>
      <Provider {...stores}>
          <Routing />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
