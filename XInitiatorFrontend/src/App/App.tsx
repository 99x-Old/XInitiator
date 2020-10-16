import React, { useEffect } from 'react';
import './App.css';
import { GetRoutes } from './Routes';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from '../components/common/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserValid, getUserByEmail } from '../store/user/userActions';
import InitialRegistration from '../components/User/InitialRegistration';
import NotAuthorized from '../components/User/NotAuthorized';
import { hasAccess } from '../Auth/AccessControl';
import InfoDialog from '../components/common/InfoDialog';
import { authProvider } from '../Auth/AuthProvider';
import store from '../store/store';
import AzureAD from 'react-aad-msal';

function App() {
  const userAccount = useSelector((state: any) => state.auth.account);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: any) => state.user.isValidUser);
  const userRole = useSelector((state: any) => state.user.user.role);

  useEffect(() => {
    if (userAccount) {
      dispatch(checkUserValid(userAccount.userName));
      dispatch(getUserByEmail(userAccount.userName));
    }
  }, [userAccount, dispatch])
  return (<Router>
    <NavBar />
    <AzureAD provider={authProvider} reduxStore={store}>
      <Switch>
        {GetRoutes().map(route => (
          <Route
            key={route.path || 'nopath'}
            path={route.path}
            exact={route.exact}
            component={isAuthenticated ? (hasAccess(route.accessLevel, userRole) ? route.component : NotAuthorized) : InitialRegistration} />
        ))}
      </Switch>
    </AzureAD>
    <InfoDialog />
  </Router>
  );
}

export default App;
