import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import "./RemedyModal.scss";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => this.setState({}));
  }

  componentDidMount() {}

  toggle = () => {
    this.props.toggleFormParent();
  };

  handleOnChangeInput = (e) => {
    let copyState = { ...this.state };
    copyState[e.target.name] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  //   handleAddNewUser = () => {
  //     let isValid = this.checkValidateInput();
  //     if (isValid) {
  //       this.props.createNewUser(this.state);
  //     }
  //   };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={this.props.className}
        size="lg"
      >
        <ModalHeader
          toggle={() => this.toggle()}
          className="remedy-modal-header"
        >
          Xác nhận khám bệnh và gửi hóa đơn
        </ModalHeader>
        <ModalBody>
          <div className="container row">
            <div className="form-group col-12">
              <label>Email benh nhan</label>
              <input type="text" className="form-control"></input>
            </div>
            <div className="form-group col-12">
              <label>Email benh nhan</label>
              <input type="file" className="form-control"></input>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            // onClick={() => this.handleAddNewUser()}
          >
            Add new
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
