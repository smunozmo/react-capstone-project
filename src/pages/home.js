import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCharacters, getByCategories } from '../redux/actioncreator';
import FetchSpecies from '../components/specieslist';

const GetSpeciesList = async () => {
  const getList = await FetchSpecies('?');
  return getList;
};

// console.log('list', CreateSpeciesList());

const Home = () => {
  GetSpeciesList().then((res) => console.log(res));
  const dispatch = useDispatch();
  const speciesEndPoint = '?species=';
  const speciesList = ["Human", "Alien", "Humanoid", "unknown", "Poopybutthole", "Mythological Creature", "Animal", "Robot", "Cronenberg", "Disease", "Planet"];

  useEffect(() => {
    const fetchCharacters = async () => {
      const url = 'https://rickandmortyapi.com/api/character/';
      const charactersData = [];
      let charactersFetch = [];
      for (let i = 0; i < speciesList.length; i++) {
        if (i === 0) {
          charactersFetch = await fetch(`${url}${speciesList[i]}`);
        }
        charactersFetch = await fetch(`${url}${speciesEndPoint}${speciesList[i]}`);
        const speciesFetch = await charactersFetch.json();
        charactersData.push(speciesFetch);
      }

      return dispatch(getCharacters(charactersData));
    };
    fetchCharacters();
  }, []);

  const characterList = useSelector((state) => state.characters);

  const loader = (
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );

  const CurrentCategory = (e) => (dispatch(getByCategories(e.target.id)));

  const StatsBySpecies = () => (
    <div className="row">
      {characterList.map((character, i) => {
        if (i > 0) {
          return (
            <div className="col-6">
              <Link to="categories" key={i}>
                <button type="button" onClick={CurrentCategory} id={i} className="btn btn-outline-danger text-nowrap">{speciesList[i]}</button>
                {' '}
              </Link>

              <p>{characterList.length ? character.total_count : loader}</p>

            </div>

          );
        }
      })}
    </div>
  );

  return (
    <div>
      <p>Rick and Morty Characters</p>
      Total characters: &nbsp;
      {characterList.length ? characterList[0].total_count : loader}
      <p>stats by species</p>

      <StatsBySpecies />
    </div>
  );
};

export default Home;
