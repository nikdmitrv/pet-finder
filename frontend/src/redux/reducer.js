import {
  ADD_LOST_DOG,
  ADD_FOUND_DOG,
  REQUEST_LOST_DOGS,
  REQUEST_FOUND_DOGS,
  REGISTER_USER,
  LOGIN_USER
} from "./types";

const initialState = {
  lostDogsList: [],
  foundDogsList: [],
  message: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_LOST_DOGS: {
      return {
        ...state,
        lostDogsList: action.lostDogsList,
        message: ""
      };
    }
    case REQUEST_FOUND_DOGS: {
      return {
        ...state,
        foundDogsList: action.foundDogsList,
        message: ""
      };
    }
    case ADD_FOUND_DOG: {
      return {
        ...state,
        foundDogsList: [...state.foundDogsList, action.dog],
        message: action.message
      };
    }
    case ADD_LOST_DOG: {
      return {
        ...state,
        lostDogsList: [...state.lostDogsList, action.dog],
        message: action.message
      };
    }
    case REGISTER_USER: {
      return {
        ...state,
        message: action.message
      };
    }
    case LOGIN_USER: {
      return {
        ...state,
        message: action.message
      };
    }
    default:
      return state;
  }
}
