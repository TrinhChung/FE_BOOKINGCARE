import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "./ManageDoctor.scss";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { LANGUAGES } from "../../../utils";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHtml: "",
      selectedDoctor: "",
      description: "",
      listDoctor: [],
    };
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHtml: html,
    });
  };

  componentDidMount() {
    this.props.fetchAllDoctor();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({ listDoctor: dataSelect });
    }

    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({ listDoctor: dataSelect });
    }
  }

  handleSaveContentMarkDown = () => {
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHtml,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
    });
    console.log("saveContentMarkDown ", this.state);
  };

  handleChange = (selectedDoctor) => {
    this.setState({ selectedDoctor: selectedDoctor });
  };

  handleChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  };

  buildDataInputSelect = (data) => {
    let result = [];
    let language = this.props.language;
    console.log(language);
    if (data && data.length > 0) {
      result = data.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        return object;
      });
    }
    return result;
  };

  render() {
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Tao thong tin bac si</div>
        <div className="more-info my-2">
          <div className="content-left form-group">
            <label>Chon bac si</label>
            <Select
              options={this.state.listDoctor}
              value={this.state.selectedDoctor}
              onChange={this.handleChange}
            />
          </div>
          <div className="content-right form-group">
            <label>Thong tin gioi thieu</label>
            <textarea
              className="form-control"
              rows="4"
              onChange={(e) => this.handleChangeDescription(e)}
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
        <button
          className="save-infor-doctor"
          onClick={() => this.handleSaveContentMarkDown()}
        >
          Luu thong tin
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
