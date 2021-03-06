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

export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("All");
      let res1 = await getTopDoctorHomeService(3);
      console.log("res get top docter: ", res1);
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
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
        dispatch(fetchAllUserStart());
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
        dispatch(fetchAllUserStart());
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
