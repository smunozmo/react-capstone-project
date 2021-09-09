import { GET_ALL_CHARACTERS, GET_BY_CATEGORIES, GET_ALL_SPECIES } from './actiontypes';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CHARACTERS: {
      const newState = Object.keys(action.payload).map((key) => ({
        total_count: action.payload[key].info.count,
        info: action.payload[key].results,
      }));
      // const newState = action.payload;
      // console.log('ns', newState);
      return newState;
    }
    case GET_BY_CATEGORIES: {
      const newState = {
        category_index: action.payload,
      };
      return [...state, newState];
    }
    case GET_ALL_SPECIES: {
      const newState = {
        species_list: action.payload,
      };
      return [...state, newState];
    }
    default:
      return state;
  }
};

export default reducer;
