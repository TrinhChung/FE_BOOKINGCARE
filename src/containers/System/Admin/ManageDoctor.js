import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "./ManageDoctor.scss";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { LANGUAGES, CRUDACTIONS } from "../../../utils";
import { getDetailDoctorService } from "../../../services/userService";
import { FormattedMessage } from "react-intl";

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
      listPrice: [],
      listPayment: [],
      listProvince: [],

      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
      hasOldData: false,
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
    this.props.getRequiredDoctorInfo();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.allDoctors !== this.props.allDoctors ||
      prevProps.language !== this.props.language
    ) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({ listDoctor: dataSelect });
    }

    if (
      prevProps.prices !== this.props.prices ||
      prevProps.language !== this.props.language
    ) {
      let dataSelect = this.buildDataInputSelectRequired(this.props.prices);
      this.setState({ listPrice: dataSelect });
    }

    if (
      prevProps.payments !== this.props.payments ||
      prevProps.language !== this.props.language
    ) {
      let dataSelect = this.buildDataInputSelectRequired(this.props.payments);
      this.setState({ listPayment: dataSelect });
    }

    if (
      prevProps.provinces !== this.props.provinces ||
      prevProps.language !== this.props.language
    ) {
      let dataSelect = this.buildDataInputSelectRequired(this.props.provinces);
      this.setState({ listProvince: dataSelect });
    }
  }

  handleSaveContentMarkDown = () => {
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHtml,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      action:
        this.state.hasOldData === true ? CRUDACTIONS.EDIT : CRUDACTIONS.CREATE,
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
    });
    console.log("saveContentMarkDown ", this.state);
  };

  buildResSelect = (key, data, name) => {
    console.log(data);
    let language = this.props.language;
    let object = {};
    if (name === "PRICE") {
      let labelVi = data.valueVi + " VNĐ";
      let labelEn = data.valueEn + " USD";
      object.label = language === LANGUAGES.VI ? labelVi : labelEn;
      object.value = key;
      return object;
    } else {
      let labelVi = data.valueVi;
      let labelEn = data.valueEn;
      object.label = language === LANGUAGES.VI ? labelVi : labelEn;
      object.value = key;
      return object;
    }
  };

  handleChange = async (selectedDoctor) => {
    this.setState({ selectedDoctor: selectedDoctor });
    let res = await getDetailDoctorService(selectedDoctor.value);
    console.log(this.setState.selectedPrice);
    if (
      res &&
      res.errCode === 0 &&
      res.data &&
      res.data.Markdown &&
      res.data.DoctorInfo
    ) {
      let markdown = res.data.Markdown;
      let selectPrice = this.buildResSelect(
        res.data.DoctorInfo.priceId,
        res.data.DoctorInfo.priceData,
        "PRICE"
      );
      let selectPayment = this.buildResSelect(
        res.data.DoctorInfo.paymentId,
        res.data.DoctorInfo.paymentData,
        "PAYMENT"
      );
      let selectProvince = this.buildResSelect(
        res.data.DoctorInfo.provinceId,
        res.data.DoctorInfo.provinceData,
        "PROVINCE"
      );

      this.setState({
        description: markdown.description,
        contentMarkdown: markdown.contentMarkdown,
        contentHtml: markdown.contentHTML,

        addressClinic: res.data.DoctorInfo.addressClinic,
        nameClinic: res.data.DoctorInfo.nameClinic,
        note: res.data.DoctorInfo.note,

        selectedPrice: selectPrice,
        selectedPayment: selectPayment,
        selectedProvince: selectProvince,

        hasOldData: true,
      });
    } else {
      this.setState({
        description: "",
        contentMarkdown: "",
        contentHtml: "",

        addressClinic: "",
        nameClinic: "",
        note: "",

        selectedPrice: "",
        selectedPayment: "",
        selectedProvince: "",
        hasOldData: false,
      });
    }
  };

  handleChangSelect = async (selected, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };

    stateCopy[stateName] = selected;
    this.setState({
      ...stateCopy,
    });
  };

  handleChangeInputText = (e) => {
    let stateName = e.target.name;
    let stateCopy = { ...this.state };
    console.log(e.target.value);
    stateCopy[stateName] = e.target.value;
    this.setState({ ...stateCopy });
  };

  buildDataInputSelectRequired = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      if (data[0].type === "PRICE") {
        result = data.map((item, index) => {
          let object = {};
          let labelVi = item.valueVi + " VNĐ";
          let labelEn = item.valueEn + " USD";
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          return object;
        });
      } else {
        result = data.map((item, index) => {
          let object = {};
          let labelVi = item.valueVi;
          let labelEn = item.valueEn;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          return object;
        });
      }
    }
    return result;
  };

  buildDataInputSelect = (data) => {
    let result = [];

    let language = this.props.language;
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
        <div className="manage-doctor-title">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>

        <div className="more-info my-2">
          <div className="row">
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.select-doctor" />
              </label>
              <Select
                options={this.state.listDoctor}
                value={this.state.selectedDoctor}
                onChange={this.handleChange}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.select-doctor" />
                }
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.price" />
              </label>
              <Select
                options={this.state.listPrice}
                value={this.state.selectedPrice}
                onChange={this.handleChangSelect}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.price" />
                }
                name="selectedPrice"
              />
            </div>

            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.payment" />
              </label>
              <Select
                options={this.state.listPayment}
                value={this.state.selectedPayment}
                onChange={this.handleChangSelect}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.payment" />
                }
                name="selectedPayment"
              />
            </div>

            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.province" />
              </label>
              <Select
                options={this.state.listProvince}
                value={this.state.selectedProvince}
                onChange={this.handleChangSelect}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.province" />
                }
                name="selectedProvince"
              />
            </div>

            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.name-clinic" />
              </label>
              <input
                className="form-control"
                name="nameClinic"
                value={this.state.nameClinic}
                onChange={(e) => this.handleChangeInputText(e)}
              />
            </div>

            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.address-clinic" />
              </label>
              <input
                className="form-control"
                name="addressClinic"
                value={this.state.addressClinic}
                onChange={(e) => this.handleChangeInputText(e)}
              ></input>
            </div>

            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.Note" />
              </label>
              <textarea
                className="form-control"
                rows="4"
                name="note"
                value={this.state.note}
                onChange={(e) => this.handleChangeInputText(e)}
              />
            </div>
            <div className="col-8 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.info-doctor" />
              </label>
              <textarea
                className="form-control"
                rows="4"
                name="description"
                value={this.state.description}
                onChange={(e) => this.handleChangeInputText(e)}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="more-info-extra"></div>

        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          className={`btn-detail-doctor ${
            this.state.hasOldData
              ? "save-content-doctor"
              : "create-content-doctor"
          }`}
          onClick={() => this.handleSaveContentMarkDown()}
        >
          {this.state.hasOldData ? (
            <FormattedMessage id="admin.manage-doctor.save-info" />
          ) : (
            <FormattedMessage id="admin.manage-doctor.create-info" />
          )}
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
    prices: state.admin.prices,
    payments: state.admin.payments,
    provinces: state.admin.provinces,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
