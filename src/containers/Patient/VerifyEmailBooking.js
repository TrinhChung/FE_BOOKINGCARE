import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchVerifyEmailBooking } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";

class VerifyEmailBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerified: false,
      errMessage: "",
    };
  }

  async componentDidMount() {
    if (
      this.props.match.params &&
      this.props.match.params.token &&
      this.props.match.params.doctorId
    ) {
      console.log(this.props.match.params.doctorId);
      let res = await fetchVerifyEmailBooking(
        this.props.match.params.token,
        this.props.match.params.doctorId
      );

      if (res && res.errCode === 0) {
        this.setState({ statusVerified: true, errMessage: res.errMessage });
      } else {
        this.setState({ statusVerified: false, errMessage: res.errMessage });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    return (
      <>
        <HomeHeader />
        <div
          style={{
            marginTop: "100px",
            fontSize: "20px",
            fontWeight: "bold",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          {this.state.statusVerified ? (
            <div style={{ color: "green" }}>{this.state.errMessage}</div>
          ) : (
            <div style={{ color: "orange" }}>{this.state.errMessage}</div>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailBooking);
