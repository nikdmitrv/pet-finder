import {
  CLEAR_MESSAGE,
  LOADING_REQUEST,
  ADD_LOST_DOG,
  ADD_FOUND_DOG,
  REQUEST_LOST_DOGS,
  REQUEST_FOUND_DOGS,
  REGISTER_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER
} from "./types";

const initialState = {
  lostDogsList: [],
  foundDogsList: [],
  user: {},
  message: "",
  logged: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_MESSAGE: {
      return {
        ...state,
        loading: false,
        message: ""
      };
    }
    case LOADING_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case REQUEST_LOST_DOGS: {
      return {
        ...state,
        loading: false,
        lostDogsList: action.lostDogsList.reverse(),
        message: ""
      };
    }
    case REQUEST_FOUND_DOGS: {
      return {
        ...state,
        loading: false,
        foundDogsList: action.foundDogsList.reverse(),
        message: ""
      };
    }
    case ADD_FOUND_DOG: {
      return {
        ...state,
        loading: false,
        foundDogsList: [...state.foundDogsList, action.dog],
        message: action.message
      };
    }
    case ADD_LOST_DOG: {
      return {
        ...state,
        loading: false,
        lostDogsList: [...state.lostDogsList, action.dog],
        message: action.message
      };
    }
    case REGISTER_USER: {
      return {
        ...state,
        loading: false,
        message: action.message
      };
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        user: action.user,
        message: "",
        logged: true
      };
    }
    case LOGIN_USER_ERROR: {
      return {
        ...state,
        message: action.message,
        logged: false
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        loading: false,
        user: {},
        message: "",
        logged: false
      };
    }
    default:
      return state;
  }
}
