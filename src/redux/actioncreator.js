import { GET_ALL_CHARACTERS, GET_BY_CATEGORIES } from './actiontypes';

export const getCharacters = (payload) => ({
  type: GET_ALL_CHARACTERS,
  payload,
});

export const getByCategories = (payload) => ({
  type: GET_BY_CATEGORIES,
  payload,
});
