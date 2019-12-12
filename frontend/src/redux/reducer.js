import {
  ADD_LOST_DOG,
  ADD_FOUND_DOG,
  REQUEST_LOST_DOGS,
  REQUEST_FOUND_DOGS
} from "./types";

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
    case REQUEST_FOUND_DOGS: {
      return {
        ...state,
        foundDogsList: action.foundDogsList
      };
    }
    case ADD_FOUND_DOG: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
}
