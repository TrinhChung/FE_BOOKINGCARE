import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, USER_ROLE } from "../../utils";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import { withRouter } from "react-router";

import { changeLanguageApp } from "../../store/actions";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }
  handleOnChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      } else if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
      if (role === USER_ROLE.USER) {
        console.log(this.props.history);
      }
    }
    this.setState({ menuApp: menu });
  }

  render() {
    const { processLogout, userInfo } = this.props;
    let language = this.props.language;

    return (
      <div className="header-container">
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>

        <div className="languages">
          <div className="content-right">
            <div className="welcome">
              <FormattedMessage id="homeheader.welcome" />
              {userInfo && userInfo.firstName && userInfo.lastName
                ? userInfo.firstName + " " + userInfo.lastName
                : "User"}
              !
            </div>
            <select
              className="form-select select-language"
              value={language}
              onChange={(e) => this.changeLanguage(e.target.value)}
            >
              <option value="en">EN</option>
              <option value="vi">VI</option>
              <option value="jp">JP</option>
            </select>
            <div
              className="btn btn-logout"
              onClick={() => this.props.processLogout()}
            >
              <i className="fas fa-sign-out-alt"></i>
            </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
