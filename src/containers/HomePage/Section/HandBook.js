import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";

class HandBook extends Component {
  render() {
    const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    return (
      <div className="section-share section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <span>Cam nang</span>
            <button>Xem them</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arr.map((item, index) => {
                return (
                  <div className="section-customize">
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
