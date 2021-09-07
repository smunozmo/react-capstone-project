import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Categories = () => {
//   const dispatch = useDispatch();
  const speciesList = ['', 'Human', 'Humanoid', 'Alien', 'Animal'];

  const characterList = useSelector((state) => state.characters);
  console.log('categ list', characterList);

  const SpeciesBreakdown = () => (
    <div>
      {/* {characterList[0].info[0].name}  */}
      {characterList[0].info.map((character) => {
          return (

        <div key={character.id}>
          <p>{character.name}</p>
          <img src={character.image} alt="" />
          <p>{character.status}</p>
          {console.log('names', character.name)}
        </div>
          )
      })}
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
