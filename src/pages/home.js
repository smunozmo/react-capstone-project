import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCharacters, getByCategories } from '../redux/actioncreator';
import speciesList from '../components/specieslist';

const Home = () => {
  const dispatch = useDispatch();
  const speciesEndPoint = '?species=';

  useEffect(() => {
    const fetchCharacters = async () => {
      const url = 'https://rickandmortyapi.com/api/character/';
      const charactersData = [];
      let charactersFetch = [];

      // for (let i = 0; i < speciesList.length; i += 1) {
      //   if (i === 0) {
      //     charactersFetch = await fetch(`${url}${speciesList[i]}`);
      //   }
      //   charactersFetch = await fetch(`${url}${speciesEndPoint}${speciesList[i]}`);
      //   const speciesFetch = await charactersFetch.json();
      //   charactersData.push(speciesFetch);
      // }
      
      const getData = async (e) => {
        charactersFetch = await fetch(e);
        const speciesFetch = await charactersFetch.json();
        charactersData.push(speciesFetch);
        return charactersData;
      }

      // for (const iterator of speciesList) {
      //   if (iterator === '') {
      //     getData(`${url}${iterator}`);
      //   }
      //   charactersFetch = getData(`${url}${speciesEndPoint}${iterator}`);
      // }

      speciesList.map((e, i) => {
        if (i === 0) {
          getData(`${url}${e}`);
        }
        charactersFetch = getData(`${url}${speciesEndPoint}${e}`);
        return charactersData;
      });

      const ListCheck = () => {
        if (charactersData.length != 0) {
          clearInterval(getStoreData)
        } 
        dispatch(getCharacters(charactersData))
      }

      const getStoreData = setInterval(() => {ListCheck()}, 500);

      // if (charactersData.length != 0) {
      //   clearInterval(getStoreData)
      // }
      // setTimeout(clearInterval(getStoreData), 1000);
      return console.log('char', charactersData);;
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
