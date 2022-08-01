import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailSpecialty.scss";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfor";
import * as actions from "../../../store/actions/adminActions";
import { LANGUAGES } from "../../../utils";
import ProfileDoctor from "../Doctor/ProfileDoctor";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDoctors: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctor();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.allDoctors !== prevProps.allDoctors) {
      this.setState({
        allDoctors: this.props.allDoctors,
      });
    }
  }

  render() {
    let { allDoctors } = this.state;
    let language = this.props.language;

    return (
      <>
        <HomeHeader />
        <div className="detail-specialty-container">
          <div className="detail-specialty-wrap">
            {allDoctors &&
              allDoctors.length > 0 &&
              allDoctors.map((doctor, index) => {
                let nameVi = "";
                let nameEn = "";
                if (doctor) {
                  nameVi = `${doctor.lastName} ${doctor.firstName} `;
                  nameEn = `${doctor.firstName} ${doctor.lastName}`;
                }
                return (
                  <div className="schedule-doctor mg-100" key={index}>
                    <div className="content-left-schedule">
                      <div className="specialty-schedule-wrap">
                        <ProfileDoctor
                          doctorId={doctor.id}
                          isShowDescription={true}
                          dataTime={{}}
                        />
                      </div>
                    </div>
                    <div className="content-right-schedule">
                      <DoctorSchedule
                        nameDoctor={language === LANGUAGES.VI ? nameVi : nameEn}
                        detailDoctorId={doctor.id}
                      />
                      <DoctorExtraInfo detailDoctorId={doctor.id} />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
