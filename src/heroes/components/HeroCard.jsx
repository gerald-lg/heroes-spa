import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../HeroCard.css';

export const HeroCard = (
    { 
        id, 
        superhero, 
        publisher, 
        alter_ego, 
        first_appearance, 
        characters 
    }) => {

    const heroImageUrl = `/assets/heroes/${ id }.jpg`
    return (
        <Link to={`/hero/${id}`} className="my-card">
            <img src={ heroImageUrl } className="img img-responsive" alt={superhero}/>
            <div className="profile-name">{superhero}</div>
            <div className="profile-position">{alter_ego}</div>
            <div className="profile-overview">
                <div className="profile-overview">
                    <div className="row">
                        <div className="col-ms-4">
                            <h3>{publisher}</h3>
                            <p>Primera aparición: <br />{first_appearance}</p>
                            {
                                (alter_ego !== characters)
                                && <p>{characters}</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

HeroCard.propTypes = {
    id: PropTypes.string.isRequired,
    superhero: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    alter_ego: PropTypes.string.isRequired,
    first_appearance: PropTypes.string.isRequired,
    characters: PropTypes.string.isRequired,
}