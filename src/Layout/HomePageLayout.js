import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../containers/HomePage/HomeHeader";
import Footer from "../containers/Footer/Footer";

class HomePageLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    const { children, isShowBanner = false } = this.props;
    return (
      <div className="home-page">
        <HomeHeader isShowBanner={isShowBanner} />
        <div
          style={{
            minHeight: 600,
            border: "1px solid #ccc",
            backgroundColor: "white",
            paddingTop: 60,
            padding: "60px 10% 0 10%",
          }}
        >
          {children}
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePageLayout);
