import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";

class HomeHeader extends Component {
  render() {
    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars "></i>
              <div className="header-logo"></div>
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
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="homeheader.support" />
              </div>
              <div className="flag language-vi">VN</div>
              <div className="flag language-en">EN</div>
            </div>
          </div>
        </div>
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
