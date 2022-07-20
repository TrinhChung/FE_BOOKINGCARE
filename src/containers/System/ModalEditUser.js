import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "......",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }
  }

  toggle = () => {
    this.props.toggleFormParent();
    // console.log(this.props);
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleOnChangeInput = (e) => {
    let copyState = { ...this.state };
    copyState[e.target.name] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid) {
      this.props.editUser(this.state);
    }
  };

  render() {
    console.log(this.props.currentUser);
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={this.props.className}
        size="lg"
      >
        <ModalHeader toggle={() => this.toggle()}>Edit user</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="email"
                name="email"
                onChange={(e) => this.handleOnChangeInput(e)}
                value={this.state.email}
                disabled={true}
              ></input>
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={(e) => this.handleOnChangeInput(e)}
                value={this.state.password}
                disabled={true}
              ></input>
            </div>
            <div className="input-container">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                onChange={(e) => this.handleOnChangeInput(e)}
                value={this.state.firstName}
              ></input>
            </div>
            <div className="input-container">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                onChange={(e) => this.handleOnChangeInput(e)}
                value={this.state.lastName}
              ></input>
            </div>
            <div className="input-container max-width">
              <label>Address</label>
              <input
                type="text"
                name="address"
                onChange={(e) => this.handleOnChangeInput(e)}
                value={this.state.address}
              ></input>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleSaveUser()}
          >
            Save change
          </Button>{" "}
          <Button
            color="secondary"
            className="px-3"
            onClick={() => this.toggle()}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
