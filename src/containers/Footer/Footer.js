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
        <div className="footer-top">
          <div className="box-left">
            <div className="logo"></div>
            <div className="text-left">
              <div
                className="mt-2"
                style={{ fontWeight: "bold", fontSize: "16px" }}
              >
                Ứng dụng Web BookingCare
              </div>
              <div className="my-2">
                <i
                  className="fa fa-check"
                  aria-hidden="true"
                  style={{ marginRight: "4px" }}
                >
                  {" "}
                </i>
                Developer: Trịnh Văn Chung
              </div>
              <div className="my-2">
                <i
                  className="fa fa-clock-o"
                  aria-hidden="true"
                  style={{ marginRight: "4px" }}
                >
                  {" "}
                </i>
                Thời gian phát triển 12/09/2022
              </div>
              <div className="logo-sub">
                <div className="logo"></div>
                <div className="logo"></div>
              </div>
            </div>
          </div>
          <div className="box-center">
            <div className="box-title">Các công nghệ sử dụng</div>
            <div className="text">ReactJS Class Component</div>
            <div className="text">Redux</div>
            <div className="text">NodeJs</div>
            <div className="text">Express</div>
            <div className="text">MySQL</div>
          </div>
          <div className="box-right">
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>Liên hệ</div>
            <div style={{ fontSize: "16px" }}>
              Email: chungtrinh2k2@gmail.com
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="m-0">
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
