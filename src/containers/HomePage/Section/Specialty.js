import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
class Specialty extends Component {
  render() {
    const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    return (
      <div className="section-share">
        <div className="section-container">
          <div className="section-header">
            <span>Chuyen khoa pho bien</span>
            <button>Xem them</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arr.map((item, index) => {
                return (
                  <div className="section-customize">
                    <div className="bg-image specialty-section" />
                    <div>{index + 1}</div>
                  </div>
                );
              })}
            </Slider>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
