const { render, screen } = require("@testing-library/react");
const { AuthContext } = require("../../auth/context/AuthContext");
const { PublicRoute } = require("../../router/PublicRoute");
const { MemoryRouter, Routes, Route } = require("react-router-dom");

describe('Pruebas en <PublicRoute />', () => {
  
    test('Debe de mostrar el children si no está autenticado', () => {

        const contextValue = {
            state : {
                logged: false
            }
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <PublicRoute>
                    <h1>Ruta pública</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Ruta pública', { selector: 'h1' })).toBeTruthy();
    });

    test('Debe de navegar si está autenticado', () => {
        
        const contextValue = {
            state : {
                logged: true,
                user: {
                    id: 'ABC123',
                    name: 'Harrinson'
                }
            }
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path="login" element={
                            <PublicRoute>
                                <h1>Ruta pública</h1>
                            </PublicRoute>
                        } />
                        <Route path="/" element={ <h1>Hola desde Marvel</h1> } />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Hola desde Marvel', { selector: 'h1' })).toBeTruthy();

    });
    


})
