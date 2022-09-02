import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, USER_ROLE } from "../../utils";
import { Link, withRouter } from "react-router-dom";
import * as actions from "../../store/actions";
import { changeLanguageApp } from "../../store/actions";
import LogoutModal from "../Header/LogoutModal";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      specialties: [],
      handbooks: [],
      clinics: [],
      doctors: [],
      specialtiesFilter: [],
      handbooksFilter: [],
      clinicsFilter: [],
      doctorsFilter: [],
      keySearch: "",
      focus: false,
    };

    this.ref = React.createRef();
  }

  handleClickOutside = (event) => {
    if (
      this.ref &&
      this.ref.current &&
      this.ref.current.contains(event.target)
    ) {
    } else {
      this.setState({ focus: false });
    }
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isShowBanner !== this.props.isShowBanner) {
      this.getDataDoctor();
    }
    if (prevProps.topDoctors !== this.props.topDoctors) {
      this.setState({
        doctors: this.props.topDoctors,
        doctorsFilter: this.props.topDoctors,
      });
    }
    if (prevProps.topClinics !== this.props.topClinics) {
      this.setState({
        clinics: this.props.topClinics,
        clinicsFilter: this.props.topClinics,
      });
    }
    if (prevProps.topSpecialties !== this.props.topSpecialties) {
      this.setState({
        specialties: this.props.topSpecialties,
        specialtiesFilter: this.props.topSpecialties,
      });
    }
    if (prevProps.handbooks !== this.props.handbooks) {
      this.setState({
        handbooks: this.props.handbooks,
        handbooksFilter: this.props.handbooks,
      });
    }
  }

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  returnHome = () => {
    this.props.history.push("/home");
  };

  pageLogin = () => {
    this.props.history.push("/login");
  };

  toggleUserModal = () => {
    this.setState({ isOpenModal: false });
  };

  UserInfo = (user) => {
    let language = this.props.language;
    let roleId = this.props.userInfo.roleId ? this.props.userInfo.roleId : "";
    let nameUser =
      language === LANGUAGES.VI
        ? user.firstName + " " + user.lastName
        : user.lastName + " " + user.firstName;
    return (
      <div className="user-info">
        <LogoutModal
          isOpen={this.state.isOpenModal}
          toggleFormParent={this.toggleUserModal}
          homeHeader={true}
        />
        <div className="name-user" htmlFor="dropdownMenuButton1">
          {nameUser}
        </div>
        <div className="dropdown">
          <button
            className="avatar-user btn btn-secondary "
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <Link className="dropdown-item" to="/profile">
                Profile
              </Link>
              {roleId !== USER_ROLE.USER ||
                (roleId === "" && (
                  <Link
                    className="dropdown-item"
                    to={
                      roleId === USER_ROLE.DOCTOR
                        ? "/doctor/manage-patient"
                        : "/system/user-redux"
                    }
                  >
                    Manage
                  </Link>
                ))}
              <Link
                className="dropdown-item"
                onClick={() => this.setState({ isOpenModal: true })}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  SingIn = () => {
    return (
      <div className="user-info">
        <div className="text-singin" onClick={() => this.pageLogin()}>
          Login <i className="fa fa-sign-in mx-2" aria-hidden="true"></i>
        </div>
      </div>
    );
  };

  handleNextListSection = (e) => {
    this.props.history.push(
      `/home-list-section/${e.currentTarget.getAttribute("name")}`
    );
  };

  handleGetValueInputSearch = (e) => {
    this.setState({ keySearch: e.target.value });
    let specialties = this.state.specialties.filter((specialty) =>
      this.removeAccents(specialty.name).includes(
        this.removeAccents(e.target.value)
      )
    );
    let doctors = this.state.doctors.filter((doctor) =>
      this.removeAccents(
        doctor.positionData.valueVi +
          " " +
          doctor.lastName +
          " " +
          doctor.firstName
      ).includes(this.removeAccents(e.target.value))
    );
    let clinics = this.state.clinics.filter((specialty) =>
      this.removeAccents(specialty.name).includes(
        this.removeAccents(e.target.value)
      )
    );
    let handbooks = this.state.handbooks.filter((specialty) =>
      this.removeAccents(specialty.name).includes(
        this.removeAccents(e.target.value)
      )
    );
    this.setState({
      specialtiesFilter: specialties,
      doctorsFilter: doctors,
      clinicsFilter: clinics,
      handbooksFilter: handbooks,
    });
  };

  removeAccents = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .trim()
      .toLowerCase();
  };

  nextPageDetail = (id, name) => {
    if (name === "Doctors") {
      this.props.history.push(`/detail-doctor/${id}`);
    }
    if (name === "Specialties") {
      this.props.history.push(`/detail-specialty/${id}`);
    }
    if (name === "Clinics") {
      this.props.history.push(`/detail-clinic/${id}`);
    }
    if (name === "Handbooks") {
      this.props.history.push(`/detail-handbook/${id}`);
    }
  };

  boxSearchSection = (sections, name) => {
    return (
      <div className="box-search-section">
        <div className="name-section">{name}</div>
        <div className="wrap-section">
          {sections &&
            sections.length > 0 &&
            sections.map((section, index) => (
              <div className="section">
                <div
                  className="section-img"
                  style={{ backgroundImage: `url(${section.image})` }}
                  onClick={() => this.nextPageDetail(section.id, name)}
                  key={index}
                ></div>
                <div className="name">
                  {name === "Doctors"
                    ? section.positionData.valueVi +
                      " " +
                      section.firstName +
                      " " +
                      section.lastName
                    : section.name}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  focusOut = (e) => {
    console.log(1);
    this.setState({ focus: false });
  };

  render() {
    let { userInfo, isShowBanner, language } = this.props;
    let { doctorsFilter, specialtiesFilter, handbooksFilter, clinicsFilter } =
      this.state;

    console.log();

    return (
      <>
        <div>
          <div className="home-header-container">
            <div className="home-header-content">
              <div className="left-content">
                <div
                  className="header-logo"
                  onClick={() => this.returnHome()}
                ></div>
              </div>
              <div className="center-content">
                <div
                  className="child-content"
                  name="specialty"
                  onClick={(e) => this.handleNextListSection(e)}
                >
                  <div name="specialty">
                    <b>
                      <FormattedMessage id="homeheader.specialist" />
                    </b>
                  </div>
                  <div className="subs-title">
                    <FormattedMessage id="homeheader.searchdoctor" />
                  </div>
                </div>
                <div
                  className="child-content"
                  name="medical-facility"
                  onClick={(e) => this.handleNextListSection(e)}
                >
                  <div>
                    <b>
                      <FormattedMessage id="homeheader.health-facility" />
                    </b>
                  </div>
                  <div className="subs-title">
                    <FormattedMessage id="homeheader.select-room" />
                  </div>
                </div>
                <div
                  className="child-content"
                  name="doctor"
                  onClick={(e) => this.handleNextListSection(e)}
                >
                  <div>
                    <b>
                      <FormattedMessage id="homeheader.doctor" />
                    </b>
                  </div>
                  <div className="subs-title">
                    <FormattedMessage id="homeheader.select-doctor" />
                  </div>
                </div>
                <div
                  className="child-content"
                  name="handbook"
                  onClick={(e) => this.handleNextListSection(e)}
                >
                  <div>
                    <b>
                      <FormattedMessage id="homeheader.fee" />
                    </b>
                  </div>
                  <div className="subs-title">
                    <FormattedMessage id="homeheader.check-healthy" />
                  </div>
                </div>
              </div>
              <div className="right-content">
                {userInfo ? this.UserInfo(userInfo) : this.SingIn()}

                <select
                  className="form-select select-language"
                  value={language}
                  onChange={(e) => this.changeLanguage(e.target.value)}
                >
                  <option value="en">EN</option>
                  <option value="vi">VI</option>
                  <option value="jp">JP</option>
                </select>
              </div>
            </div>
          </div>

          {isShowBanner && (
            <div className="home-header-banner">
              <div className="content-up">
                <div className="title1">
                  <FormattedMessage id="banner.title1" />
                </div>
                <div className="title2">
                  <FormattedMessage id="banner.title2" />
                </div>

                <div className="search" tabIndex={0}>
                  <i className="fas fa-search"></i>
                  <FormattedMessage id="homeheader.search">
                    {(placeholder) => (
                      <input
                        type="text"
                        value={this.state.keySearch}
                        onFocus={(e) => this.setState({ focus: true })}
                        onChange={(e) => this.handleGetValueInputSearch(e)}
                        tabIndex="0"
                        contentEditable
                        placeholder={placeholder}
                      ></input>
                    )}
                  </FormattedMessage>

                  {this.state.focus ? (
                    <div className="nomination" ref={this.ref}>
                      {specialtiesFilter &&
                        specialtiesFilter.length > 0 &&
                        this.boxSearchSection(specialtiesFilter, "Specialties")}

                      {doctorsFilter &&
                        doctorsFilter.length > 0 &&
                        this.boxSearchSection(doctorsFilter, "Doctors")}

                      {clinicsFilter &&
                        clinicsFilter.length > 0 &&
                        this.boxSearchSection(clinicsFilter, "Clinics")}

                      {handbooksFilter &&
                        handbooksFilter.length > 0 &&
                        this.boxSearchSection(handbooksFilter, "Handbooks")}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="content-down">
                <div className="options">
                  <div className="option-child">
                    <div className="icon-child">
                      <i className="far fa-hospital"></i>
                    </div>
                    <div className="text-child">
                      <FormattedMessage id="banner.check-speciality" />
                    </div>
                  </div>
                  <div className="option-child">
                    <div className="icon-child">
                      <i className="fas fa-mobile-alt"></i>
                    </div>
                    <div className="text-child">
                      <div className="text-child">
                        <FormattedMessage id="banner.remote-check" />
                      </div>
                    </div>
                  </div>
                  <div className="option-child">
                    <div className="icon-child">
                      <i className="fas fa-procedures"></i>
                    </div>
                    <div className="text-child">
                      <FormattedMessage id="banner.check-general" />
                    </div>
                  </div>
                  <div className="option-child">
                    <div className="icon-child">
                      <i className="fas fa-flask"></i>
                    </div>
                    <div className="text-child">
                      <FormattedMessage id="banner.medical-test" />
                    </div>
                  </div>
                  <div className="option-child">
                    <div className="icon-child">
                      <i className="fas fa-user-md"></i>
                    </div>
                    <div className="text-child">
                      <FormattedMessage id="banner.mental-heath" />
                    </div>
                  </div>
                  <div className="option-child">
                    <div className="icon-child">
                      <i className="fas fa-briefcase-medical"></i>
                    </div>
                    <div className="text-child">
                      <FormattedMessage id="banner.dental-examination" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
    topDoctors: state.admin.topDoctors,
    topClinics: state.admin.topClinics,
    topSpecialties: state.admin.topSpecialties,
    handbooks: state.admin.handbooks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    fetchTopDoctor: () => dispatch(actions.fetchTopDoctor()),
    fetchTopClinic: () => dispatch(actions.fetchTopClinic()),
    fetchTopSpecialty: () => dispatch(actions.fetchTopSpecialty()),
    fetchHandBook: () => dispatch(actions.fetchHandBook()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
