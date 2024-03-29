import actionTypes from "../actions/actionTypes";
const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  topDoctors: [],
  topClinics: [],
  handbooks: [],
  topSpecialties: [],
  allDoctors: [],
  allScheduleTime: [],
  prices: [],
  payments: [],
  provinces: [],
  specialties: [],
  clinics: [],
  countPage: 10,
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
      copyState.users = action.data.users;
      copyState.countPage = action.data.countPage;
      return {
        ...copyState,
      };

    case actionTypes.FETCH_ALL_USERS_FAILED:
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

    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      copyState.topDoctors = action.dataDoctors;
      return {
        ...copyState,
      };

    case actionTypes.FETCH_TOP_DOCTOR_FAILED:
      copyState.topDoctors = [];
      return {
        ...copyState,
      };

    case actionTypes.FETCH_TOP_CLINIC_SUCCESS:
      copyState.topClinics = action.dataClinics;
      return {
        ...copyState,
      };

    case actionTypes.FETCH_TOP_CLINIC_FAILED:
      copyState.topClinics = [];
      return {
        ...copyState,
      };

    case actionTypes.FETCH_TOP_SPECIALTY_SUCCESS:
      copyState.topSpecialties = action.dataSpecialties;
      return {
        ...copyState,
      };

    case actionTypes.FETCH_TOP_SPECIALTY_FAILED:
      copyState.topSpecialties = [];
      return {
        ...copyState,
      };

    case actionTypes.FETCH_HANDBOOK_SUCCESS:
      copyState.handbooks = action.dataHandbooks;
      return {
        ...copyState,
      };

    case actionTypes.FETCH_HANDBOOK_FAILED:
      copyState.handbooks = [];
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

    case actionTypes.GET_LIST_CLINIC_SUCCESS:
      copyState.clinics = action.data;
      return { ...copyState };
    case actionTypes.GET_LIST_CLINIC_FAILED:
      copyState.clinics = [];
      return { ...copyState };

    default:
      return state;
  }
};

export default adminReducer;
