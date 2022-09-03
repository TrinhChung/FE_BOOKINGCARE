import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { CommonUtils } from "../../../utils";
import { createSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";

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
    };
  }

  componentDidMount() {}

  handleOnChangeImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      let base64 = await CommonUtils.getBase64(file);
      this.setState({ previewIgmUrl: objectUrl, avatar: base64 });
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
    let res = await createSpecialty({
      name: this.state.nameClinic,
      avatar: this.state.avatar,
      descriptionHtml: this.state.descriptionHtml,
      descriptionMarkdown: this.state.descriptionMarkdown,
    });

    if (res && res.errCode === 0) {
      toast.success("Add new specialty success!");
    } else {
      console.log(res.errMessage);
      toast.error("Add failed");
    }
  };

  render() {
    return (
      <div className="manage-specialty-container">
        <div className="manage-specialty-header">Manage Specialty</div>

        <div className="add-new-specialty">
          <div className="row">
            <div className="form-group col-6">
              <label>Ten chuyen khoa</label>
              <input
                type="text"
                value={this.state.nameClinic}
                className="form-control"
                name="nameClinic"
                onChange={(e) => this.handleOnChangeInput(e)}
              />
            </div>
            <div className="form-group col-6">
              <label className="form-label">Anh chuyen khoa</label>
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
                    Tải ảnh<i className="fas fa-upload"></i>
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
            Save
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
