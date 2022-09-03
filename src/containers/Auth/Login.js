import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";

import "./Login.scss";
import { handleLoginApi } from "../../services/userService";
import { Link, withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errorMessage: "",
    };
  }

  handleOnChangeUserName = (e) => {
    this.setState({ username: e.target.value });
  };

  handleOnChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleRegister = () => {
    this.props.history.push("/register");
  };

  handleLogin = async () => {
    this.setState({ errorMessage: "" });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({ errorMessage: data.errMessage });
      }
      if (data && data.errCode === 0) {
        localStorage.setItem("token", data.token);
        this.props.userLoginSuccess(data.user);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({ errorMessage: error.response.data.errMessage });
        }
      }
    }
  };

  handleKeyDownLogin = (e) => {
    if (e.key === "Enter") {
      this.handleLogin();
    }
  };

  handleShowHiddenPassword = () => {
    this.setState({ isShowPassword: !this.state.isShowPassword });
  };

  render() {
    return (
      <div className="login-background">
        <div className="login-header-text">
          <p>Welcome to booking care</p>
        </div>
        <div className="login-container">
          <div className="login-content-left"></div>
          <div className="login-content-right">
            <div className="logo"></div>
            <div className="col-12 login-header fs-3 fw-bold pt-3">
              Login NOW
            </div>
            <div className="col-12 form-group login-input">
              <label>Email</label>
              <input
                type="text"
                name="email"
                className="form-control "
                placeholder="Enter your email"
                value={this.state.username}
                onChange={(e) => this.handleOnChangeUserName(e)}
              ></input>
            </div>
            <div
              className={`col-12 form-group login-input ${
                this.state.errorMessage.length > 0 ? "mb-0" : ""
              }`}
            >
              <label>Password</label>

              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control "
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(e) => this.handleOnChangePassword(e)}
                  onKeyDown={(e) => this.handleKeyDownLogin(e)}
                ></input>
                <span onClick={() => this.handleShowHiddenPassword()}>
                  <i
                    className={`far fa-eye${
                      this.state.isShowPassword ? "" : "-slash"
                    }`}
                  ></i>
                </span>
              </div>
            </div>

            <div
              className="col-12"
              style={{ color: "red", fontSize: "10px", marginTop: "0px" }}
            >
              {this.state.errorMessage}
            </div>
            <div className="textLink">
              <div className="forgot-password">
                <Link to="/forgot-password">Forgot your password?</Link>
              </div>
            </div>
            <div className="col-12 d-flex justify-content-center">
              <button
                tabIndex={0}
                className="btn-login"
                onClick={() => this.handleLogin()}
              >
                Login
              </button>
            </div>

            <div className="switch-register">
              <div className="text-switch">
                Tao tai khoan moi tai day
                <i
                  className="mx-2 fa fa-long-arrow-right"
                  aria-hidden="true"
                ></i>
              </div>
              <button onClick={() => this.handleRegister()}>Click here</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
