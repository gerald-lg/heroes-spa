import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../auth/context/AuthContext";
import { PrivateRoute } from "../../router/PrivateRoute";
import { MemoryRouter } from "react-router-dom";

describe('Pruebas en <PrivateRoute />', () => {

    test('debe de mostrar el children si esta autenticado', () => {
        
        const contextValue = {
            state : {
                logged: true,
                user: {
                    id: 'ABC123',
                    name: 'Darwin'
                }
            }
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect( screen.getByText('Ruta privada', { selector: 'h1' })).toBeTruthy();
    })
    
});