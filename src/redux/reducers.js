import { GET_ALL_CHARACTERS, GET_BY_CATEGORIES } from './actiontypes';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CHARACTERS: {
    //   const newState = {
    //       total_count: action.payload.info.count,
    //   }

      const newState = Object.keys(action.payload).map((key) => ({
        total_count: action.payload[key].info.count,
        info: action.payload[key].results,
      }));

      return newState;
    }
    case GET_BY_CATEGORIES: {
      console.log('reducer ok');
      return state;
    }
    default:
      return state;
  }
};

export default reducer;
