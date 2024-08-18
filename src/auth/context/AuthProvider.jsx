import PropTypes from 'prop-types';
import { useReducer } from 'react';

import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import { types } from '../types/types';

const init = () => {
  const user = JSON.parse( localStorage.getItem('user') );
  return {
    logged: !!user,
    user,
  }
}

export const AuthProvider = ({ children }) => {

  const  [ state, dispatch ] = useReducer(authReducer, {} , init);

  const onLogin = (name = '') => {

    const user = {id: 'ABC', name}
    const action = {
      type: types.login,
      payload: user
    }

    localStorage.setItem('user', JSON.stringify( user ));
    dispatch(action);
  }

  const onLogout = () => {

    const action = {
      type: types.logout,
    }

    localStorage.removeItem('user');
    dispatch(action);
  }
  
  
  return (
    <AuthContext.Provider value={{
      ...state, 
      state,
      login: onLogin,
      logout: onLogout
     }}>
        { children }
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired
}
