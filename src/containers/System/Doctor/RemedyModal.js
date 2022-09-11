import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import "./RemedyModal.scss";
import { CommonUtils } from "../../../utils";
import { sendBillAccept } from "../../../services/userService";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay-ts";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      id: 1,
      file: "",
      previewIgmUrl: "",
      isLoading: false,
    };

    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => this.setState({}));
  }

  componentDidMount() {
    if (this.props.email) {
      this.setState({ email: this.props.email });
    }
    if (this.props.id) {
      this.setState({ id: this.props.id });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.email !== this.props.email) {
      this.setState({ email: this.props.email });
    }
    if (prevProps.id !== this.props.id) {
      this.setState({ id: this.props.id });
    }
  }

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

  handleOnChangeImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file && file.size < 10000000) {
      let objectUrl = URL.createObjectURL(file);
      let base64 = await CommonUtils.getBase64(file);
      this.setState({ previewIgmUrl: objectUrl, file: base64 });
    } else {
      event.target.value = "";
      toast.error("Sizeof file larger than allowed");
    }
  };

  handleAddNewUser = async () => {
    let data = {
      id: this.state.id,
      file: this.state.file,
      language: this.props.language,
    };
    this.setState({ isLoading: true });
    let res = await sendBillAccept(data);
    this.setState({ isLoading: false });
    if (res && res.errCode === 0) {
      toast.success("Accept success");
      this.toggle();
      this.props.reloadList();
    } else {
      console.log(res.errMessage);
      toast.error(`Accept error: ${res.errMessage}`);
    }
  };

  render() {
    let { email } = this.state;
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        centered
        backdrop="static"
        className={this.props.className}
        size="lg"
      >
        <LoadingOverlay
          active={this.state.isLoading}
          wrapper
          overlay
          spinner
          text="Loading..."
        >
          <ModalHeader
            toggle={() => this.toggle()}
            className="remedy-modal-header"
          >
            <FormattedMessage id="menu.doctor.remedy-header" />
          </ModalHeader>
          <ModalBody>
            <div className="container row">
              <div className="form-group col-12">
                <label>
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  disabled
                  onChange={(e) => this.onChange(e)}
                ></input>
              </div>
              <div className="form-group col-12">
                <label>
                  <FormattedMessage id="menu.doctor.bill" />
                </label>
                <input
                  type="file"
                  name="file"
                  accept=".xlsx, xls"
                  className="form-control"
                  onChange={(e) => this.handleOnChangeImg(e)}
                ></input>
                <div style={{ color: "red", fontSize: "12px" }}>
                  * Allowed file size is less than 10mb
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className="px-3"
              onClick={() => this.handleAddNewUser()}
            >
              <FormattedMessage id="menu.doctor.send" />
            </Button>{" "}
            <Button
              color="secondary"
              className="px-3"
              onClick={() => this.toggle()}
            >
              <FormattedMessage id="manage-user.close" />
            </Button>
          </ModalFooter>
        </LoadingOverlay>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
