/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
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
        return charactersData;
      };

      speciesList.map((e, i) => {
        if (i === 0) {
          getData(`${url}${e}`);
        }
        getData(`${url}${speciesEndPoint}${e}`);

        return charactersData;
      });

      const ListCheck = () => {
        if (Number(charactersData[0].info.count) === 671) {
          clearInterval(getStoreData);
        }
        dispatch(getCharacters(charactersData));
      };

      const getStoreData = setInterval(() => { ListCheck(); }, 2000);

      return charactersData;
    };
    fetchCharacters();
  }, []);

  const characterList = useSelector((state) => state.characters);

  const loader = (
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );

  const loading = (
    <div className="text-center fs-3 bg-info mt-5 p-3">
      Fetching data from outer space . . .
    </div>
  );

  const CurrentCategory = (e) => (dispatch(getByCategories(e.target.id)));

  const StatsBySpecies = () => (
    <div className="row px-0 overflow-hidden">
      {characterList.map((character, i) => {
        if (i > 0) {
          return (
            <div className="col-6 py-5 text-end" key={nanoid()} style={{ backgroundImage: `url(${characterList[i].info[0].image})`, backgroundSize: 'cover' }}>
              <Link to={speciesList[i]}>
                <button type="button" onClick={CurrentCategory} id={i} className="btn btn-info button text-end">{speciesList[i]}</button>
              </Link>
              <p><span className="fs-3 bg-info p-1 shadow-lg">{character.total_count}</span></p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );

  return (
    <div className="appcontainer rounded border border-3 border-secondary shadow">
      <p className="text-center p-2">Rick and Morty Characters App</p>
      <div className="row py-5">
        <div className="col-6" />
        <div className="col-6">
          <p className="mainStat"><span className="bg-info p-1">Total characters: &nbsp;</span></p>
          {characterList.length ? <p><span className="fs-3 bg-info p-1">{characterList[0].total_count}</span></p> : loader}
        </div>
      </div>
      <p><span className="shadow bg-info p-1">stats by species</span></p>
      {characterList.length ? <StatsBySpecies /> : loading}
    </div>
  );
};

export default Home;
