import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }
  componentDidMount() {
    this.props.loadTopDoctors();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  handleViewDetailDoctor = (doctor) => {
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  };

  handleNextListSection = (e) => {
    this.props.history.push(`/home-list-section/${e.target.name}`);
  };

  render() {
    let arrDoctors = this.state.arrDoctors;
    console.log(arrDoctors);
    let { language } = this.props;
    return (
      <div className="section-share outstanding-doctor-section">
        <div className="section-container">
          <div className="section-header">
            <span>
              <FormattedMessage id="homepage.out-standing-doctor" />
            </span>
            <button
              name="doctor"
              onClick={(e) => this.handleNextListSection(e)}
            >
              <FormattedMessage id="homepage.more-info" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((doctor, index) => {
                  let nameVi = `${doctor.positionData.valueVi}, ${doctor.lastName} ${doctor.firstName} `;
                  let nameEn = `${doctor.positionData.valueEn}, ${doctor.firstName} ${doctor.lastName}`;

                  return (
                    <div
                      className="section-customize"
                      key={index}
                      onClick={() => this.handleViewDetailDoctor(doctor)}
                    >
                      <div className="customize-border">
                        <div className="count-booking">
                          Lượt đặt: {doctor.bookingCount}
                        </div>
                        <div className="outer-bg">
                          <div
                            className="bg-image outstanding-doctor-section"
                            style={{ backgroundImage: `url(${doctor.image})` }}
                          />
                        </div>
                        <div className="position text-center mb-2">
                          <div>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                          </div>
                          <div>
                            {doctor.DoctorInfo &&
                            doctor.DoctorInfo.specialtyData &&
                            doctor.DoctorInfo.specialtyData.name
                              ? doctor.DoctorInfo.specialtyData.name
                              : "Chưa cập nhật"}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
