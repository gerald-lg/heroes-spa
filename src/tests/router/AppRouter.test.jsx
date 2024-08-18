import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";
import { render, screen } from "@testing-library/react";
import { AppRouter } from "../../router/AppRouter";

describe('Pruebas en <AppRouter />', () => {

  test('debe de mostrar el componente Login si no está autenticado', () => {
     
    const contextValue = {
            state : {
                logged: false,
            }
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/']}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect( screen.getByText('LoginPage', { selector: 'h1' })).toBeTruthy();
  });

  test('debe de mostrar el componente Marvel si está autenticado', () => {
     
        const contextValue = {
            state : {
                logged: true,
                user: {
                    id: '123',
                    name: 'Gerald'
                }
            }
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/login']}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText( 'Gerald' , { selector: 'span' })).toBeTruthy();
        expect( screen.getByText( 'Marvel Comics' , { selector: 'h1' })).toBeTruthy();
        expect( screen.getAllByText( 'Marvel').length).toBeGreaterThanOrEqual(1);

  });
  
})
