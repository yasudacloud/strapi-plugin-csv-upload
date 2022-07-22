/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {NotFound} from '@strapi/helper-plugin';
import {Provider} from 'react-redux';
import pluginId from '../../pluginId';
import HomePage from '../HomePage';
import store from '../../state/store'

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Switch>
          <Route path={`/plugins/${pluginId}`} component={HomePage} exact/>
          <Route component={NotFound}/>
        </Switch>
      </Provider>
    </div>
  );
};

export default App;
