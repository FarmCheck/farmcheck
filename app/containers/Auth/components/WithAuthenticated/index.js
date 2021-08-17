import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { refreshAccessTokenForUser } from 'containers/Auth/authSlice';

const WithAuthenticated = WrappedComponent =>
  function HOC(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth.user);

    const handleSilentRefreshToken = async () => {
      try {
        const actionResult = await dispatch(refreshAccessTokenForUser());

        unwrapResult(actionResult);
      } catch (error) {
        history.push('/login');
      }
    };

    useEffect(() => {
      if (auth.isLogout) {
        history.push('/login');
      }

      if (!auth.isAuthenticated && !auth.isLogout) {
        handleSilentRefreshToken();
      }

      // Refresh silent per 10 minutes
      const intervalRefreshToken = setInterval(
        handleSilentRefreshToken,
        1000 * 60 * 10,
      );

      return () => {
        clearInterval(intervalRefreshToken);
      };
    }, [auth.isAuthenticated]);

    return <>{auth.isAuthenticated ? <WrappedComponent {...props} /> : null}</>;
  };

export default WithAuthenticated;
