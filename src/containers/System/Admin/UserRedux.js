import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
import "react-image-lightbox/style.css"; //
import * as actions from "../../../store/actions";
import TableManageUser from "./TableManageUser";
import { CRUDACTIONS } from "../../../utils";
import ModalUser from "./ModalUser";
import ModalLoadingOverlay from "../../../components/ModalLoadingOverlay";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: CRUDACTIONS.CREATE,
      currentPage: 1,
      isOpenModal: false,
      userEdit: {},
      idUserEdit: 0,
      loading: false,
    };
  }

  componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  setLoading = (value) => {
    this.setState({ loading: value });
  };

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

  handleAddNewUser = () => {
    this.setState({ action: CRUDACTIONS.CREATE, isOpenModal: true });
  };

  handleEditUser = (id) => {
    console.log(id);
    this.setState({
      action: CRUDACTIONS.EDIT,
      isOpenModal: true,
      idUserEdit: id,
    });
  };

  handleChangePage = (page) => {
    this.setState({ currentPage: page });
  };

  toggleUserModal = () => {
    this.setState({ isOpenModal: false });
  };

  render() {
    return (
      <div className="user-redux-container">
        <ModalUser
          isOpen={this.state.isOpenModal}
          toggleFormParent={this.toggleUserModal}
          action={this.state.action}
          currentPage={this.state.currentPage}
          idUserEdit={this.state.idUserEdit}
          setLoading={this.setLoading}
        />
        <ModalLoadingOverlay
          isShow={this.state.loading}
          onOk={() => this.setLoading(false)}
          onCancel={() => this.setLoading(false)}
        />

        <div className="title">ADMIN</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="mx-3 my-2">
              <button
                className="btn btn-primary px-3 "
                onClick={() => this.handleAddNewUser()}
              >
                <i className="fas fa-plus"></i>
                <FormattedMessage id="manage-user.add" />
              </button>
            </div>
            <TableManageUser
              isOpen={this.state.isOpenModal}
              handleAddNewUser={this.handleAddNewUser}
              toggleFormParent={this.toggleUserModal}
              handleEditUser={this.handleEditUser}
              currentPage={this.state.currentPage}
              handleChangePage={this.handleChangePage}
            />
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
    countPage: state.admin.countPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    EditAUserRedux: (data) => dispatch(actions.EditAUser(data)),
    fetchUserRedux: (currentPage) =>
      dispatch(actions.fetchAllUserStart(currentPage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
