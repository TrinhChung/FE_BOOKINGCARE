import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import Select from "react-select";
import { LANGUAGES, USER_ROLE } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import { saveBulkScheduleDoctor } from "../../../services/userService";

import _ from "lodash";

import "./ManageSchedule.scss";
import { toast } from "react-toastify";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedDoctor: "",
      currentDate: new Date().setHours(0, 0, 0, 0),
      rangeTime: [],
      checkDoctor: false,
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctor();
    this.props.fetchAllCodeScheduleTime();
    if (
      this.props.userInfo &&
      this.props.userInfo.roleId === USER_ROLE.DOCTOR
    ) {
      let doctor = this.props.userInfo;
      this.setState({
        checkDoctor: true,
        selectedDoctor: { label: doctor.lastName, value: doctor.id },
      });
    }
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

    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({ rangeTime: data });
    }
    if (prevProps.userInfo !== this.props.userInfo) {
      console.log(this.props.userInfo);
    }
  }

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

  handleChange = async (selectedDoctor) => {
    if (!this.state.checkDoctor) {
      this.setState({ selectedDoctor: selectedDoctor });
    }
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({ currentDate: date[0] });
  };

  handleBtnTime = (item) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((time) => {
        if (time.id === item.id) {
          time.isSelected = !time.isSelected;
          return time;
        }
        return time;
      });
    }
    this.setState({ rangeTime: rangeTime });
  };

  handleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, currentDate } = this.state;
    let result = [];

    if (isNaN(currentDate)) {
      toast.error("Invalid date!");
      return;
    }
    if (!selectedDoctor || (selectedDoctor && _.isEmpty(selectedDoctor))) {
      toast.error("Invalid doctor!");
      return;
    }

    let formattedDate = new Date(currentDate).getTime();
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((time) => time.isSelected === true);

      if (selectedTime.length === 0) {
        toast.error("Please select a time");
        return;
      } else {
        selectedTime.map((time) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formattedDate + "";
          object.timeType = time.keyMap;
          result.push(object);
          return time;
        });
      }
    }

    let res = await saveBulkScheduleDoctor(result);

    if (res && res.errCode === 0) {
      toast.success("Save info success!");
      console.log("check bulk front: ", res);
    } else {
      toast.error("Err saveBulkScheduleDoctor");
      console.log("Err bulk Schedule: ", res);
    }
  };

  render() {
    let { rangeTime } = this.state;
    let { language } = this.props;

    return (
      <div className="manage-schedule-container">
        <div className="manage-schedule-title">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="container">
          <div className="row">
            {!this.state.checkDoctor && (
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.choose-doctor" />
                </label>
                <Select
                  options={this.state.listDoctor}
                  value={this.state.selectedDoctor}
                  onChange={this.handleChange}
                />
              </div>
            )}

            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.choose-date" />
              </label>
              <DatePicker
                onChange={this.handleOnChangeDatePicker}
                className="form-control"
                minDate={new Date().setHours(0, 0, 0, 0)}
                value={this.state.currentDate}
              />
            </div>
          </div>
          <div className="col-12 pick-hour-container">
            {rangeTime &&
              rangeTime.length > 0 &&
              rangeTime.map((time, index) => {
                return (
                  <button
                    key={index}
                    className={`btn-schedule ${
                      time.isSelected ? "active" : ""
                    }`}
                    onClick={() => this.handleBtnTime(time)}
                  >
                    {language === LANGUAGES.VI ? time.valueVi : time.valueEn}
                  </button>
                );
              })}
          </div>
          <button
            className="btn btn-primary px-2"
            onClick={this.handleSaveSchedule}
          >
            <FormattedMessage id="manage-schedule.save" />
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allScheduleTime: state.admin.allScheduleTime,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    fetchAllCodeScheduleTime: () => dispatch(actions.fetchScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
