import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllSpecialty } from "../../../services/userService";
import { withRouter } from "react-router";
import * as actions from "../../../store/actions";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }

  async componentDidMount() {
    this.props.fetchTopSpecialty();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topSpecialties !== this.props.topSpecialties) {
      this.setState({
        dataSpecialty: this.props.topSpecialties,
      });
    }
  }

  handleViewDetailSpecialty = (item) => {
    this.props.history.push(`/detail-specialty/${item.id}`);
  };

  handleNextListSection = (e) => {
    this.props.history.push(`/home-list-section/${e.target.name}`);
  };

  render() {
    let dataSpecialty = this.state.dataSpecialty;
    return (
      <div className="section-share">
        <div className="section-container">
          <div className="section-header">
            <span>
              <FormattedMessage id="homepage.specialty-popular" />
            </span>
            <button
              name="specialty"
              onClick={(e) => this.handleNextListSection(e)}
            >
              <FormattedMessage id="homepage.more-info" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataSpecialty &&
                dataSpecialty.length > 0 &&
                dataSpecialty.map((item, index) => {
                  return (
                    <div
                      className="section-customize"
                      key={index}
                      onClick={() => this.handleViewDetailSpecialty(item)}
                    >
                      <div
                        className="bg-image specialty-section"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <div className="name-section">{item.name}</div>
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
    language: state.app.language,
    topSpecialties: state.admin.topSpecialties,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopSpecialty: () => dispatch(actions.fetchTopSpecialty()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
