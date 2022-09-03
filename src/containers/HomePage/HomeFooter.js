import React, { Component } from "react";
import { connect } from "react-redux";

class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <p>
          &copy;
          <a
            target="_blank"
            href="https://bookingcare.vn/"
            rel="noopener noreferrer"
          >
            BookingCareVN
          </a>{" "}
          with TVChung. More information, please visit{" "}
          <a
            target="_blank"
            href="https://github.com/TrinhChung"
            rel="noopener noreferrer"
          >
            &#8594;Click here&#8592;
          </a>
        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
