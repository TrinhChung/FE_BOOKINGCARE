import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUsers = (page) => {
  return axios.get(`/api/get-all-users?page=${page}`);
};

const getUserByIdService = (id) => {
  return axios.get(`/api/get-user-by-id?id=${id}`);
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

const saveBulkScheduleDoctor = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};

const getScheduleDoctorByDateService = (inputId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date/?doctorId=${inputId}&date=${date}`
  );
};

const getInfoDoctorByIdService = (id) => {
  return axios.get(`/api/get-extra-doctor-info-by-id/?id=${id}`);
};

const getProfileDoctorById = (id) => {
  return axios.get(`/api/get-profile-doctor-by-id/?id=${id}`);
};

const postBookAppointment = (data) => {
  return axios.post(`/api/patient-book-appointment`, data);
};

const fetchVerifyEmailBooking = (token, doctorId) => {
  return axios.get(
    `/api/verify-book-appointment/?token=${token}&doctorId=${doctorId}`
  );
};

const createSpecialty = (data) => {
  return axios.post(`/api/create-new-specialty`, data);
};

const getAllSpecialty = () => {
  return axios.get(`/api/get-specialty`);
};

const getDetailSpecialty = (id, province) => {
  return axios.get(`/api/get-detail-specialty/?id=${id}&province=${province}`);
};

const createClinic = (data) => {
  return axios.post(`/api/create-new-clinic`, data);
};

const getAllClinic = (field) => {
  return axios.get(`/api/get-clinic/?field=${field}`);
};

const getDetailClinic = (id) => {
  return axios.get(`/api/get-detail-clinic/?id=${id}`);
};

const getAllPatientAllDoctorService = (id, date, page) => {
  return axios.get(
    `/api/get-list-patient-for-doctor/?doctorId=${id}&date=${date}&page=${page}`
  );
};

const sendBillAccept = (data) => {
  return axios.post(`/api/patient-book-doctor-accept`, data);
};

const createHandBook = (data) => {
  return axios.post(`/api/create-new-handbook`, data);
};

const getHandBook = () => {
  return axios.get(`/api/get-handbooks`);
};

const getDetailHandBook = (data) => {
  return axios.get(`/api/get-detail-handbooks/?id=${data}`);
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
  saveBulkScheduleDoctor,
  getScheduleDoctorByDateService,
  getInfoDoctorByIdService,
  getProfileDoctorById,
  postBookAppointment,
  fetchVerifyEmailBooking,
  createSpecialty,
  createClinic,
  getAllSpecialty,
  getDetailSpecialty,
  getAllClinic,
  getDetailClinic,
  getAllPatientAllDoctorService,
  getUserByIdService,
  sendBillAccept,
  createHandBook,
  getHandBook,
  getDetailHandBook,
};
