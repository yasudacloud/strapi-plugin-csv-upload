/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import {CheckPermissions, NotFound} from '@strapi/helper-plugin';
import {Switch, Route} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {Provider} from 'react-redux';
import pluginId from '../../pluginId';
import HomePage from '../HomePage';
import store from '../../state/store'
import AlertDialog from "../../components/AlertDialog";

const App = () => {
  return (
    <CheckPermissions permissions={[{action: 'plugin::strapi-plugin-csv-upload.read', subject: null}]}>
      <div>
        <Provider store={store}>
          <Helmet title={'CSV Upload'}/>
          <Switch>
            <Route path={`/plugins/${pluginId}`} component={HomePage} exact/>
            <Route component={NotFound}/>
          </Switch>
          <AlertDialog/>
        </Provider>
      </div>
    </CheckPermissions>
  );
};

export default App;
