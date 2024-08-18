import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { AuthContext } from "../../../auth/context/AuthContext";
import { Navbar } from "../../../partials";

const mockedUseNavigate = jest.fn();
//mock de libreria externa, con los mocks lo que se logra es sobreescribir el comportamiento de una funcion
jest.mock('react-router-dom', () => ({
    //lo que estamos haciendo aqui es decir que todas las funciones que contiene la libreria se comporten igual
    ...jest.requireActual('react-router-dom'),
    //y solo esta funcion se reemplaza su comportamiento
    useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en <Navbar />', () => {

    const contextValue = {
        state : {
            logged: true,
            user: {
                id: '123',
                name: 'Gerald'
            }
        },
        logout: jest.fn(),
    }

    beforeEach(() => jest.clearAllMocks());

    test('Debe de mostrar el nombre del usuario autenticado', () => {

        const { state: { user } } = contextValue;

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter >
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText( user.name, { selector: 'span' } ) ).toBeTruthy();
    });

    test('Al presionar el botón logout debe de navegar al login', () => {

        const { logout } = contextValue;

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter >
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        const btn = screen.getByText('Logout', { selector: 'button'});
        
        fireEvent.click(btn);
        
        expect( logout ).toHaveBeenCalled();
        expect( mockedUseNavigate ).toHaveBeenCalledWith("/login", { "replace": true });
    });
})
