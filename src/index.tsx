import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';
import CssBaseline from '@material-ui/core/CssBaseline';
import Apollo from './components/Apollo';
import Auth from './components/Auth';
import Firebase from './components/Firebase';
import Notification from './components/Notification';
import Theme from './components/Theme';
import App from './components/App';

ReactDOM.render(
  <CssBaseline>
    <Theme>
      <Apollo>
        <Firebase>
          <Auth>
            <Notification>
              <Helmet
                titleTemplate="%s | OMSCentral"
                defaultTitle="OMSCentral"
              />
              <App />
            </Notification>
          </Auth>
        </Firebase>
      </Apollo>
    </Theme>
  </CssBaseline>,
  document.getElementById('root')
);
