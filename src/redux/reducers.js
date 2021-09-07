import { GET_ALL_CHARACTERS } from './actiontypes';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CHARACTERS: {
    //   const newState = {
    //       total_count: action.payload.info.count,
    //   }

      const newState = action.payload.map((e) => ({
        // total_count: e.info.count,
        total_count: e,
        
      }));

      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
