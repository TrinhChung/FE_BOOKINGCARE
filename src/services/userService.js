import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/auth/login", { email, password });
};

const loginByToken = () => {
  return axios.get("/api/auth/me");
};

const getAllUsers = (page) => {
  return axios.get(`/api/user/?page=${page}`);
};

const getUserByIdService = (id) => {
  return axios.get(`/api/user/${id}`);
};

const createNewUserService = (data) => {
  return axios.post(`/api/auth/`, data);
};

const editUserService = (data) => {
  return axios.put("/api/user/update", data);
};

const deleteUserService = (id) => {
  return axios.delete(`/api/user/${id}`);
};

const getAllCodeService = (inputData) => {
  return axios.get(`/api/all-code/?type=${inputData}`);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/doctor/top-doctor-home/?limit=${limit}`);
};

const getAllDoctorsServices = () => {
  return axios.get(`/api/doctor/`);
};

const saveDetailInfoDoctorService = (data) => {
  return axios.post(`/api/doctor/`, data);
};

const getDetailDoctorService = (id) => {
  return axios.get(`/api/doctor/detail/${id}`);
};

const getInfoDoctorByIdService = (id) => {
  return axios.get(`/api/doctor/extra/${id}`);
};

const getProfileDoctorById = (id) => {
  return axios.get(`/api/doctor/${id}`);
};

const getAllPatientAllDoctorService = (id, date, page) => {
  return axios.get(`/api/doctor/get-patients/${id}?date=${date}&page=${page}`);
};

const saveBulkScheduleDoctor = (data) => {
  return axios.post(`/api/schedule/bulk-create`, data);
};

const getScheduleDoctorByDateService = (inputId, date) => {
  return axios.get(`/api/schedule/${inputId}/${date}`);
};

const postBookAppointment = (data) => {
  return axios.post(`/api/patient/appointment`, data);
};

const fetchVerifyEmailBooking = (token, doctorId) => {
  return axios.get(
    `/api/patient/verify-book-appointment/?token=${token}&doctorId=${doctorId}`
  );
};

const sendBillAccept = (data) => {
  return axios.post(`/api/patient/booking-doctor-accept`, data);
};

const createSpecialty = (data) => {
  return axios.post(`/api/specialty/`, data);
};

const getAllSpecialty = () => {
  return axios.get(`/api/specialty/`);
};

const getDetailSpecialty = (id, province) => {
  return axios.get(`/api/specialty/${id}?province=${province}`);
};

const createClinic = (data) => {
  return axios.post(`/api/clinic/`, data);
};

const getAllClinic = (field) => {
  return axios.get(`/api/clinic/?field=${field}`);
};

const getDetailClinic = (id) => {
  return axios.get(`/api/clinic/${id}`);
};

const createHandBook = (data) => {
  return axios.post(`/api/handbook/`, data);
};

const getHandBook = () => {
  return axios.get(`/api/handbook/`);
};

const getDetailHandBook = (data) => {
  return axios.get(`/api/handbook/${data}`);
};

export {
  loginByToken,
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
