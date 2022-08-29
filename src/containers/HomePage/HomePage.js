import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import MedicalFacility from "./Section/MedicalFacility";
import OutStandingDoctor from "./Section/OutStandingDoctor";
import HandBook from "./Section/HandBook";
import About from "./Section/About";
import "./HomePage.scss";
import HomeFooter from "./HomeFooter";
import Footer from "../Footer/Footer";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleAfterChange = () => {};

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  setState = () => {};

  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 400,
      slidesToShow: 4,
      slidesToScroll: 4,
      centerPadding: "100px",
      afterChange: this.handleAfterChange,
    };

    return (
      <div className="home-page">
        <HomeHeader isShowBanner={true} />
        <Specialty settings={settings} />
        <MedicalFacility settings={settings} />
        <OutStandingDoctor settings={settings} />
        <HandBook
          settings={{ ...settings, slidesToShow: 2, slidesToScroll: 1 }}
        />
        <About />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
