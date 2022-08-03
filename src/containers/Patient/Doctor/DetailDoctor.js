import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailDoctorService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfor";
import Footer from "../../Footer/Footer";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorId: -1,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({ currentDoctorId: id });
      let res = await getDetailDoctorService(id);

      if (res && res.errCode === 0) {
        this.setState({ detailDoctor: res.data });
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    let doctor = this.state.detailDoctor;
    let language = this.props.language;
    let nameVi = "";
    let nameEn = "";
    if (doctor && doctor.positionData) {
      nameVi = `${doctor.positionData.valueVi}, ${doctor.lastName} ${doctor.firstName} `;
      nameEn = `${doctor.positionData.valueEn}, ${doctor.firstName} ${doctor.lastName}`;
    }
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor mg-100">
            <div className="content-left">
              <div
                className="avatar-doctor"
                style={{
                  backgroundImage: `url(${this.state.detailDoctor.image})`,
                }}
              ></div>
            </div>
            <div className="content-right">
              <div className="doctor-title">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="doctor-description">
                {this.state.detailDoctor.Markdown && (
                  <span>{this.state.detailDoctor.Markdown.description}</span>
                )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor mg-100">
            <div className="content-left">
              <DoctorSchedule
                nameDoctor={language === LANGUAGES.VI ? nameVi : nameEn}
                detailDoctorId={this.state.currentDoctorId}
              />
            </div>
            <div className="content-right">
              <DoctorExtraInfo detailDoctorId={this.state.currentDoctorId} />
            </div>
          </div>
          <hr className="m-0" />

          <div className="detail-info-doctor mg-100">
            {doctor && doctor.Markdown && doctor.Markdown.contentHTML && (
              <div
                dangerouslySetInnerHTML={{
                  __html: `${doctor.Markdown.contentHTML}`,
                }}
              ></div>
            )}
          </div>
          <hr className="m-0" />

          <div className="comment-doctor"></div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DetailDoctorMenuPath: state.app.DetailDoctorMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
