import { GET_ALL_CHARACTERS } from './actiontypes';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CHARACTERS: {
      const newState = Object.keys(action.payload).map((key) => ({
        total_count: action.payload[key].count,
      }));
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
