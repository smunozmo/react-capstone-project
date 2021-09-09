import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import speciesList from '../components/specieslist';
import { clearList } from '../redux/actioncreator';

const Categories = () => {
  const characterList = useSelector((state) => state.characters);
  const categoryIndex = characterList[characterList.length - 1].category_index;

  const SpeciesBreakdown = () => (
    <div className="row">
      {characterList[categoryIndex].info.map((character) => (
        <div className="row species mb-1" key={character.id}>
          <div className="col-4">
            <img src={character.image} className="avatar ms-2 mt-3" alt="" />
          </div>
          <div className="col-8 text-end">
            <p className="fs-1">{character.name}</p>
            <p>
              status:&nbsp;
              {character.status}
            </p>
            <p>{character.species}</p>
          </div>
        </div>
      ))}
    </div>
  );
  
  const dispatch = useDispatch();
  const ClearList = () => (dispatch(clearList()));

  return (
    <div className="container p-0">
      <p className="p-2">
        <Link to="/">
          <button type="button" onClick={ClearList} className="btn btn-info backbutton text-end">&lt; Back Home</button>
        </Link></p>
      <div className="row py-5">
        <div className="col-6" />
        <div className="col-6 text-end pe-5">
          <p className="mainStat"><span className="bg-info p-1">{speciesList[categoryIndex]}</span></p>
          <p><span className="fs-3 bg-info p-1">{characterList[categoryIndex].total_count}</span></p>
        </div>
      </div>
      <p><span className="shadow bg-info p-1 m-1">species breakdown</span></p>
      <SpeciesBreakdown />
    </div>
  );
};

export default Categories;
