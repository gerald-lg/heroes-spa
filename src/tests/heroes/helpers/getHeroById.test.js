import { getHeroById } from "../../../heroes/helpers";

describe('Pruebas en la function getHeroById', () => {

    test('Debe de devolver un heroe segun el id', () => {

        const heroDesc = {
            'id': 'dc-batman',
            'superhero':'Batman', 
            'publisher':'DC Comics', 
            'alter_ego':'Bruce Wayne',
            'first_appearance':'Detective Comics #27',
            'characters':'Bruce Wayne'
        };

        const hero = getHeroById('dc-batman');

        expect(hero).toEqual(heroDesc);

    });

    test('Debe de devolver undefined si es que no lo encuentra', () => {

        const hero = getHeroById('dc-batman231');
        
        expect(hero).toBeUndefined();

    });

})