import { GET_ALL_CHARACTERS } from './actiontypes';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CHARACTERS: {
    //   const newState = {
    //       total_count: action.payload.info.count,
    //   }

      const newState = Object.keys(action.payload).map((key) => ({
        total_count: action.payload[0].info.count,
        info: action.payload[1].results,
      }));

      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
