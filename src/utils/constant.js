export const path = {
  HOME: "/",
  HOMEPAGE: "/home",
  LOGIN: "/login",
  REGISTER: "/register",
  LOG_OUT: "/logout",
  SYSTEM: "/system",
  DETAILDOCTOR: "/detail-doctor/:id",
  DETAILSPECIALTY: "/detail-specialty/:id",
  DETAILCLINIC: "/detail-clinic/:id",
  DETAILHANDBOOK: "/detail-handbook/:id",
  HOMELISTSECTION: "/home-list-section/:section",
  VERIFY_EMAIL_BOOKING: "/api/patient/verify-book-appointment/:token&:doctorId",
  DOCTOR: "/doctor",
  PROFILE: "/profile",
  REMOTE_SCHEDULE: "/remote-schedules",
  ROOM: "/room/:id",
};

export const LANGUAGES = {
  VI: "vi",
  EN: "en",
  JP: "jp",
};

export const CRUDACTIONS = {
  CREATE: "CREATE",
  EDIT: "EDIT",
  DELETE: "DELETE",
  READ: "READ",
};

export const dateFormat = {
  SEND_TO_SERVER: "DD/MM/YYYY",
};

export const YesNoObj = {
  YES: "Y",
  NO: "N",
};

export const USER_ROLE = {
  ADMIN: "R1",
  DOCTOR: "R2",
  USER: "R3",
};

export const pagination = {
  LIMIT: 10,
};
