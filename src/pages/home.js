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

      const getData = async (e) => {
        charactersFetch = await fetch(e);
        const speciesFetch = await charactersFetch.json();
        charactersData.push(speciesFetch);
        console.log('ch', charactersData);
        return charactersData;
      };

      speciesList.map((e, i) => {
        if (i === 0) {
          getData(`${url}${e}`);
        }
        getData(`${url}${speciesEndPoint}${e}`);

        console.log('char i', i);
        return charactersData;
      });

      const ListCheck = () => {
        if (charactersData.length != 0) {
          clearInterval(getStoreData);
        }
        dispatch(getCharacters(charactersData));
      };

      const getStoreData = setInterval(() => { ListCheck(); }, 1500);

      return console.log('char', charactersData);
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
            <div className="col-6 py-5 text-end" style={{ backgroundImage: `url(${characterList[i].info[0].image})`, backgroundSize: 'cover'}}>
              <Link to="categories" key={i}>
                <button type="button" onClick={CurrentCategory} id={i} className="btn btn-info text-nowrap button">{speciesList[i]}</button>
                {' '}
              </Link>
              <p><span className="fs-3 bg-info p-1 shadow-lg">{characterList.length ? character.total_count : loader}</span></p>

            </div>

          );
        }
      })}
    </div>
  );

  return (
    <div className="container">
      <p className="text-center p-2">Rick and Morty Characters</p>
      <div className="row py-5">
        <div className="col-6" />
        <div className="col-6">
          <p className="mainStat"><span className="bg-info p-1">Total characters: &nbsp;</span></p>
          <p><span className="fs-3 bg-info p-1">{characterList.length ? characterList[0].total_count : loader}</span></p>
        </div>
      </div>
      <p><span className="shadow bg-info p-1">stats by species</span></p>
      <StatsBySpecies />
    </div>
  );
};

export default Home;
