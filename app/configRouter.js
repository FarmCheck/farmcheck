import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { WithAuthenticated, WithAdminFarm } from 'containers/Auth/components';

import LoginPage from 'containers/Auth/LoginPage/Loadable';
import FarmCreatePage from 'containers/Farm/CreatePage/Loadable';
import FarmListPage from 'containers/Farm/ListPage/Loadable';
import App from 'containers/App';
import AccountListPage from 'containers/Account/ListPage/Loadable';
import AccountDetailPage from 'containers/Account/DetailPage/Loadable';

const FarmCreatePageWithAuth = WithAuthenticated(FarmCreatePage);
const FarmListPageWithAuth = WithAuthenticated(FarmListPage);
const AppWithAuthAdminFarm = WithAuthenticated(WithAdminFarm(App));

const AccountListPageWithAuth = WithAuthenticated(AccountListPage);
const AccountDetailPageWithAuth = WithAuthenticated(AccountDetailPage);

const Router = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/farm/create" component={FarmCreatePageWithAuth} />
    <Route exact path="/farm/list" component={FarmListPageWithAuth} />
    <Route exact path="/account/list" component={AccountListPageWithAuth} />
    <Route exact path="/account/detail" component={AccountDetailPageWithAuth} />
    <Route path="/" component={AppWithAuthAdminFarm} />
  </Switch>
);

export default Router;
