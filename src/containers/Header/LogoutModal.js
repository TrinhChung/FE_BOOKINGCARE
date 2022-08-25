import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./LogoutModal.scss";
import * as actions from "../../store/actions";

class LogoutModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  toggle = () => {
    this.props.toggleFormParent();
  };

  handleAddNewUser = () => {
    this.props.processLogout();
    this.toggle();
  };

  render() {
    return (
      <div className="logout">
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => this.toggle()}
          size="lg"
        >
          <ModalHeader
            toggle={() => this.toggle()}
            className={this.props.homeHeader ? "header-home-page" : ""}
          >
            Logout
          </ModalHeader>
          <ModalBody>
            <div className="content-modal">Ban co muon dang xuat khong?</div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className="px-3 btn-logout"
              onClick={() => this.handleAddNewUser()}
            >
              Accept
            </Button>
            <Button
              color="secondary"
              className="px-3"
              onClick={() => this.toggle()}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutModal);
