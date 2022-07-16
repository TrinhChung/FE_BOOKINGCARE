import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES } from "../../utils";
import { FormattedMessage } from "react-intl";

import { changeLanguageApp } from "../../store/actions";

class Header extends Component {
  handleOnChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    const { processLogout, userInfo } = this.props;
    let language = this.props.language;

    return (
      <div className="header-container">
        <div className="header-tabs-container">
          <Navigator menus={adminMenu} />
        </div>

        <div className="languages">
          <span className="welcome">
            <FormattedMessage id="homeheader.welcome" />,{" "}
            {userInfo && userInfo.firstName && userInfo.lastName
              ? userInfo.firstName + " " + userInfo.lastName
              : "User"}
            !
          </span>
          <span
            className={language === "vi" ? "language-vi active" : "language-vi"}
            onClick={() => this.handleOnChangeLanguage(LANGUAGES.VI)}
          >
            VI
          </span>
          <span
            className={language === "en" ? "language-en active" : "language-en"}
            onClick={() => this.handleOnChangeLanguage(LANGUAGES.EN)}
          >
            EN
          </span>
          <div className="btn btn-logout" onClick={processLogout}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
