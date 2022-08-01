import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchVerifyEmailBooking } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";

class VerifyEmailBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerified: false,
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
        this.setState({ statusVerified: true });
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
            <div style={{ color: "green" }}>Xác nhân thành công!</div>
          ) : (
            <div style={{ color: "orange" }}>
              Lịch hẹn đã xác nhận hoặc không tồn tại!
            </div>
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
