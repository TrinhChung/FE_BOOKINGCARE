import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { FormattedMessage } from "react-intl";

import { createSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";
import ModalLoadingOverlay from "../../../components/ModalLoadingOverlay";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      previewIgmUrl: "",
      avatar: "",
      descriptionHtml: "",
      descriptionMarkdown: "",
      nameClinic: "",
      loading: false,
    };
  }

  componentDidMount() {}

  handleOnChangeImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      this.setState({ previewIgmUrl: objectUrl, avatar: file });
    }
  };

  openPreviewImg = () => {
    if (!this.state.previewIgmUrl) {
    } else {
      this.setState({ isOpen: true });
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  handleOnChangeInput = (e) => {
    let copyState = { ...this.state };
    copyState[e.target.name] = e.target.value;
    this.setState({ ...copyState });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: text,
      descriptionHtml: html,
    });
  };

  saveSpecialty = async () => {
    this.setState({ loading: true });
    let res = await createSpecialty({
      name: this.state.nameClinic,
      image: this.state.avatar,
      descriptionHtml: this.state.descriptionHtml,
      descriptionMarkdown: this.state.descriptionMarkdown,
    });

    if (res && res.errCode === 0) {
      toast.success("Add new specialty success!");
    } else {
      toast.error("Add failed");
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <div className="manage-specialty-container">
        <ModalLoadingOverlay
          open={this.state.loading}
          onOk={() => this.setState({ loading: false })}
          onCancel={() => this.setState({ loading: false })}
        />
        <div className="manage-specialty-header">
          <FormattedMessage id="admin.manage-specialty.manage-specialty" />
        </div>

        <div className="add-new-specialty">
          <div className="row">
            <div className="form-group col-6">
              <label>
                <FormattedMessage id="admin.manage-specialty.name-specialty" />
              </label>
              <input
                type="text"
                value={this.state.nameClinic}
                className="form-control"
                name="nameClinic"
                onChange={(e) => this.handleOnChangeInput(e)}
              />
            </div>
            <div className="form-group col-6">
              <label className="form-label">
                <FormattedMessage id="admin.manage-specialty.image-specialty" />
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
                    <FormattedMessage id="admin.manage-specialty.up-load" />
                    <i className="fas fa-upload"></i>
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
          </div>
          <MdEditor
            style={{ height: "300px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>

        <div className="btn-save-specialty">
          <button
            className="btn-save-specialty"
            onClick={() => this.saveSpecialty()}
          >
            <FormattedMessage id="admin.manage-specialty.save" />
          </button>
        </div>
        <div className="list-specialty"></div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
