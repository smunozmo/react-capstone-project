import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCharacters } from '../redux/actioncreator';

const Home = () => {
  const dispatch = useDispatch();
  const speciesEndPoint = '?species=';
  const speciesList = ['', 'Human', 'Humanoid', 'Alien', 'Animal'];

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
        console.log(charactersData);
      }

      return dispatch(getCharacters(charactersData));
    };
    fetchCharacters();
  }, []);

  const characterList = useSelector((state) => state.characters);
  console.log('char list', characterList);

  const loader = (
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );

  return (
    <div>
      <p>Rick and Morty Characters</p>
      Total characters: &nbsp;
      {characterList.length ? characterList[0].total_count : loader}
      <p>stats by species</p>
      <div className="row">
        <div className="col-6">
          {speciesList[1]}
&nbsp;
          {characterList.length ? characterList[1].total_count : loader}
        </div>
        <div className="col-6">
          {speciesList[2]}
&nbsp;
          {characterList.length ? characterList[2].total_count : loader}
        </div>
        <div className="col-6">
          {speciesList[3]}
&nbsp;
          {characterList.length ? characterList[3].total_count : loader}
        </div>
        <div className="col-6">
          {speciesList[4]}
&nbsp;
          {characterList.length ? characterList[4].total_count : loader}
        </div>
      </div>
    </div>
  );
};

export default Home;
