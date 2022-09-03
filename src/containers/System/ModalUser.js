import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };

    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () =>
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
      })
    );
  }

  componentDidMount() {}

  toggle = () => {
    this.props.toggleFormParent();
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

  handleAddNewUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid) {
      this.props.createNewUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={this.props.className}
        size="lg"
      >
        <ModalHeader toggle={() => this.toggle()}>
          <FormattedMessage id="manage-user.add" />
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>
                <FormattedMessage id="manage-user.email" />
              </label>
              <input
                type="email"
                name="email"
                onChange={(e) => this.handleOnChangeInput(e)}
                value={this.state.email}
              ></input>
            </div>
            <div className="input-container">
              <label>
                <FormattedMessage id="manage-user.password" />
              </label>
              <input
                type="password"
                name="password"
                onChange={(e) => this.handleOnChangeInput(e)}
                value={this.state.password}
              ></input>
            </div>
            <div className="input-container">
              <label>
                <FormattedMessage id="manage-user.firstName" />
              </label>
              <input
                type="text"
                name="firstName"
                onChange={(e) => this.handleOnChangeInput(e)}
                value={this.state.firstName}
              ></input>
            </div>
            <div className="input-container">
              <label>
                <FormattedMessage id="manage-user.lastName" />
              </label>
              <input
                type="text"
                name="lastName"
                onChange={(e) => this.handleOnChangeInput(e)}
                value={this.state.lastName}
              ></input>
            </div>
            <div className="input-container max-width">
              <label>
                <FormattedMessage id="manage-user.address" />
              </label>
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
            onClick={() => this.handleAddNewUser()}
          >
            <FormattedMessage id="manage-user.add" />
          </Button>{" "}
          <Button
            color="secondary"
            className="px-3"
            onClick={() => this.toggle()}
          >
            <FormattedMessage id="manage-user.add" />
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
