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
    };
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
    let roleId = this.props.userInfo.roleId;
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
              {roleId !== USER_ROLE.USER && (
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
              )}
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

  render() {
    let { userInfo, isShowBanner, language } = this.props;
    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars "></i>
              <div
                className="header-logo"
                onClick={() => this.returnHome()}
              ></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.specialist" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.searchdoctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.health-facility" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-room" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.doctor" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-doctor" />
                </div>
              </div>
              <div className="child-content">
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
              <div className="search">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  className=""
                  placeholder="Tim chuyên khoa khám bệnh"
                ></input>
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
