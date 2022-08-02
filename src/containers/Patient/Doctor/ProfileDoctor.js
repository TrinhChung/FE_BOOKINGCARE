import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfileDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import "./ProfileDoctor.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    this.getInfoDoctor(this.props.doctorId);
  }

  getInfoDoctor = async (id) => {
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errCode === 0) {
        this.setState({ dataProfile: res.data });
      }
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorId !== prevProps.doctorId) {
      this.getInfoDoctor(this.props.doctorId);
    }
  }
  LetterCapitalize = (str) => {
    return str
      .split(" ")
      .map((item) => item.substring(0, 1).toUpperCase() + item.substring(1))
      .join(" ");
  };

  handleInfoDoctor = () => {
    this.props.history.push(`/detail-doctor/${this.props.doctorId}`);
  };

  render() {
    let { language, isShowDescription, dataTime } = this.props;
    let { dataProfile } = this.state;
    let nameVi = "";
    let nameEn = "";
    let time = "";
    let date = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName} `;
      nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    }

    if (!isShowDescription) {
      if (dataTime && dataTime.date) {
        date =
          language === LANGUAGES.VI
            ? this.LetterCapitalize(
                moment(new Date(+dataTime.date)).format("dddd-DD/MM/YYYY")
              )
            : moment(new Date(+dataTime.date))
                .locale("en")
                .format("dddd-DD/MM/YYYY");
      }

      if (dataTime && dataTime.timeTypeData) {
        time =
          language === LANGUAGES.VI
            ? dataTime.timeTypeData.valueVi + " " + date
            : dataTime.timeTypeData.valueEn + " " + date;
      }
    }

    return (
      <div>
        <div className="intro-doctor mg-100">
          <div className="content-left">
            <div
              className="avatar-doctor"
              style={{
                backgroundImage: `url(${dataProfile.image})`,
              }}
            ></div>
            {isShowDescription ? (
              <div
                className="more-info"
                onClick={() => this.handleInfoDoctor()}
              >
                Xem them
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="content-right">
            <div className="doctor-title">
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            {isShowDescription ? (
              <div className="doctor-description">
                {dataProfile.Markdown && (
                  <span>{dataProfile.Markdown.description}</span>
                )}
              </div>
            ) : (
              <div className="clinic-time">
                {}
                <span>
                  <FormattedMessage id="patient.booking-modal.nameClinic" />:{" "}
                  {dataProfile.DoctorInfo && dataProfile.DoctorInfo.nameClinic
                    ? dataProfile.DoctorInfo.nameClinic
                    : ""}
                </span>
                <span>
                  <FormattedMessage id="patient.booking-modal.addressClinic" />:{" "}
                  {dataProfile.DoctorInfo &&
                  dataProfile.DoctorInfo.addressClinic
                    ? dataProfile.DoctorInfo.addressClinic
                    : ""}
                </span>

                <span>
                  <FormattedMessage id="patient.booking-modal.time" />: {time}
                </span>
              </div>
            )}
          </div>
        </div>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor)
);
