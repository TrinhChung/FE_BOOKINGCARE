import React, { Component } from "react";
import { connect } from "react-redux";
import "./Footer.scss";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    return (
      <div className="footer-container">
        <p>
          &copy;
          <a target="_blank" href="https://bookingcare.vn/">
            BookingCareVN
          </a>{" "}
          with TVChung. More information, please visit{" "}
          <a target="_blank" href="https://github.com/TrinhChung">
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
