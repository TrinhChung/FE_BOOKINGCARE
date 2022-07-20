import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUsers = (id) => {
  return axios.get(`/api/get-allUsers?id=${id}`);
};

const createNewUserService = (data) => {
  return axios.post(`/api/create-new-user`, data);
};

const deleteUserService = (id) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: id,
    },
  });
};

const editUserService = (data) => {
  return axios.put("/api/edit-user", data);
};

const getAllCodeService = (inputData) => {
  return axios.get(`/api/allcode?type=${inputData}`);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home/?limit=${limit}`);
};

const getAllDoctorsServices = () => {
  return axios.get(`/api/get-all-doctor`);
};

const saveDetailInfoDoctorService = (data) => {
  return axios.post(`/api/save-info-doctor`, data);
};

const getDetailDoctorService = (id) => {
  return axios.get(`/api/get-detail-doctor-by-id/?id=${id}`);
};

export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctorsServices,
  saveDetailInfoDoctorService,
  getDetailDoctorService,
};
