import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; //
import * as actions from "../../../store/actions";
import TableManageUser from "./TableManageUser";
import { toast } from "react-toastify";
import { LANGUAGES, CRUDACTIONS, CommonUtils } from "../../../utils";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: CRUDACTIONS.CREATE,
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewIgmUrl: "",
      isOpen: false,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
      userId: 0,
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPosions = this.props.positionRedux;
      this.setState({
        positionArr: arrPosions,
        position:
          arrPosions && arrPosions.length > 0 ? arrPosions[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }
    if (prevProps.users !== this.props.users) {
      let arrGenders = this.props.genderRedux;
      let arrPosions = this.props.positionRedux;
      let arrRoles = this.props.roleRedux;

      this.setState({
        action: CRUDACTIONS.CREATE,
        previewIgmUrl: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        position:
          arrPosions && arrPosions.length > 0 ? arrPosions[0].keyMap : "",
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
        avatar: "",
      });
    }
  }

  handleOnChangeImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      let base64 = await CommonUtils.getBase64(file);
      this.setState({ previewIgmUrl: objectUrl, avatar: base64 });
    }
  };

  onChangeInput = (event) => {
    let copyState = { ...this.state };
    copyState[event.target.name] = event.target.value;
    this.setState({ ...copyState });
  };

  openPreviewImg = () => {
    if (!this.state.previewIgmUrl) {
    } else {
      this.setState({ isOpen: true });
    }
  };

  handleSaveUser = async () => {
    let isValid = this.checkValidateInput();

    if (isValid) {
      if (this.state.action === CRUDACTIONS.CREATE) {
        await this.props.createNewUser({
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          address: this.state.address,
          phoneNumber: this.state.phoneNumber,
          gender: this.state.gender,
          avatar: this.state.avatar,
          role: this.state.role,
          position: this.state.position,
        });
        this.props.fetchUserRedux();
      } else if (this.state.action === CRUDACTIONS.EDIT) {
        await this.props.EditAUserRedux({
          id: this.state.userId,
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          address: this.state.address,
          phoneNumber: this.state.phoneNumber,
          gender: this.state.gender,
          avatar: this.state.avatar,
          roleId: this.state.role,
          positionId: this.state.position,
        });
      }
    }
  };

  handleEditUser = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }

    this.setState({
      action: CRUDACTIONS.EDIT,
      previewIgmUrl: imageBase64,
      email: user.email,
      password: "hashcode",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      avatar: "",
      userId: user.id,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        toast.error("This input is required " + arrCheck[i] + " not null");
        break;
      }
    }
    return isValid;
  };

  render() {
    let genders = this.props.genderRedux;
    let positions = this.props.positionRedux;
    let roles = this.props.roleRedux;

    let language = this.props.language;
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      role,
      gender,
      position,
      action,
    } = this.state;

    return (
      <div className="user-redux-container">
        <div className="title">User redux</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              {/* <form className="row g-3"> */}
              <div className="col-md-6">
                <label className="form-label">
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  disabled={CRUDACTIONS.EDIT === this.state.action}
                  onChange={(event) => this.onChangeInput(event)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  disabled={CRUDACTIONS.EDIT === this.state.action}
                  onChange={(event) => this.onChangeInput(event)}
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
                  value={firstName}
                  onChange={(event) => this.onChangeInput(event)}
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
                  value={lastName}
                  onChange={(event) => this.onChangeInput(event)}
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
                  value={phoneNumber}
                  onChange={(event) => this.onChangeInput(event)}
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
                  onChange={(event) => this.onChangeInput(event)}
                  value={gender}
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
                <div className="col-12">
                  <label for="inputState" className="form-label">
                    <FormattedMessage id="manage-user.position" />
                  </label>
                  <select
                    id="inputState"
                    className="form-select"
                    name="position"
                    value={position}
                    onChange={(event) => this.onChangeInput(event)}
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
                <div className="col-12 mt-3">
                  <label for="inputState" className="form-label">
                    <FormattedMessage id="manage-user.roleId" />
                  </label>
                  <select
                    id="inputState"
                    className="form-select"
                    name="role"
                    value={role}
                    onChange={(event) => this.onChangeInput(event)}
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
                <div className="col-12 mt-3">
                  <label for="inputAddress" className="form-label">
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="1234 Main St"
                    value={address}
                    name="address"
                    onChange={(event) => this.onChangeInput(event)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div className="preview-image-container">
                  <div>
                    <input
                      type="file"
                      id="previewImg"
                      className="form-control"
                      name="avatar"
                      hidden="true"
                      accept="image/png, image/gif, image/jpeg"
                      onChange={(event) => this.handleOnChangeImg(event)}
                    />
                    <label htmlFor="previewImg" className="label-upload">
                      Tải ảnh<i className="fas fa-upload"></i>
                    </label>
                  </div>
                  <div
                    className="preview-img"
                    style={{
                      backgroundImage: `url(${this.state.previewIgmUrl})`,
                    }}
                    onClick={() => this.openPreviewImg()}
                  ></div>

                  {this.state.isOpen && (
                    <Lightbox
                      mainSrc={this.state.previewIgmUrl}
                      onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                  )}
                </div>
              </div>

              <div className="col-12 my-3">
                <button
                  type="submit"
                  className={`btn btn-${
                    action === CRUDACTIONS.CREATE ? "primary" : "warning"
                  } px-2`}
                  onClick={() => this.handleSaveUser()}
                >
                  {action === CRUDACTIONS.CREATE ? (
                    <FormattedMessage id="manage-user.save" />
                  ) : (
                    <FormattedMessage id="manage-user.edit" />
                  )}
                </button>
              </div>
            </div>
            <TableManageUser handleEditUser={this.handleEditUser} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender,
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    EditAUserRedux: (data) => dispatch(actions.EditAUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
