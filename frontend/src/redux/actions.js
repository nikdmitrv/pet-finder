import {
  CLEAR_MESSAGE,
  LOADING_REQUEST,
  ADD_LOST_DOG,
  ADD_FOUND_DOG,
  REQUEST_LOST_DOGS,
  REQUEST_FOUND_DOGS,
  // REGISTER_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  WARNING_MESSAGE
} from "./types";

export const clearMessageAC = () => {
  return { type: CLEAR_MESSAGE };
};

export const loadingRequestAC = () => {
  return { type: LOADING_REQUEST };
};

export const requestLostDogsAC = lostDogsList => {
  return {
    type: REQUEST_LOST_DOGS,
    lostDogsList
  };
};

export const fetchLostDogsAC = () => {
  return async dispatch => {
    try {
      dispatch(loadingRequestAC());
      const response = await fetch("/api/lost");
      if (response.status === 200) {
        const result = await response.json();
        dispatch(requestLostDogsAC(result));
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const requestFoundDogsAC = foundDogsList => {
  return {
    type: REQUEST_FOUND_DOGS,
    foundDogsList
  };
};

export const fetchFoundDogsAC = () => {
  return async dispatch => {
    try {
      dispatch(loadingRequestAC());
      const response = await fetch("/api/found");
      if (response.status === 200) {
        const result = await response.json();
        dispatch(requestFoundDogsAC(result));
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addFoundDogAC = (dog, message) => {
  return {
    type: ADD_FOUND_DOG,
    dog,
    message
  };
};

export const createFoundAdvertAC = (advert, image) => {
  return async dispatch => {
    try {
      console.log("request create:", advert, image);

      const request = {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ advert, image })
      };
      dispatch(loadingRequestAC());
      const response = await fetch("/api/found", request);
      const result = await response.json();
      if (response.status === 200) {
        dispatch(addFoundDogAC(result.newAdvert, result.message));
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addLostDogAC = (dog, message) => {
  return {
    type: ADD_LOST_DOG,
    dog,
    message
  };
};

export const createLostAdvertAC = (advert, image) => {
  return async dispatch => {
    try {
      dispatch(loadingRequestAC());
      const response = await fetch("api/lost", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ advert, image })
      });
      if (response.status === 200) {
        const result = await response.json();
        dispatch(addLostDogAC(result.newAdvert, result.message));
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const requestRegisterAC = user => {
  return async dispatch => {
    try {
      dispatch(loadingRequestAC());
      const response = await fetch("/api/users/registration", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: user
      });

      const result = await response.json();
      console.log("register result:", result);
      if (response.status === 200) {
        dispatch(loginUserSuccessAC(result.user));
      } else {
        console.log(response);
        dispatch(loginUserErrorAC(result.message));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const loginUserSuccessAC = user => {
  return {
    type: LOGIN_USER_SUCCESS,
    user
  };
};

export const loginUserErrorAC = message => {
  return {
    type: LOGIN_USER_ERROR,
    message
  };
};

export const requestLoginAC = user => {
  return async dispatch => {
    try {
      dispatch(loadingRequestAC());
      const response = await fetch("/api/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        body: user
      });
      const result = await response.json();
      if (response.status === 200) {
        console.log(result);
        dispatch(loginUserSuccessAC(result.currentUser));
      } else {
        console.log(response);
        dispatch(loginUserErrorAC(result.message));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const logoutUserAC = () => {
  return { type: LOGOUT_USER };
};

export const fetchSessionAC = () => {
  return async dispatch => {
    try {
      dispatch(loadingRequestAC());
      const response = await fetch("/api/users/auth", {
        method: "GET",
        credentials: "include"
      });
      if (response.status === 200) {
        const result = await response.json();
        dispatch(loginUserSuccessAC(result.currentUser));
      } else {
        console.log(response);
        dispatch(logoutUserAC());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const requestLogoutAC = () => {
  return async dispatch => {
    try {
      const response = await fetch("/api/users/logout", {
        method: "GET",
        credentials: "include"
      });
      if (response.status === 200) {
        console.log(response);

        const result = await response.json();

        console.log("requestLogout result: ", result);
        console.log("logginOut");

        dispatch(logoutUserAC());
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const warningMessageAC = message => {
  return {
    type: WARNING_MESSAGE,
    message
  };
};
