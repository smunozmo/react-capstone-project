import {
  GET_ALL_CHARACTERS,
  GET_BY_CATEGORIES,
  GET_ALL_SPECIES,
  CLEAR_LIST,
  GET_STATE,
} from './actiontypes';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CHARACTERS: {
      const newState = Object.keys(action.payload).map((key) => ({
        total_count: action.payload[key].info.count,
        info: action.payload[key].results,
      }));
      newState.shift();
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
    case CLEAR_LIST: {
      return [];
    }
    case GET_STATE: {
      return state;
    }
    default:
      return state;
  }
};

export default reducer;
