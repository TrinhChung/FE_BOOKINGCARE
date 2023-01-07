import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import ReactPaginate from "react-paginate";
import { Modal } from "antd";
import ModalLoadingOverlay from "../../../components/ModalLoadingOverlay";
class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
      itemOffset: 3,
      loading: false,
      isShowModalConfirm: false,
      idUserEdit: 0,
    };
  }

  componentDidMount() {
    if (this.props.currentPage) {
      this.props.fetchUserRedux(this.props.currentPage);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.currentPage !== this.props.currentPage) {
      if (this.props.currentPage) {
        this.props.fetchUserRedux(this.props.currentPage);
      }
    }

    if (prevProps.users !== this.props.users) {
      this.setState({
        usersRedux: this.props.users,
      });
    }
  }

  handleDeleteUser = async (user) => {
    let res = await this.props.deleteUserRedux(user.id);
    if (res === true && this.props.currentPage) {
      this.props.fetchUserRedux(this.props.currentPage);
    }
  };

  handleEditUser = (user) => {
    this.props.handleEditUser(user.id);
  };

  handleChangePage = (e) => {
    this.props.handleChangePage(e.selected + 1);
  };

  render() {
    let { countPage, currentPage } = this.props;
    let arrUsers = this.state.usersRedux;
    return (
      <>
        <table id="TableManageUser">
          <tbody>
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Action</th>
            </tr>

            {arrUsers &&
              arrUsers.length > 0 &&
              arrUsers.map((user, index) => {
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
                        onClick={() => {
                          this.setState({
                            idUserEdit: user.id,
                            isShowModalConfirm: true,
                          });
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
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
        <Modal
          title="Bạn có muốn xóa người dùng này"
          open={this.state.isShowModalConfirm}
          onOk={() => {
            this.setState({ loading: true });
            this.props.deleteUserRedux(this.state.idUserEdit);
            this.setState({ loading: false, isShowModalConfirm: false });
          }}
          onCancel={() => {
            this.setState({ isShowModalConfirm: false });
          }}
        ></Modal>
        <ModalLoadingOverlay
          isShow={this.state.loading}
          onOk={() => this.setLoading(false)}
          onCancel={() => this.setLoading(false)}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
    countPage: state.admin.countPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: (currentPage) =>
      dispatch(actions.fetchAllUserStart(currentPage)),
    deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
