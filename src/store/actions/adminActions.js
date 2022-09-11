import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctorsServices,
  saveDetailInfoDoctorService,
  getAllSpecialty,
  getAllClinic,
  getHandBook,
} from "../../services/userService";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeService("gender");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (err) {
      dispatch(fetchGenderFailed());
      console.log("fetchGenderStart: ", err);
    }
  };
};

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("position");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (err) {
      dispatch(fetchPositionFailed());
      console.log("fetchPositionStart: ", err);
    }
  };
};

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("role");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (err) {
      dispatch(fetchRoleFailed());
      console.log("fetchRoleStart: ", err);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionSuccess = (PositionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: PositionData,
});
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleSuccess = (RoleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: RoleData,
});
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      console.log("check new user: ", res);
      if (res && res.errCode === 0) {
        toast.success("CREATE USER SUCCESS");
        dispatch(createUserSuccess());
      } else {
        toast.error("CREATE USER FAILED");
        dispatch(createUserFailed());
      }
    } catch (err) {
      toast.error("CREATE USER FAILED");
      dispatch(createUserFailed());
      console.log("create User failed: ", err);
    }
  };
};

export const createUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const createUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUserStart = (currentPage) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers(currentPage);
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.data));
      } else {
        dispatch(fetchAllUserFailed());
      }
    } catch (err) {
      dispatch(fetchAllUserFailed());
      console.log("get all User failed: ", err);
    }
  };
};

export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  data: data,
});

export const fetchAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const deleteUser = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(id);
      if (res && res.errCode === 0) {
        toast.success("DELETE USER SUCCESS");
        dispatch(deleteUserSuccess());
      } else {
        toast.error("DELETE USER FAILED");
        dispatch(deleteUserFailed());
      }
    } catch (err) {
      toast.error("DELETE USER FAILED");
      dispatch(deleteUserFailed());
      console.log("Delete User failed: ", err);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const EditAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Update A USER SUCCESS");
        dispatch(editAUserSuccess());
        return res;
      } else {
        toast.error("Update A USER FAILED");
        dispatch(EditAUserFailed());
      }
    } catch (err) {
      toast.error("Update A USER FAILED");
      dispatch(EditAUserFailed());
      console.log("Update A User failed: ", err);
    }
  };
};

export const editAUserSuccess = () => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
});

export const EditAUserFailed = () => ({
  type: actionTypes.UPDATE_USER_FAILED,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");

      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
        });
      }
    } catch (err) {
      console.log("FETCH TOP DOCTOR FAILED ", err);
      dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_FAILED });
    }
  };
};

export const fetchTopClinic = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllClinic("all");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_CLINIC_SUCCESS,
          dataClinics: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_CLINIC_FAILED,
        });
      }
    } catch (err) {
      console.log("FETCH_TOP_CLINIC_FAILED ", err);
      dispatch({ type: actionTypes.FETCH_TOP_CLINIC_FAILED });
    }
  };
};

export const fetchTopSpecialty = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllSpecialty();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_SPECIALTY_SUCCESS,
          dataSpecialties: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_SPECIALTY_FAILED,
        });
      }
    } catch (err) {
      console.log("FETCH_TOP_SPECIALTY_FAILED ", err);
      dispatch({ type: actionTypes.FETCH_TOP_SPECIALTY_FAILED });
    }
  };
};

export const fetchHandBook = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getHandBook();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_HANDBOOK_SUCCESS,
          dataHandbooks: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_HANDBOOK_FAILED,
        });
      }
    } catch (err) {
      console.log("FETCH_HANDBOOK_FAILED ", err);
      dispatch({ type: actionTypes.FETCH_HANDBOOK_FAILED });
    }
  };
};

export const fetchAllDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctorsServices();

      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
        });
      }
    } catch (err) {
      console.log("FETCH ALL DOCTOR FAILED ", err);
      dispatch({ type: actionTypes.FETCH_ALL_DOCTOR_FAILED });
    }
  };
};

export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailInfoDoctorService(data);

      if (res && res.errCode === 0) {
        toast.success("SAVE DETAIL DOCTOR SUCCESS");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        toast.error("SAVE DETAIL DOCTOR FAIL");

        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
        });
      }
    } catch (err) {
      toast.error("SAVE DETAIL DOCTOR FAIL");

      console.log("SAVE_DETAIL_DOCTOR_FAILED", err);
      dispatch({ type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED });
    }
  };
};

export const fetchScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
        });
      }
    } catch (err) {
      console.log("FETCH_ALLCODE_SCHEDULE_TIME_FAILED ", err);
      dispatch({ type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED });
    }
  };
};

export const getRequiredDoctorInfo = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.GET_REQUIRED_DOCTOR_START });
      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      let resSpecialty = await getAllSpecialty();

      if (
        resPrice &&
        resPayment &&
        resProvince &&
        resSpecialty &&
        resSpecialty.errCode === 0 &&
        resPrice.errCode === 0 &&
        resPayment.errCode === 0 &&
        resProvince.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
        };
        dispatch(getRequiredDoctorInfoSuccess(data));
      } else {
        dispatch(getRequiredDoctorInfoFailed());
      }
    } catch (err) {
      dispatch(getRequiredDoctorInfoFailed());
      console.log("GET_DOCTOR_PRICE_SUCCESS: ", err);
    }
  };
};

export const getRequiredDoctorInfoSuccess = (data) => ({
  type: actionTypes.GET_REQUIRED_DOCTOR_SUCCESS,
  data: data,
});
export const getRequiredDoctorInfoFailed = () => ({
  type: actionTypes.GET_REQUIRED_DOCTOR_FAILED,
});

export const getListClinic = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllClinic("name");
      if (res && res.data) {
        dispatch(getListClinicSuccess(res.data));
      } else {
        dispatch(getListClinicFailed());
      }
    } catch (err) {
      dispatch(getListClinicFailed());
      console.log("GET_LIST_CLINIC_FAILED: ", err);
    }
  };
};

export const getListClinicSuccess = (data) => ({
  type: actionTypes.GET_LIST_CLINIC_SUCCESS,
  data: data,
});
export const getListClinicFailed = () => ({
  type: actionTypes.GET_LIST_CLINIC_FAILED,
});
