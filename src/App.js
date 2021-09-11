import React, { useEffect } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import Home from './pages/home';
import Categories from './pages/categories';
import speciesList from './components/specieslist';
import { stateGet } from './redux/actioncreator';

let categoryIndex = 0;

const App = () => {
  const characterList = useSelector((state) => state.characters);
  if (characterList.length !== 0) {
    categoryIndex = characterList[characterList.length - 1].category_index;
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(stateGet());
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path={`/${speciesList[categoryIndex]}`}>
          <Categories />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
