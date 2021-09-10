/* eslint-disable no-unused-vars */
import React from 'react';
import { createStore } from 'redux';
import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import Categories from '../pages/categories';
import apiresponse from '../__mocks__/api';

afterEach(cleanup);

const startingState = apiresponse;

const reducer = (state = startingState, action) => {
  switch (action.type) {
    case 'GET_ALL_CHARACTERS': {
      const newState = Object.keys(action.payload).map((key) => ({
        total_count: action.payload[key].info.count,
        info: action.payload[key].results,
      }));
      newState.shift();
      return newState;
    }
    case 'GET_BY_CATEGORIES': {
      const newState = {
        category_index: action.payload,
      };
      return [...state, newState];
    }
    case 'GET_ALL_SPECIES': {
      const newState = {
        species_list: action.payload,
      };
      return [...state, newState];
    }
    case 'CLEAR_LIST': {
      return [];
    }
    default:
      return state;
  }
};

function renderWithRedux(
  component,
  { initialState, store = createStore(reducer, initialState) } = {},
) {
  return {
    ...render(<Provider store={store}><BrowserRouter>{component}</BrowserRouter></Provider>),
  };
}

it('Renders with Redux', () => {
  const { getByText } = renderWithRedux(<Categories />);
});

it('Renders "species breakdown" text', () => {
  const { getByText } = renderWithRedux(<Categories />);
  expect(screen.getByText('species breakdown')).toBeInTheDocument();
});

it('Renders data from state', () => {
  const { getByText } = renderWithRedux(<Categories />);
  expect(screen.getByText('Morty Smith')).toBeInTheDocument();
});

it('Home snapshot test', () => {
  const { myrender } = renderWithRedux(<Categories />);
  expect(myrender).toMatchSnapshot();
});
