import actionTypes from "../actions/actionTypes";
const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
};

const adminReducer = (state = initialState, action) => {
  let copyState = { ...state };
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      copyState.isLoadingGender = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      copyState.genders = action.data;
      copyState.isLoadingGender = false;
      return {
        ...copyState,
      };

    case actionTypes.FETCH_GENDER_FAILED:
      copyState.isLoadingGender = false;
      copyState.genders = [];
      return {
        ...copyState,
      };

    case actionTypes.FETCH_POSITION_SUCCESS:
      copyState.positions = action.data;
      return {
        ...copyState,
      };

    case actionTypes.FETCH_POSITION_FAILED:
      copyState.positions = [];
      return {
        ...copyState,
      };

    case actionTypes.FETCH_ROLE_SUCCESS:
      copyState.roles = action.data;
      return {
        ...copyState,
      };

    case actionTypes.FETCH_ROLE_FAILED:
      copyState.positions = [];
      return {
        ...copyState,
      };

    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      copyState.users = action.data;
      return {
        ...copyState,
      };

    case actionTypes.FETCH_ALL_USERS_FAILED:
      copyState.users = [];
      return {
        ...copyState,
      };

    default:
      return state;
  }
};

export default adminReducer;
