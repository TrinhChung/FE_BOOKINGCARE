import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import Slider from "react-slick";

class MedicalFacility extends Component {
  render() {
    const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    return (
      <div className="section-share section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <span>Co so i te noi bat</span>
            <button>Xem them</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arr.map((item, index) => {
                return (
                  <div className="section-customize" key={index}>
                    <div className="bg-image medical-facility-section" />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
