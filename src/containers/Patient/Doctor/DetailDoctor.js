import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailDoctorService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailDoctorService(id);

      if (res && res.errCode === 0) {
        this.setState({ detailDoctor: res.data });
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    console.log(this.state);
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
          <div className="intro-doctor">
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
          <div className="schedule-doctor"></div>
          <div className="detail-info-doctor">
            {doctor && doctor.Markdown && doctor.Markdown.contentHTML && (
              <div
                dangerouslySetInnerHTML={{
                  __html: `${doctor.Markdown.contentHTML}`,
                }}
              ></div>
            )}
          </div>
          <div className="comment-doctor"></div>
        </div>
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
