import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModal: false,
      isOpenEditModal: false,
      userEdit: {},
      currentPage: 1,
      countPage: 10,
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    let response = await getAllUsers(this.state.currentPage);
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.data.users,
        countPage: response.data.countPage,
      });
    }
  };

  handleAddNewUser = () => {
    this.setState({ isOpenModal: true });
  };

  toggleUserModal = () => {
    this.setState({ isOpenModal: false });
  };

  toggleEditUserModal = () => {
    this.setState({ isOpenEditModal: false });
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.message);
      } else {
        await this.getAllUsersFromReact();
        this.setState({ isOpenModal: false });
        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  handleDeleteUser = async (user) => {
    console.log(user);
    try {
      let res = await deleteUserService(user.id);
      if (res && res.errCode === 0) {
        this.getAllUsersFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  editUser = async (user) => {
    try {
      let res = await editUserService(user);

      if (res && res.errCode === 0) {
        this.setState({ isOpenEditModal: false });
        this.getAllUsersFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  handleEditUser = (user) => {
    this.setState({
      isOpenEditModal: true,
      userEdit: user,
    });
  };

  render() {
    return (
      <div className="users=container">
        <ModalUser
          isOpen={this.state.isOpenModal}
          toggleFormParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
          className={"modal-user-container"}
        />

        {this.state.isOpenEditModal && (
          <ModalEditUser
            isOpen={this.state.isOpenEditModal}
            toggleFormParent={this.toggleEditUserModal}
            editUser={this.editUser}
            currentUser={this.state.userEdit}
            className={"modal-user-container"}
          />
        )}

        <div className="title text-center">Manage users with Chung</div>
        <div className="mx-3 my-2">
          <button
            className="btn btn-primary px-3 "
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i>
            Add User
          </button>
        </div>
        <div className="users-table mx-3">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Action</th>
              </tr>

              {this.state.arrUsers.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.email}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.address}</td>
                    <td>
                      <button className="btn-edit">
                        <i
                          className="fas fa-pencil-alt"
                          onClick={() => this.handleEditUser(user)}
                        ></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteUser(user)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
