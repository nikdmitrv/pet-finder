import { ADD_LOST_DOG } from "./types";

const initialState = {
  lostDogList: [],
  foundDogList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_LOST_DOG: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
}
