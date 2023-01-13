import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Footer from "../Footer/Footer";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import * as actions from "../../store/actions";
import { getHistoryBooking } from "../../services/userService";
import ReactPaginate from "react-paginate";
import moment from "moment";
import localization from "moment/locale/ja";

import "./Profile.scss";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      role: "R0",
      gender: "M",
      position: "P0",
      updateInfo: false,
      currentBox: "introduction",
      histories: [],
      countPage: 1,
      currentPage: 1,
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    if (this.state.currentBox === "history") {
      let res = await getHistoryBooking(this.state.currentPage, 10);
      if (res && res.errCode === 0) {
        this.setState({ histories: res.data, countPage: res.countPage });
      }
    }
  }

  jsUcfirst = (language) => {
    if (language === "vi") return "Vi";
    else if (language === "en") return "En";
    else if (language === "jp") return "Jp";
  };

  LetterCapitalize = (str) => {
    return str
      .split(" ")
      .map((item) => item.substring(0, 1).toUpperCase() + item.substring(1))
      .join(" ");
  };

  buildDate = (value) => {
    let language = this.props.language;
    let date =
      language === "vi"
        ? this.LetterCapitalize(
            moment(new Date(+value)).locale("vi").format("dddd-DD/MM/YYYY")
          )
        : language === "en"
        ? moment(new Date(+value)).locale("en").format("dddd-DD/MM/YYYY")
        : moment(new Date(+value)).locale("ja").format("dddd-年M月D日");
    return date;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender:
          this.state.gender !== ""
            ? this.state.gender
            : arrGenders && arrGenders.length > 0
            ? arrGenders[0].keyMap
            : "M",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPosions = this.props.positionRedux;
      this.setState({
        positionArr: arrPosions,
        position:
          arrPosions && arrPosions.length > 0 ? arrPosions[0].keyMap : "P0",
      });
    }

    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "R1",
      });
    }
    if (prevProps.userInfo !== this.props.userInfo) {
      this.setState({
        email: this.props.userInfo.email,
        firstName: this.props.userInfo.firstName,
        lastName: this.props.userInfo.lastName,
        phoneNumber: this.props.userInfo.phoneNumber,
        address: this.props.userInfo.address,
        role: this.props.userInfo.roleId,
        gender: this.props.userInfo.gender,
        position: this.props.userInfo.position,
      });
    }
    if (
      prevState.currentBox !== this.state.currentBox &&
      this.state.currentBox === "history"
    ) {
      let res = await getHistoryBooking(this.state.currentPage, 10);
      if (res && res.errCode === 0) {
        this.setState({ histories: res.data, countPage: res.countPage });
      }
    }
    if (prevState.currentPage !== this.state.currentPage) {
      let res = await getHistoryBooking(this.state.currentPage, 10);
      if (res && res.errCode === 0) {
        this.setState({ histories: res.data, countPage: res.countPage });
      }
    }
  }
  handleOnChangeInput = (e) => {
    let copyState = this.state;
    copyState[e.target.name] = e.target.value;
    this.setState({ ...copyState });
  };

  handleSubmit = async () => {
    const userInfo = this.props.userInfo;
    const data = {
      id: userInfo.id,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      address: this.state.address,
      gender: this.state.gender,
      roleId: userInfo.roleId,
      positionId: userInfo.positionId ? userInfo.positionId : "P0",
    };

    let res = await this.props.updateUserInfo(data);
    console.log(res);

    if (res && res.errCode === 0) {
      this.setState({ updateInfo: false });
      this.props.loginToken();
    }
  };

  profileUser = () => {
    let { language } = this.props;
    let genders = this.props.genderRedux;
    let positions = this.props.positionRedux;
    let roles = this.props.roleRedux;
    let { updateInfo } = this.state;

    return (
      <div className="profile-content">
        <div className="box-info">
          <div className="header">
            <div className="info-title">
              <FormattedMessage id="homepage.profile.introduction.header" />
            </div>
            <div
              className="btn-update"
              onClick={() => this.setState({ updateInfo: true })}
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
            </div>
          </div>
          <div className="wrap-info container">
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  required
                  value={this.state.email}
                  disabled={!updateInfo}
                  onChange={(e) => this.handleOnChangeInput(e)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  <FormattedMessage id="manage-user.firstName" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  disabled={!updateInfo}
                  value={this.state.firstName}
                  onChange={(e) => this.handleOnChangeInput(e)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  <FormattedMessage id="manage-user.lastName" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={this.state.lastName}
                  disabled={!updateInfo}
                  onChange={(e) => this.handleOnChangeInput(e)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  <FormattedMessage id="manage-user.phoneNumber" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="phoneNumber"
                  value={this.state.phoneNumber}
                  disabled={!updateInfo}
                  onChange={(e) => this.handleOnChangeInput(e)}
                />
              </div>

              <div className="col-md-6">
                <label for="inputState" className="form-label">
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  id="inputState"
                  className="form-select"
                  name="gender"
                  disabled={!updateInfo}
                  value={this.state.gender}
                  onChange={(e) => this.handleOnChangeInput(e)}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((gender, index) => {
                      return (
                        <option key={index} value={gender.keyMap}>
                          {language === "vi" ? gender.valueVi : gender.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="col-6">
                <label for="inputState" className="form-label">
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select
                  id="inputState"
                  className="form-select"
                  name="position"
                  disabled={true}
                  value={this.state.position}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((position, index) => {
                      return (
                        <option key={index} value={position.keyMap}>
                          {language === "vi"
                            ? position.valueVi
                            : position.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-6 mt-3">
                <label for="inputState" className="form-label">
                  <FormattedMessage id="manage-user.roleId" />
                </label>
                <select
                  id="inputState"
                  className="form-select"
                  name="role"
                  disabled={true}
                  value={this.state.roleId}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((role, index) => {
                      return (
                        <option key={index} value={role.keyMap}>
                          {language === "vi" ? role.valueVi : role.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-6 mt-3">
                <label for="inputAddress" className="form-label">
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                  disabled={!updateInfo}
                  value={this.state.address}
                  name="address"
                  onChange={(e) => this.handleOnChangeInput(e)}
                />
              </div>
            </div>
            {updateInfo && (
              <div>
                <button
                  className="btn btn-primary mt-4"
                  onClick={() => this.handleSubmit()}
                >
                  Submit
                </button>
                <button
                  className="btn btn-warning mt-4 mx-2"
                  onClick={() => this.setState({ updateInfo: false })}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  handleChangePage = (e) => {
    this.setState({ currentPage: e.selected + 1 });
  };

  historyUser = () => {
    let { histories, countPage, currentPage } = this.state;
    console.log(histories);
    return (
      <div className="profile-content">
        <div className="box-info">
          <div className="header">
            <div className="info-title">
              <FormattedMessage id="homepage.profile.history.title" />
            </div>
          </div>
          <div className="wrap-info container">
            <table id="TableManageUser" className="table">
              <tbody className="table-body">
                <tr className="header-table">
                  <th>STT</th>
                  <th>
                    <FormattedMessage id="homepage.profile.history.table.doctor" />
                  </th>
                  <th>
                    <FormattedMessage id="homepage.profile.history.table.date" />
                  </th>
                  <th>
                    <FormattedMessage id="homepage.profile.history.table.time" />
                  </th>
                  <th>
                    <FormattedMessage id="homepage.profile.history.table.bill" />
                  </th>
                </tr>

                {histories &&
                  histories.length > 0 &&
                  histories.map((history, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {history.bookingData.doctorPatientData.firstName +
                            " " +
                            history.bookingData.doctorPatientData.lastName}
                        </td>
                        <td>{this.buildDate(history.bookingData.date)}</td>
                        <td>
                          {history.bookingData.timeTypeDataBooking.valueVi}
                        </td>
                        <td className="wrap-file">
                          <a href={history.files} download>
                            <div className="fileExcel">
                              <i
                                className="icon fa fa-file-excel-o"
                                aria-hidden="true"
                              ></i>
                              <div className="text">
                                <div className="name">Bill.xlsx</div>
                                <div className="size">Size</div>
                              </div>
                            </div>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className="d-flex justify-content-center mt-2">
              <ReactPaginate
                pageCount={countPage}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={(e) => this.handleChangePage(e)}
                forcePage={currentPage - 1}
                pageClassName="page-item"
                activeClassName="active"
                nextLinkClassName="page-link"
                previousLinkClassName="page-link"
                previousClassName="page-item"
                pageLinkClassName="page-link"
                nextClassName="page-item"
                containerClassName="pagination"
                breakLinkClassName="page-link"
                breakClassName="page-item"
                breakLabel="..."
                nextLabel="Next"
                previousLabel="Previous"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    let { userInfo, language } = this.props;
    let check =
      userInfo.image === "" ||
      userInfo.image === undefined ||
      userInfo.image === null;
    let backgroundImage = {
      backgroundImage: `url(${userInfo.image})`,
    };

    let name =
      this.props.language === LANGUAGES.VI
        ? userInfo.firstName + " " + userInfo.lastName
        : userInfo.lastName + " " + userInfo.firstName;

    return (
      <div className="home-page">
        <HomeHeader isShowBanner={false} />
        <div className="profile-body">
          <div className="profile-container">
            <div className="profile-header">
              <div className="profile-background"></div>
              <div className="box-avatar">
                <div className="wrap-avatar">
                  <div className="border-avatar">
                    <div
                      className="avatar"
                      style={!check ? backgroundImage : {}}
                    ></div>
                  </div>
                </div>
                <div className="wrap-name">
                  <div className="name">{name}</div>
                  <div className="role">
                    {userInfo && userInfo.roleData
                      ? userInfo.roleData[`value${this.jsUcfirst(language)}`]
                      : ""}
                  </div>
                </div>
              </div>
              <hr />
              <div className="navbar">
                <div
                  name="introduction"
                  className={`text-content ${
                    this.state.currentBox === "introduction" ? "active" : ""
                  }`}
                  onClick={(e) =>
                    this.setState({ currentBox: e.target.getAttribute("name") })
                  }
                >
                  <FormattedMessage id="homepage.profile.introduction.title" />
                </div>
                <div
                  className={`text-content ${
                    this.state.currentBox === "history" ? "active" : ""
                  }`}
                  name="history"
                  onClick={(e) =>
                    this.setState({ currentBox: e.target.getAttribute("name") })
                  }
                >
                  <FormattedMessage id="homepage.profile.history.title" />
                </div>
              </div>
            </div>
            {this.state.currentBox === "introduction"
              ? this.profileUser()
              : null}
            {this.state.currentBox === "history" ? this.historyUser() : null}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    updateUserInfo: (data) => dispatch(actions.EditAUser(data)),
    loginToken: () => dispatch(actions.loginToken()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
