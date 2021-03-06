import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import speciesList from '../components/specieslist';
import { clearList } from '../redux/actioncreator';

const Categories = () => {
  const characterList = useSelector((state) => state.characters);
  const categoryIndex = characterList[characterList.length - 1].category_index;

  const SpeciesBreakdown = () => (
    <div className="row speciescontainer">
      {characterList[categoryIndex].info.map((character) => (
        <div className="row species mb-1 status" key={character.id} id={character.status}>
          <div className="col-4">
            <img src={character.image} className="avatar img-thumbnail mt-3" alt="" />
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

  const FilterStatus = (e) => {
    const filterByStatus = document.querySelectorAll('.status');
    filterByStatus.forEach((element) => {
      if (e.target.id !== element.id) {
        element.classList.add('filtered');
      } else if (e.target.id === element.id) {
        element.classList.remove('filtered');
      }
    });
  };

  return (
    <div className="appcontainer p-0 rounded border border-3 border-secondary shadow">
      <p className="p-2">
        <Link to="/">
          <button type="button" onClick={ClearList} className="btn btn-info backbutton text-end">&lt; Back Home</button>
        </Link>
      </p>
      <div className="row py-5">
        <div className="col-6" />
        <div className="col-6 text-end pe-5">
          <p className="mainStat"><span className="bg-info p-1">{speciesList[categoryIndex]}</span></p>
          <p><span className="fs-3 bg-info p-1">{characterList[categoryIndex].total_count}</span></p>
        </div>
      </div>
      <div className="row">
        <div className="col-5">
          <p><span className="shadow bg-info p-1 m-1">species breakdown</span></p>
        </div>
        <div className="col-7 text-end">
          <p>
            <span className="bg-info p-1">
              Filter by:
              <button type="button" onClick={FilterStatus} id="Alive" className="btn btn-info backbutton text-end">&nbsp; Alive &nbsp;</button>
              |
              <button type="button" onClick={FilterStatus} id="Dead" className="btn btn-info backbutton text-end">&nbsp; Dead &nbsp;</button>
              |
              <button type="button" onClick={FilterStatus} id="unknown" className="btn btn-info backbutton text-end">&nbsp; Unknown &nbsp;</button>
            </span>
          </p>
        </div>
      </div>
      <SpeciesBreakdown />
    </div>
  );
};

export default Categories;
