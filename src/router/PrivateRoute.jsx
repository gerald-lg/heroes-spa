import PropTypes from 'prop-types';

import { useContext } from "react"
import { AuthContext } from "../auth/context/AuthContext"
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {

  const { state: { logged } } = useContext(AuthContext);
  return (logged) 
  ? children : <Navigate to="/login" />
}

PrivateRoute.propTypes = {
    children: PropTypes.element.isRequired
}
  