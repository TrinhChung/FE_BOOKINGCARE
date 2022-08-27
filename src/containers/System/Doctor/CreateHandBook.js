import React, { Component } from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { createHandBook } from "../../../services/userService";
import "./CreateHandBook.scss";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import Lightbox from "react-image-lightbox";
import { LANGUAGES, CRUDACTIONS, CommonUtils } from "../../../utils";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class CreateHandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHtml: "",
      name: "",
      errName: false,
      isOpen: false,
      previewIgmUrl: "",
      avatar: "",
    };
  }

  componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  handleCreateHandleBook = async () => {
    if (this.state.name === "") {
      this.setState({ errName: true });
    } else {
      let data = {
        name: this.state.name,
        descriptionHtml: this.state.contentHtml,
        descriptionMarkdown: this.state.contentMarkdown,
        doctorId: this.props.userInfo.id,
        avatar: this.state.avatar,
      };

      let res = await createHandBook(data);

      if (res && res.errCode === 0) {
        toast.success("Create HandBook success");
        this.setState({
          name: "",
          contentHtml: "",
          contentMarkdown: "",
          previewIgmUrl: "",
          errName: false,
        });
      } else {
        toast.error("Create HandBook error");
      }
    }
  };

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

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHtml: html,
    });
  };

  handleInputChange = (e) => {
    this.setState({ name: e.target.value });
  };

  render() {
    let errName = this.state.errName;
    return (
      <div className="create-handbook-container">
        <div className="box-name-handbook">
          <div className="row">
            <div className="col-6 form-group input-name">
              <label>Title HandBook</label>
              <input
                className={`form-control ${errName ? "err" : ""}`}
                value={this.state.name}
                name="name"
                onChange={(e) => this.handleInputChange(e)}
              ></input>
              {errName ? (
                <div style={{ color: "red" }}>Vui long khong bo trong</div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group col-6">
              <label className="form-label">
                <FormattedMessage id="admin.manage-clinic.image-clinic" />
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
                    <FormattedMessage id="admin.manage-clinic.up-load" />
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
        </div>
        <div className="box-markdown">
          <div className="manage-doctor-editor">
            <MdEditor
              style={{ height: "400px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.contentMarkdown}
            />
          </div>
        </div>
        <div className="mt-2">
          <button
            className="btn btn-primary"
            onClick={() => this.handleCreateHandleBook()}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateHandBook);
