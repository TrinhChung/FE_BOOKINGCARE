export const adminMenu = [
  {
    //Quan li cam nang
    name: "menu.home.header",
    menus: [
      {
        name: "menu.home.home-page",
        link: "/home",
      },
    ],
  },
  {
    //Quan li nguoi dung
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/manage-doctor",
      },
      {
        name: "menu.admin.manage-admin",
        link: "/system/user-admin",
      },
      {
        //Quan li ke hoach
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
  {
    //Quan li phong kham
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/manage-clinic",
      },
    ],
  },
  {
    //Quan li chuyen khoa
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/manage-specialty",
      },
    ],
  },
  {
    //Quan li cam nang
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/manage-handbook",
      },
    ],
  },
];

export const doctorMenu = [
  {
    //Quan li cam nang
    name: "menu.home.header",
    menus: [
      {
        name: "menu.home.home-page",
        link: "/home",
      },
    ],
  },
  {
    name: "menu.doctor.user",
    menus: [
      {
        //Quan li ke hoach
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
      {
        //Quan li ke hoach
        name: "menu.doctor.manage-patient",
        link: "/doctor/manage-patient",
      },
    ],
  },
];
