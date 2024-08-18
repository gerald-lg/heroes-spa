import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { SearchHeroPage } from "../../../heroes/pages/SearchHeroPage";

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas sobre <SearchHeroPage />', () => {

    beforeEach(() => jest.clearAllMocks());

    test('debe de mostrarse correctamente con valores por defecto', () => {

        const { container } = render(
            <MemoryRouter>
                <SearchHeroPage />
            </MemoryRouter>

        );

        expect(container).toMatchSnapshot();
    });

    test('debe de mostrar a Batman y el input con el valor del queryString', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchHeroPage />
            </MemoryRouter>

        );

        const inputValue = screen.getByRole('textbox');

        const img = screen.getByRole('img');

        expect( inputValue.value ).toBe('batman');
        expect( img.alt ).toBe('Batman');
        expect( img.src.includes('batman') ).toBeTruthy();


    });

    test('debe de mostrar un error si no se encuentra el hero', () => {
        
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchHeroPage />
            </MemoryRouter>

        );

        const noHeroDiv = screen.getByLabelText('alert-danger');
        expect(noHeroDiv.innerHTML).toBe('No hero with <b>batman123</b>');
    });

    test('debe de llamar el navigate a la pantalla nueva', () => {

        render(
            <MemoryRouter>
                <SearchHeroPage />
            </MemoryRouter>

        );

        const textBox = screen.getByRole('textbox');
        const form = screen.getByRole('form');
        
        fireEvent.input(textBox, { target: {value: 'superman'} });
        fireEvent.submit(form);
       
        expect( mockedUseNavigate ).toHaveBeenCalledWith(`?q=superman`);
    });
})