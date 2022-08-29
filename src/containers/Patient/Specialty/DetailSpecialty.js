import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailSpecialty.scss";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfor";
import * as actions from "../../../store/actions/adminActions";
import { LANGUAGES } from "../../../utils";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { FormattedMessage } from "react-intl";
import Footer from "../../Footer/Footer";

import { getDetailSpecialty } from "../../../services/userService";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDoctors: [],
      provinces: [],
      descriptionHtml: "",
      selectedProvince: "all",
      specialtyId: "",
    };
  }

  async componentDidMount() {
    this.props.getRequiredDoctorInfo();
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      this.setState({ specialtyId: this.props.match.params.id });
      this.fetchDetailSpecialty(
        this.props.match.params.id,
        this.state.selectedProvince
      );
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.allDoctors !== prevProps.allDoctors) {
      this.setState({
        allDoctors: this.props.allDoctors,
      });
    }

    if (this.props.provinces !== prevProps.provinces) {
      this.setState({ provinces: this.props.provinces });
    }
  }

  fetchDetailSpecialty = async (id, province) => {
    let res = await getDetailSpecialty(id, province);
    if (res && res.errCode === 0) {
      if (res.data && res.data.descriptionHtml) {
        this.setState({ descriptionHtml: res.data.descriptionHtml });
      }
      if (res.data && res.data.specialtyData) {
        this.setState({ allDoctors: res.data.specialtyData });
      }
    }
  };

  handleOnChangeProvince = (e) => {
    console.log(e.target.value);
    this.setState({ selectedProvince: e.target.value });
    this.fetchDetailSpecialty(this.state.specialtyId, e.target.value);
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
            <div className="specialty-schedule-wrap">
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
            <FormattedMessage id="patient.specialty.special-doctor-null" />
          </p>
        </div>
      </div>
    );
  };

  render() {
    let { allDoctors, descriptionHtml, provinces } = this.state;
    let language = this.props.language;

    return (
      <>
        <HomeHeader />
        <div className="detail-specialty-container">
          <div className="detail-specialty-description">
            <div className="detail-specialty-content">
              {descriptionHtml && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${descriptionHtml}`,
                  }}
                ></div>
              )}
            </div>
          </div>
          <div className="detail-specialty-wrap">
            <div>
              <select
                className="detail-specialty-selected"
                value={this.state.selectedProvince}
                onChange={(e) => this.handleOnChangeProvince(e)}
              >
                <option value="all">
                  {language === LANGUAGES.VI ? "Tất cả" : "All"}
                </option>
                {provinces &&
                  provinces.length > 0 &&
                  provinces.map((province, index) => {
                    return (
                      <option value={province.keyMap}>
                        {language === LANGUAGES.VI
                          ? province.valueVi
                          : province.valueEn}
                      </option>
                    );
                  })}
              </select>
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
    provinces: state.admin.provinces,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
