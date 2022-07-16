import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";

class OutStandingDoctor extends Component {
  render() {
    const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    return (
      <div className="section-share outstanding-doctor-section">
        <div className="section-container">
          <div className="section-header">
            <span>Bac si noi bat</span>
            <button>Xem them</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arr.map((item, index) => {
                return (
                  <div className="section-customize">
                    <div className="customize-border">
                      <div className="outer-bg">
                        <div className="bg-image outstanding-doctor-section" />
                      </div>
                      <div className="position text-center">
                        <div>{"Giao su tien si: " + (index + 1) + " "}</div>
                        <div>Co xuong khop</div>
                      </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
