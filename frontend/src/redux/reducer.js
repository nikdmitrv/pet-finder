import { ADD_LOST_DOG, REQUEST_LOST_DOGS } from "./types";

const initialState = {
  lostDogsList: [],
  foundDogsList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_LOST_DOGS: {
      return {
        ...state,
        lostDogsList: action.lostDogsList
      };
    }
    default:
      return state;
  }
}
