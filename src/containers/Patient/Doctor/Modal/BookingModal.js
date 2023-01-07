import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import NumberFormat from "react-number-format";
import {
  getInfoDoctorByIdService,
  postBookAppointment,
} from "../../../../services/userService";
import { LANGUAGES } from "../../../../utils";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import localization from "moment/locale/vi";
import LoadingOverlay from "react-loading-overlay-ts";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoDoctor: {},
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthDay: new Date().setHours(0, 0, 0, 0),
      selectedGender: "",
      genders: "",
      doctorId: "",
      timeType: "",
      timeData: "",
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.getInfoDoctor(this.props.doctorId);
    this.setState({
      timeType: this.props.dataTime.timeType,
      timeData: this.props.dataTime.timeData,
      genders: this.buildData(this.props.genders),
    });
    this.props.fetchGender();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorId !== prevProps.doctorId) {
      this.getInfoDoctor(this.props.doctorId);
    }

    if (this.props.dataTime !== prevProps.dataTime) {
      this.setState({
        timeData: this.props.dataTime.timeTypeData,
        timeType: this.props.dataTime.timeType,
      });
    }

    if (this.props.genders !== prevProps.genders) {
      this.setState({ genders: this.buildData(this.props.genders) });
    }
  }

  getInfoDoctor = async (id) => {
    if (id) {
      let res = await getInfoDoctorByIdService(id);
      if (res && res.errCode === 0) {
        this.setState({ infoDoctor: res.data, doctorId: res.data.doctorId });
      }
    }
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({ birthDay: date[0] });
  };

  handleOnChangeInput = (e) => {
    let valueInput = e.target.value;
    let stateCopy = { ...this.state };
    stateCopy[e.target.name] = valueInput;
    this.setState({ ...stateCopy });
  };

  buildData = (data) => {
    let language = this.props.language;
    let result = [];
    if (data && data.length > 0) {
      result = data.map((item, index) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        return object;
      });
    }
    return result;
  };

  buildTime = (data) => {
    let language = this.props.language;
    let date = "";
    if (data && this.state.timeData) {
      date =
        language === LANGUAGES.VI
          ? this.state.timeData.valueVi +
            " " +
            this.LetterCapitalize(
              moment(new Date(+data)).format("dddd-DD/MM/YYYY")
            )
          : this.state.timeData.valueEn +
            " " +
            moment(new Date(+data)).locale("en").format("dddd-DD/MM/YYYY");
    }
    return date;
  };

  onChangeGender = (selectedOption) => {
    this.setState({ selectedGender: selectedOption });
  };
  LetterCapitalize = (str) => {
    return str
      .split(" ")
      .map((item) => item.substring(0, 1).toUpperCase() + item.substring(1))
      .join(" ");
  };

  handleConfirmBooking = async () => {
    let dataTime = this.props.dataTime;
    this.setState({ isLoading: true });
    let date = new Date(this.state.birthDay).getTime();
    let res = await postBookAppointment({
      reason: this.state.reason,
      date: date,
      doctorId: this.state.doctorId,
      gender: this.state.selectedGender.value,
      timeType: this.state.timeType,
      time:
        dataTime && dataTime.date
          ? this.buildTime(this.props.dataTime.date)
          : "",
      language: this.props.language,
      nameDoctor: this.props.nameDoctor,
    });

    this.setState({ isLoading: false });
    if (res && res.errCode === 0) {
      toast.success("Booking success");
      this.props.closeModalBooking();
    } else {
      toast.error(res.errMessage);
    }
  };

  buildName = (lastName, firstName) => {
    const language = this.props.language;
    if (language === LANGUAGES.VI) return firstName + " " + lastName;
    return firstName + " " + lastName;
  };

  jsUcfirst = (language) => {
    if (language === "vi") return "Vi";
    else if (language === "en") return "En";
    else if (language === "jp") return "Jp";
  };

  render() {
    let { isOpenModal, closeModalBooking, dataTime, language, userInfo } =
      this.props;
    let { infoDoctor, genders, doctorId } = this.state;
    return (
      <Modal
        isOpen={isOpenModal}
        backdrop
        centered
        className="booking-modal-container"
        size="lg"
      >
        <LoadingOverlay
          active={this.state.isLoading}
          wrapper
          overlay
          spinner
          text="Đang gửi mail xác nhận..."
        >
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <span className="left">
                <FormattedMessage id="patient.booking-modal.header" />
              </span>
              <span className="right" onClick={closeModalBooking}>
                <i className="fas fa-times"></i>
              </span>
            </div>

            <div className="booking-modal-body">
              <div className="doctor-info">
                <ProfileDoctor
                  doctorId={doctorId}
                  isShowDescription={false}
                  dataTime={dataTime}
                />
              </div>
              <div className="price">
                <FormattedMessage id="patient.booking-modal.priceBook" />:{" "}
                {infoDoctor &&
                infoDoctor.priceData &&
                infoDoctor.priceData.valueVi &&
                infoDoctor.priceData.valueEn ? (
                  language === LANGUAGES.VI ? (
                    <NumberFormat
                      value={infoDoctor.priceData.valueVi}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"VNĐ"}
                    />
                  ) : (
                    infoDoctor.priceData.valueEn + "$"
                  )
                ) : (
                  ""
                )}
              </div>
              <div className="row">
                <div className="col-6">
                  <label>
                    <FormattedMessage id="patient.booking-modal.fullName" />
                  </label>
                  <input
                    className="form-control"
                    name="fullName"
                    value={this.buildName(
                      userInfo.lastName,
                      userInfo.firstName
                    )}
                    disabled={true}
                    onChange={(e) => this.handleOnChangeInput(e)}
                  />
                </div>
                <div className="col-6">
                  <label>
                    <FormattedMessage id="patient.booking-modal.numberPhone" />
                  </label>
                  <input
                    className="form-control"
                    name="phoneNumber"
                    value={userInfo.phoneNumber}
                    disabled={true}
                    onChange={(e) => this.handleOnChangeInput(e)}
                  />
                </div>
                <div className="col-6">
                  <label>
                    <FormattedMessage id="patient.booking-modal.email" />
                  </label>
                  <input
                    className="form-control"
                    name="email"
                    disabled={true}
                    value={userInfo.email}
                    onChange={(e) => this.handleOnChangeInput(e)}
                  />
                </div>
                <div className="col-6">
                  <label>
                    <FormattedMessage id="patient.booking-modal.address" />
                  </label>
                  <input
                    className="form-control"
                    name="address"
                    disabled={true}
                    value={userInfo.address}
                    onChange={(e) => this.handleOnChangeInput(e)}
                  />
                </div>
                <div className="col-6">
                  <label>
                    <FormattedMessage id="patient.booking-modal.birthDay" />
                  </label>
                  <DatePicker
                    onChange={this.handleOnChangeDatePicker}
                    className="form-control"
                    disabled={true}
                    value={this.state.birthDay}
                  />
                </div>
                <div className="col-6">
                  <label>
                    <FormattedMessage id="patient.booking-modal.gender" />
                  </label>

                  <Select
                    options={genders}
                    disabled={true}
                    value={{
                      label:
                        userInfo && userInfo.gender
                          ? userInfo.genderData[
                              `value${this.jsUcfirst(language)}`
                            ]
                          : null,
                      value: userInfo.gender,
                    }}
                    onChange={this.onChangeGender}
                  />
                </div>
                <div className="col-12">
                  <label>
                    <FormattedMessage id="patient.booking-modal.reason" />
                  </label>
                  <input
                    className="form-control"
                    name="reason"
                    value={this.state.reason}
                    onChange={(e) => this.handleOnChangeInput(e)}
                  />
                </div>
              </div>
            </div>
            <div className="booking-modal-footer">
              <button
                className="btn-booking btn-confirm"
                onClick={() => this.handleConfirmBooking()}
              >
                <FormattedMessage id="patient.booking-modal.confirm" />
              </button>
              <button
                className="btn-booking btn-cancel"
                onClick={closeModalBooking}
              >
                <FormattedMessage id="patient.booking-modal.cancel" />
              </button>
            </div>
          </div>
        </LoadingOverlay>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    genders: state.admin.genders,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGender: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
