import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCharacters } from '../redux/actioncreator';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCharacters = async () => {
      const url = 'https://rickandmortyapi.com/api/character/?species=human';
      const charactersFetch = await fetch(url);
      const charactersData = await charactersFetch.json();
      return dispatch(getCharacters(charactersData));
    };
    fetchCharacters();
  }, []);

  const characterList = useSelector((state) => state.characters);
  console.log(characterList);
  
  const Species = () => (
    <div className="col-6">
      {characterList[0].total_count}
    </div>
  );

  return (
    <div>
      <p>Rick and Morty Characters</p>
      <p>stats by species</p>
      <div className="row">
        <Species />
      </div>
    </div>
  );
};

export default Home;
