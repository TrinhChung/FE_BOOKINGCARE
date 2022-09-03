import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import * as actions from "../../../store/actions";

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinic: [],
    };
  }

  componentDidMount() {
    this.props.fetchTopClinic();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topClinics !== this.props.topClinics) {
      this.setState({
        dataClinic: this.props.topClinics,
      });
    }
  }

  handleViewDetailClinic = (item) => {
    this.props.history.push(`/detail-clinic/${item.id}`);
  };

  handleNextListSection = (e) => {
    this.props.history.push(`/home-list-section/${e.target.name}`);
  };

  render() {
    let dataClinic = this.state.dataClinic;

    return (
      <div className="section-share section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <span>
              <FormattedMessage id="homepage.medical-popular" />
            </span>
            <button
              name="medical-facility"
              onClick={(e) => this.handleNextListSection(e)}
            >
              <FormattedMessage id="homepage.more-info" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataClinic &&
                dataClinic.length > 0 &&
                dataClinic.map((item, index) => {
                  return (
                    <div
                      className="section-customize"
                      key={index}
                      onClick={() => this.handleViewDetailClinic(item)}
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
    topClinics: state.admin.topClinics,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopClinic: () => dispatch(actions.fetchTopClinic()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
