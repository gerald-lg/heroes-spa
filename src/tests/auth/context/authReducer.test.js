import { authReducer } from "../../../auth/context/authReducer";
import { types } from "../../../auth/types/types";

describe('Pruebas en el authReducer', () => {
    
    const initialState = {
        logged: false,
        user: null,
    };

    const user = {
        id: 'ABC',
        name: 'Gerald Lopez'
    }
    
    test('Debe mostrar el estado inicial', () => {
        const newState = authReducer(initialState, {});

        expect(newState).toBe(initialState);
    });

    test('Debe de llamar al login, autenticar y establecer el usuario', () => {
        
        const action = {
            type: types.login,
            payload: user,
        }
    
        const newState = authReducer(initialState, action);
        
        expect(newState.user).not.toBeNull();
        expect(newState.logged).toBeTruthy();

        const { user: { name } } = newState;
        
        expect(name).toBe(user.name);

    });

    test('Debe de llamar al logout, borrar el name del usuario y logged', () => {
        
        const initialState = {
            logged: false,
            user,
        };

        const action = {
            type: types.logout,
        }
    

        const newState = authReducer(initialState, action);
        
        expect(newState.user).toBeUndefined();
        expect(newState.logged).toBeFalsy();

    });



    

});