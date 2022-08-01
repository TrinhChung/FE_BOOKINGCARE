import actionTypes from "../actions/actionTypes";
const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  topDoctors: [],
  allDoctors: [],
  allScheduleTime: [],
  prices: [],
  payments: [],
  provinces: [],
  specialties: [],
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

    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      copyState.topDoctors = action.dataDoctors;
      return {
        ...copyState,
      };

    case actionTypes.FETCH_TOP_DOCTOR_FAILED:
      copyState.users = [];
      return {
        ...copyState,
      };

    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      copyState.allDoctors = action.dataDoctors;
      return {
        ...copyState,
      };

    case actionTypes.FETCH_ALL_DOCTOR_FAILED:
      copyState.allDoctors = [];
      return {
        ...copyState,
      };

    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
      copyState.allScheduleTime = action.dataTime;
      return {
        ...copyState,
      };

    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
      copyState.allScheduleTime = [];
      return {
        ...copyState,
      };

    case actionTypes.GET_REQUIRED_DOCTOR_SUCCESS:
      copyState.prices = action.data.resPrice;
      copyState.payments = action.data.resPayment;
      copyState.provinces = action.data.resProvince;
      copyState.specialties = action.data.resSpecialty;

      return {
        ...copyState,
      };

    case actionTypes.GET_REQUIRED_DOCTOR_FAILED:
      copyState.prices = [];
      copyState.payments = [];
      copyState.provinces = [];
      copyState.specialties = [];
      return {
        ...copyState,
      };

    default:
      return state;
  }
};

export default adminReducer;
