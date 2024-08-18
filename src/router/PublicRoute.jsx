import PropTypes from 'prop-types'; 
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../auth/context/AuthContext';

export const PublicRoute = ({ children }) => {
    const { state: { logged } } = useContext(AuthContext);
    
    return (!logged) 
    ? children : <Navigate to="/" />
}

PublicRoute.propTypes = {
    children: PropTypes.element.isRequired
}