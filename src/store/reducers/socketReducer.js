import actionTypes from "../actions/actionTypes";
const initialState = {};

const socketReducer = (state = initialState, action) => {
  let copyState = { ...state };
  switch (action.type) {
    default:
      return state;
  }
};

export default socketReducer;
