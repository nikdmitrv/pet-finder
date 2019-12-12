import { ADD_LOST_DOG, REQUEST_LOST_DOGS } from "./types";

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
