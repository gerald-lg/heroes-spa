import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { HeroPage } from "../../../heroes/pages/HeroPage";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
    useParams: jest.fn(),
}));

describe('Pruebas en <HeroPage />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    
    test('Debe de mostrar el héroe según la ID de URL', () => {

        useParams.mockReturnValue({ id: 'marvel-spider' });

        render(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <HeroPage />
            </MemoryRouter>
        );

        expect(screen.getByText('Spider Man')).toBeTruthy(); 
    });

    test('Debe de mostrar el héroe según la ID de URL', () => {

        useParams.mockReturnValue({ id: 'unknown-hero' });

        render(
            <MemoryRouter initialEntries={['/hero/unknown-hero']}>
                <Routes>
                    <Route path="/hero/unknown-hero" element={
                        <HeroPage />
                    } />
                    <Route path="/marvel" element={ <h1>Hola desde Marvel</h1> } />
                </Routes>
            </MemoryRouter>
        );
        

        expect(screen.getByText('Hola desde Marvel')).toBeTruthy(); 
    });

    test('Debe de navegar hacia la pagina anterior cuando se presiona el botón back', () => { 

        useParams.mockReturnValue({ id: 'marvel-spider' });

        render(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <HeroPage />
            </MemoryRouter>
        );

            const btn = screen.getByRole('button');

            fireEvent.click(btn);

            expect(mockedUseNavigate).toHaveBeenCalledWith(-1, {});
    })

});
