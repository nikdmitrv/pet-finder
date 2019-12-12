import {
  ADD_LOST_DOG,
  ADD_FOUND_DOG,
  REQUEST_LOST_DOGS,
  REQUEST_FOUND_DOGS
} from "./types";

export const requestLostDogsAC = lostDogsList => {
  return {
    type: REQUEST_LOST_DOGS,
    lostDogsList
  };
};

export const fetchLostDogsAC = () => {
  return async dispatch => {
    try {
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

export const createFoundAdvertAC = advert => {
  return async dispatch => {
    try {
      const request = {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: advert
      };
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

export const createLostAdvertAC = advert => {
  return async dispatch => {
    try {
      console.log(advert);

      const response = await fetch("api/lost", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: advert
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
