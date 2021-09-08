import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import speciesList from '../components/specieslist';

const Categories = () => {
  const characterList = useSelector((state) => state.characters);
  const categoryIndex = characterList[characterList.length - 1].category_index;

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
      <p>{speciesList[categoryIndex]}</p>
      {' '}
&nbsp;
      <p>species breakdown</p>
      <SpeciesBreakdown />
    </div>
  );
};

export default Categories;
