import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import { LANGUAGES } from "../../../utils";
import moment from "moment";
import localization from "moment/locale/vi";
import { getScheduleDoctorByDateService } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DoctorSchedule: {},
      arrDays: [],
      allAvailableTime: [],
      isOpenModalBooking: false,
      dataScheduleModal: {},
      nameDoctor: "",
    };
  }

  componentDidMount() {
    this.getDaySchedule();
    let allDay = this.getDaySchedule();
    this.handleOnChangeDate(allDay[0].value);
    this.setState({ arrDays: allDay });
  }
  LetterCapitalize = (str) => {
    return str
      .split(" ")
      .map((item) => item.substring(0, 1).toUpperCase() + item.substring(1))
      .join(" ");
  };

  getDaySchedule = () => {
    let { language } = this.props;

    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (i > 0) {
        object.label =
          language === LANGUAGES.VI
            ? this.LetterCapitalize(
                moment(new Date()).add(i, "days").format("dddd-DD/MM")
              )
            : moment(new Date())
                .add(i, "days")
                .locale("en")
                .format("dddd-DD/MM");
        object.value = moment(new Date())
          .add(i, "days")
          .startOf("day")
          .valueOf();
      } else {
        let date = moment(new Date()).add(i, "days").format("dddd-DD/MM");
        let date4 = date.substring(date.length - 5);
        object.label =
          language === LANGUAGES.VI ? `Hôm nay-${date4}` : `Today-${date4}`;
        object.value = moment(new Date())
          .add(i, "days")
          .startOf("day")
          .valueOf();
      }

      arrDate.push(object);
    }

    return arrDate;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
      this.getDaySchedule();
      let allDay = this.getDaySchedule();
      this.setState({
        arrDays: allDay,
      });
    }
    if (this.props.detailDoctorId !== prevProps.detailDoctorId) {
      this.handleOnChangeDate(this.state.arrDays[0].value);
    }
    if (this.props.nameDoctor !== prevProps.nameDoctor) {
      this.setState({ nameDoctor: this.props.nameDoctor });
    }
  }

  handleOnChangeDate = async (date) => {
    if (this.props.detailDoctorId && this.props.detailDoctorId !== -1) {
      let doctorId = this.props.detailDoctorId;
      let res = await getScheduleDoctorByDateService(doctorId, date);
      if (res && res.errCode === 0) {
        this.setState({ allAvailableTime: res.data ? res.data : [] });
      }
    }
  };

  handleOnclickScheduleTime = (time) => {
    this.setState({ isOpenModalBooking: true, dataScheduleModal: time });
  };

  closeModalBooking = () => {
    this.setState({ isOpenModalBooking: false });
  };

  TimeSchedule = (allAvailableTime, language) => {
    return (
      <div className="time-content">
        <div className="box-wrap-btn-time">
          {allAvailableTime &&
            allAvailableTime.length > 0 &&
            allAvailableTime.map((time, index) => {
              return (
                <button
                  className={language === LANGUAGES.VI ? "btn-vi" : "btn-en"}
                  key={index}
                  onClick={() => this.handleOnclickScheduleTime(time)}
                >
                  {language === LANGUAGES.VI
                    ? time.timeTypeData.valueVi
                    : time.timeTypeData.valueEn}
                </button>
              );
            })}
        </div>

        <div className="text-schedule">
          <i className="far fa-hand-point-up mx-2"> </i>
          <FormattedMessage id="patient.detail-doctor.label-book" />
        </div>
      </div>
    );
  };

  ScheduleNull = () => {
    return (
      <div className="time-content">
        <div className="box-wrap-btn-time">
          <span>
            <FormattedMessage id="patient.detail-doctor.schedule-null" />
          </span>
        </div>
      </div>
    );
  };
  render() {
    let { language } = this.props;
    let { arrDays, allAvailableTime } = this.state;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(e) => this.handleOnChangeDate(e.target.value)}>
              {arrDays &&
                arrDays.length > 0 &&
                arrDays.map((day, index) => {
                  return (
                    <option key={index} value={day.value}>
                      {day.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calendar">
              <span>
                <i className="fas fa-calendar-alt"></i>
                <FormattedMessage id="patient.detail-doctor.schedule" />
              </span>
            </div>

            {allAvailableTime && allAvailableTime.length > 0
              ? this.TimeSchedule(allAvailableTime, language)
              : this.ScheduleNull()}
          </div>
        </div>
        <BookingModal
          isOpenModal={this.state.isOpenModalBooking}
          closeModalBooking={this.closeModalBooking}
          dataTime={this.state.dataScheduleModal}
          nameDoctor={this.state.nameDoctor}
        />
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
