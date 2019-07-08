import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import createHistory from 'history/createBrowserHistory';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import configureStore from './store';
import Login from './component/user-authentication/login';
import ForgotPassword from './component/user-authentication/forgot-password';
import SetPassword from './component/user-authentication/set-password';
import ContactUs from './component/user-authentication/contact-us';
import Dashboard from './component/dashboard';
import ManageUsers from './component/dashboard/manage-users';
import UserAuthentication from './component/user-authentication';
import AddGroup from './component/dashboard/manage-users/add-group';
import EditUser from './component/dashboard/manage-users/edit-user';
import AddUser from './component/dashboard/manage-users/add-user';
import ManageEnterprise from './component/dashboard/manage-enterprise';
import EditGroup from './component/dashboard/manage-users/edit-group';
import AddEnterprise from './component/dashboard/manage-enterprise/add-enterprise';
import EditEnterprise from './component/dashboard/manage-enterprise/edit-enterprise';
import UserProfile from './component/dashboard/user-profile';
import CrossTab from './component/crosstab';
import NotFound from './component/not-found';
import User from './utils/user';
import ReduxConnectedIntlProvider from './redux-connected-intl-provider';
import SurveyList from './component/survey/survey-list';
import UploadSurveyPopup from './component/survey/upload-survey-popup';

const history = createHistory();
const store = configureStore(history);
const { isAuthenticated } = new User();

addLocaleData([...en, ...fr]);

const Routes = () => (
  <Provider store={store}>
    <ReduxConnectedIntlProvider>
      <ConnectedRouter history={history}>
        <Switch>
          <ContactUs exact path="/contact-us" />
          <Route
            exact={false}
            path="/"
            render={() => (isAuthenticated() ? (
              <Switch>
                <CrossTab exact path="/cross-tab/:id?" />
                <Dashboard>
                  <Switch>
                    <Route exact component={AddEnterprise} path="/manage-users/add-enterprise" />
                    <Route exact component={EditEnterprise} path="/manage-users/edit-enterprise/:id?" />
                    <Route exact component={ManageEnterprise} path="/manage-users/manage-enterprise" />
                    <Route exact component={EditGroup} path="/manage-users/editgroup" />
                    <Route exact component={AddGroup} path="/manage-users/addgroup" />
                    <Route exact component={AddUser} path="/manage-users/adduser" />
                    <Route exact component={EditUser} path="/manage-users/edituser/:id?" />
                    <Route exact component={UserProfile} path="/manage-users/user-profile" />
                    <Route exact component={ManageUsers} path="/manage-users" />
                    <Route exact path="/upload-survey" render={() => <UploadSurveyPopup className="upload_page" />} />
                    <Route exact component={SurveyList} path="/" />
                    <Route component={NotFound} />
                  </Switch>
                </Dashboard>
              </Switch>
            ) : (
              <UserAuthentication>
                <Switch>
                  <Route exact component={ForgotPassword} path="/forgotpassword" />
                  <Route exact component={SetPassword} path="/setpassword:verification_code?:email?:type?" />
                  <Route exact component={Login} path="/" />
                  <Route component={NotFound} />
                </Switch>
              </UserAuthentication>
            ))
            }
          />
        </Switch>
      </ConnectedRouter>
    </ReduxConnectedIntlProvider>
  </Provider>
);

export default Routes;
