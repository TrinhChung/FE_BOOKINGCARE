import React, { Component } from "react";
import { Modal, Spin } from "antd";
import "./ModalLoadingOverlay.scss";

class ModalLoadingOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Modal
          open={this.props.isShow}
          onOk={() => this.props.onOk()}
          onCancel={() => this.props.onCancel()}
          maskClosable={false}
          footer={false}
          closable={false}
          zIndex={10000000}
          width={"100%"}
          centered
          className="over-loading-modal"
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Spin size="large" />
          </div>
        </Modal>
      </div>
    );
  }
}

export default ModalLoadingOverlay;
