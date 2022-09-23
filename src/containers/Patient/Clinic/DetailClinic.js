import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailClinic.scss";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfor";
import { LANGUAGES } from "../../../utils";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { FormattedMessage } from "react-intl";
import Footer from "../../Footer/Footer";

import { getDetailClinic } from "../../../services/userService";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      allDoctors: [],
      descriptionHtml: "",
      clinicId: "",
      name: "",
      address: "",
      avatar: "",
    };
  }

  scrollToTestDiv = (id) => {
    const divElement = this.myRef.current.querySelector(id);

    divElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  async componentDidMount() {
    window.scrollTo(0, 0);
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      this.setState({ clinicId: this.props.match.params.id });
      this.fetchDetailClinic(this.props.match.params.id);
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.allDoctors !== prevProps.allDoctors) {
      this.setState({
        allDoctors: this.props.allDoctors,
      });
    }
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  fetchDetailClinic = async (id) => {
    let res = await getDetailClinic(id);
    if (res && res.errCode === 0) {
      if (res.data && res.data.descriptionHtml) {
        this.setState({ descriptionHtml: res.data.descriptionHtml });
      }
      if (res.data && res.data.clinicData) {
        this.setState({ allDoctors: res.data.clinicData });
      }
      if (res.data && res.data.image && res.data.name && res.data.address) {
        this.setState({
          name: res.data.name,
          address: res.data.address,
          avatar: res.data.image,
        });
      }
    }
  };

  renderListDoctor = (allDoctors) => {
    let language = this.props.language;
    return allDoctors.map((doctor, index) => {
      let nameVi = "";
      let nameEn = "";
      if (doctor && doctor.User) {
        nameVi = `${doctor.User.lastName} ${doctor.User.firstName} `;
        nameEn = `${doctor.User.firstName} ${doctor.User.lastName}`;
      }
      return (
        <div className="schedule-doctor mg-100" key={index}>
          <div className="content-left-schedule">
            <div className="clinic-schedule-wrap">
              <ProfileDoctor
                doctorId={doctor.doctorId}
                isShowDescription={true}
                dataTime={{}}
              />
            </div>
          </div>
          <div className="content-right-schedule">
            <DoctorSchedule
              nameDoctor={language === LANGUAGES.VI ? nameVi : nameEn}
              detailDoctorId={doctor.doctorId}
            />
            <DoctorExtraInfo detailDoctorId={doctor.doctorId} />
          </div>
        </div>
      );
    });
  };

  renderListDoctorNull = () => {
    return (
      <div className="schedule-doctor mg-100">
        <div className="list-doctor-null">
          <i className="far fa-window-close icon-x"></i>
          <p className="text-doctor-null">
            <FormattedMessage id="patient.clinic.special-doctor-null" />
          </p>
        </div>
      </div>
    );
  };

  render() {
    let { allDoctors, descriptionHtml, address, name } = this.state;

    return (
      <>
        <HomeHeader />
        <div className="detail-clinic-container" ref={this.myRef}>
          <div className="clinic-banner">
            <div className="wrap-banner">
              <div
                className="clinic-img"
                style={{
                  backgroundImage: `url(${this.state.avatar})`,
                }}
              ></div>
              <div className="clinic-text">
                <div className="clinic-name">{name}</div>
                <div className="clinic-address">Địa chỉ: {address}</div>
              </div>
            </div>
            <div className="clinic-header">
              <div
                className="clinic-header-text"
                onClick={() => this.scrollToTestDiv("#introduce")}
              >
                giới thiệu
              </div>
              <div
                className="clinic-header-text"
                onClick={() => this.scrollToTestDiv("#doctor")}
              >
                bác sĩ chuyên khoa
              </div>
            </div>
          </div>
          <div className="detail-clinic-description" id="introduce">
            <div className="detail-clinic-content">
              {descriptionHtml && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${descriptionHtml}`,
                  }}
                ></div>
              )}
            </div>
          </div>
          <div className="detail-clinic-wrap" id="doctor">
            <div className="detail-clinic-doctor">
              Đặt lịch khám với bác sĩ chuyên khoa
            </div>
            <div>
              {allDoctors && allDoctors.length > 0
                ? this.renderListDoctor(allDoctors)
                : this.renderListDoctorNull()}
            </div>
          </div>
        </div>
        <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
