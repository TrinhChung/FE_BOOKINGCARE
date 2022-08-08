import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";
import { userLoginSuccess } from "../../store/actions";

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

  handleLogin = async () => {
    this.setState({ errorMessage: "" });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({ errorMessage: data.message });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log("login success");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({ errorMessage: error.response.data.message });
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
        <div className="login-container">
          <div className="login-content">
            <div className="col-12 text-center fs-3 fw-bold pt-3">Login</div>
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
            <div className="col-12 form-group login-input">
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

            <div className="col-12" styles={{ color: "red" }}>
              {this.state.errorMessage}
            </div>
            <div className="col-12">
              <button
                tabIndex={0}
                className="btn-login"
                onClick={() => this.handleLogin()}
              >
                Login
              </button>
            </div>
            <div className="col-12 forgot-password">
              <span>Forgot your password?</span>
            </div>

            <div className="col-12 text-center">
              <span className="text-other-login">Or login with: </span>
            </div>

            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g icon-google"></i>
              <i className="fab fa-facebook icon-facebook"></i>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
