import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomeHeader";
import "./HomeListSection.scss";
import { LANGUAGES } from "../../../utils";

import {
  getAllSpecialty,
  getTopDoctorHomeService,
  getAllClinic,
  getHandBook,
} from "../../../services/userService";

import Footer from "../../Footer/Footer";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomeListSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSections: [],
    };
  }
  handleAfterChange = () => {};

  componentDidMount() {
    this.getSectionList();
  }

  getSectionList = async () => {
    let nameSection = this.props.match.params.section;
    if (nameSection === "doctor") {
      let res = await getTopDoctorHomeService("");
      if (res && res.errCode === 0) {
        this.setState({ listSections: res.data });
      }
    } else if (nameSection === "specialty") {
      let res = await getAllSpecialty();
      if (res && res.errCode === 0) {
        this.setState({ listSections: res.data });
      }
    } else if (nameSection === "medical-facility") {
      let res = await getAllClinic("all");
      if (res && res.errCode === 0) {
        this.setState({ listSections: res.data });
      }
    } else if (nameSection === "handbook") {
      let res = await getHandBook();
      if (res && res.errCode === 0) {
        this.setState({ listSections: res.data });
      }
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
    if (this.props.match.params.section !== prevProps.match.params.section) {
      console.log(this.props.match.params.section);
      this.getSectionList();
    }
  }

  jsUcfirst = (language) => {
    if (language === "vi") return "Vi";
    else if (language === "en") return "En";
    else if (language === "jp") return "Jp";
  };

  elementDoctor = (doctor, index) => {
    let language = this.props.language;
    let position = doctor.positionData
      ? doctor.positionData[`value${this.jsUcfirst(language)}`]
      : "";
    let name =
      language === LANGUAGES.VI
        ? doctor.firstName + " " + doctor.lastName
        : doctor.lastName + " " + doctor.firstName;

    return (
      <div
        key={index}
        className="box-section"
        onClick={() => this.nextPageDetail(doctor.id)}
      >
        <div className="wrap-section">
          <div
            className="img-doctor"
            style={{ backgroundImage: `url(${doctor.image})` }}
          ></div>
          <div>
            <div className="name-section">{position + ", " + name}</div>
          </div>
        </div>
      </div>
    );
  };

  elementSpecialty = (specialty, index) => {
    return (
      <div
        key={index}
        className="box-section"
        onClick={() => this.nextPageDetail(specialty.id)}
      >
        <div className="wrap-section">
          <div
            className="img-specialty"
            style={{ backgroundImage: `url(${specialty.image})` }}
          ></div>
          <div>
            <div className="name-section">{specialty.name}</div>
          </div>
        </div>
      </div>
    );
  };

  nextPageDetail = (id) => {
    let nameSection = this.props.match.params.section;
    if (nameSection === "doctor") {
      this.props.history.push(`/detail-doctor/${id}`);
    } else if (nameSection === "medical-facility") {
      this.props.history.push(`/detail-clinic/${id}`);
    } else if (nameSection === "specialty") {
      this.props.history.push(`/detail-specialty/${id}`);
    } else if (nameSection === "handbook") {
      this.props.history.push(`/detail-specialty/${id}`);
    }
  };

  render() {
    let { listSections } = this.state;
    let sectionName = this.props.match.params.section;

    return (
      <div className="home-list-section">
        <HomeHeader isShowBanner={false} />
        <div className="header-list-section">Chuyen khoa bac si co so y te</div>
        <div className="list-section-container">
          <div>
            {listSections &&
              listSections.length > 0 &&
              listSections.map((section, index) => {
                if (sectionName === "doctor") {
                  return this.elementDoctor(section, index);
                } else {
                  return this.elementSpecialty(section, index);
                }
              })}
          </div>
        </div>
        <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeListSection);
