import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Categories = () => {
  const speciesList = ['', 'Human', 'Humanoid', 'Alien', 'Animal'];

  const characterList = useSelector((state) => state.characters);
  const categoryIndex = characterList[characterList.length - 1].category_index;
  console.log('categ i', categoryIndex);

  const SpeciesBreakdown = () => (
    <div>

      {characterList[categoryIndex].info.map((character) => (
        <div key={character.id}>
          <p>{character.name}</p>
          <img src={character.image} alt="" />
          <p>{character.status}</p>
          <p>{character.species}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <Link to="/">Back Home</Link>
      <p>Rick and Morty Characters</p>
      {speciesList[1]}
      {' '}
&nbsp;
      <p>species breakdown</p>
      <SpeciesBreakdown />
    </div>
  );
};

export default Categories;
