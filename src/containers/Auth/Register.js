import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { toast } from "react-toastify";

import * as actions from "../../store/actions";

import "./Register.scss";
import { FormattedMessage } from "react-intl";
import { createNewUserService } from "../../services/userService";
import { Link } from "react-router-dom";
import { USER_ROLE } from "../../utils";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      lastName: "",
      firstName: "",
      isShowPassword: false,
      errorMessage: "",
    };
  }

  handleOnChangeInput = (e) => {
    let copyState = this.state;
    copyState[e.target.name] = e.target.value;
    this.setState({ ...copyState });
  };

  handleOnChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleLogin = () => {
    this.props.history.push("/login");
  };

  handleRegister = async () => {
    this.setState({ errorMessage: "" });
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ errorMessage: "Missing confirm password" });
    } else {
      try {
        let sendData = {
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          address: "",
          phoneNumber: this.state.phoneNumber,
          gender: "M",
          roleId: USER_ROLE.USER,
          positionId: "P0",
        };
        let data = await createNewUserService(sendData);
        if (data && data.errCode !== 0) {
          toast.ERROR("REGISTER USER FAILED");
          this.setState({ errorMessage: data.message });
        }
        if (data && data.errCode === 0) {
          toast.success("REGISTER USER SUCCESS");
          this.props.userRegisterSuccess(data.user);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.data) {
            this.setState({ errorMessage: error.response.data.message });
          }
        }
      }
    }
  };

  handleKeyDownRegister = (e) => {
    if (e.key === "Enter") {
      this.handleRegister();
    }
  };

  handleShowHiddenPassword = () => {
    this.setState({ isShowPassword: !this.state.isShowPassword });
  };

  render() {
    return (
      <div className="register-background">
        <div className="register-header-text">
          <p>Welcome to booking care</p>
        </div>
        <div className="register-container">
          <div className="register-content-left"></div>
          <div className="register-content-right">
            <div className="row">
              <div className="register-header">
                <div className="logo"></div>
                <div className="register-header-text">Register</div>
              </div>

              <div className="col-12 form-group register-input">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  className="form-control "
                  placeholder="Enter your email"
                  value={this.state.email}
                  onChange={(e) => this.handleOnChangeInput(e)}
                ></input>
              </div>
              <div className="col-12 form-group register-input">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  className="form-control "
                  placeholder="Enter your phoneNumber"
                  value={this.state.phoneNumber}
                  onChange={(e) => this.handleOnChangeInput(e)}
                ></input>
              </div>
              <div className="col-6 form-group register-input">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control "
                  placeholder="Enter your firstName"
                  value={this.state.firstName}
                  onChange={(e) => this.handleOnChangeInput(e)}
                ></input>
              </div>
              <div className="col-6 form-group register-input">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control "
                  placeholder="Enter your lastName"
                  value={this.state.lastName}
                  onChange={(e) => this.handleOnChangeInput(e)}
                ></input>
              </div>
              <div className="col-12 form-group register-input">
                <label>Password</label>
                <div className="custom-input-password">
                  <input
                    type={this.state.isShowPassword ? "text" : "password"}
                    className="form-control "
                    placeholder="Enter your password"
                    name="password"
                    value={this.state.password}
                    onChange={(e) => this.handleOnChangeInput(e)}
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
              <div className="col-12 form-group register-input">
                <label>Confirm Password</label>
                <div className="custom-input-password">
                  <input
                    type={this.state.isShowPassword ? "text" : "password"}
                    className="form-control "
                    name="confirmPassword"
                    placeholder="Enter your Confirm password"
                    value={this.state.confirmPassword}
                    onChange={(e) => this.handleOnChangeInput(e)}
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

              <div className="col-12" style={{ color: "red" }}>
                {this.state.errorMessage}
              </div>
              <div className="col-12 d-flex justify-content-center">
                <button
                  tabIndex={0}
                  className="btn-register"
                  onClick={() => this.handleRegister()}
                >
                  Register
                </button>
              </div>
              <div className="switch-register">
                <div className="text-switch">
                  Bạn đã có tài khoản
                  <i
                    className="mx-2 fa fa-long-arrow-right"
                    aria-hidden="true"
                  ></i>
                </div>
                <button onClick={() => this.handleLogin()}>Click here</button>
              </div>
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
    userRegisterFail: () => dispatch(actions.userRegisterFail()),
    userRegisterSuccess: (userInfo) =>
      dispatch(actions.userRegisterSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
