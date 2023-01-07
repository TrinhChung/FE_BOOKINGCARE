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

const createNewUserService = async (data) => {
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

const createSpecialty = async (data) => {
  try {
    let formData = new FormData();
    for (var key in data) {
      formData.append(key, data[key]);
    }
    const token = localStorage.getItem("token");
    const res = await axios({
      method: "POST",
      url: "http://localhost:8080/api/specialty/",
      data: formData,
      headers: {
        "Content-Type": `multipart/form-data;`,
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getAllSpecialty = () => {
  return axios.get(`/api/specialty/`);
};

const getDetailSpecialty = (id, province) => {
  return axios.get(`/api/specialty/${id}?province=${province}`);
};

const createClinic = async (data) => {
  try {
    let formData = new FormData();
    for (var key in data) {
      formData.append(key, data[key]);
    }
    const token = localStorage.getItem("token");
    const res = await axios({
      method: "POST",
      url: "http://localhost:8080/api/clinic/",
      data: formData,
      headers: {
        "Content-Type": `multipart/form-data;`,
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
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

const getHistoryBooking = (page, limit) => {
  return axios.get(`/api/history/?page=${page}&limit=${limit}`);
};

const getFavoritesService = (data) => {
  return axios.get(`/api/favorite/?fkId=${data.fkId}&keyMap=${data.keyMap}`);
};

const handleLike = (data) => {
  return axios.post(`/api/favorite`, data);
};

const deleteLike = (data) => {
  return axios.delete(`api/favorite/?fkId=${data.fkId}&keyMap=${data.keyMap}`);
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
  getHistoryBooking,
  getFavoritesService,
  handleLike,
  deleteLike,
};
