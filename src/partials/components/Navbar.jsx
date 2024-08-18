import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../auth/context/AuthContext';

export const Navbar = () => {

    const { state: { user }, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const onLogout = () => {
        
        logout();

        navigate('/login', {
            // el replace evita que la persona pueda regresar al historial de navegacion anterior
            // estamos reemplazando lo que habia
            replace: true,
        });
    }


    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Asociaciones</Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink
                                className={({isActive}) =>  `nav-link ${isActive ? 'active' : ''}`}
                                to="/marvel"
                            >
                                Marvel
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({isActive}) =>  `nav-link ${isActive ? 'active' : ''}`}
                                to="/dc"
                            >
                                DC
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({isActive}) =>  `nav-link ${isActive ? 'active' : ''}`}
                                to="/search"
                            >
                                Search
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="collapse navbar-collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                    <ul className="navbar-nav ml-auto">
                        <span className='nav-item nav-link text-info'> { user?.name } </span>

                        <button onClick={ onLogout } className='nav-item nav-link btn'>
                            Logout
                        </button>
                    </ul>
                </div>
            </div>
        </nav>
    )
}