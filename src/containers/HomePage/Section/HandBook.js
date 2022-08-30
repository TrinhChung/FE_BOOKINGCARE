import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { getHandBook } from "../../../services/userService";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";

class HandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handbooks: [],
    };
  }

  async componentDidMount() {
    this.props.fetchHandBook();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.handbooks !== this.props.handbooks) {
      this.setState({
        handbooks: this.props.handbooks,
      });
    }
  }

  handleViewDetailClinic = (item) => {
    this.props.history.push(`/detail-handbook/${item.id}`);
  };

  handleNextListSection = (e) => {
    this.props.history.push(`/home-list-section/${e.target.name}`);
  };

  render() {
    let handbooks = this.state.handbooks;
    return (
      <div className="section-share section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <span>
              <FormattedMessage id="homepage.handbook" />
            </span>
            <button
              name="handbook"
              onClick={(e) => this.handleNextListSection(e)}
            >
              <FormattedMessage id="homepage.more-info" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {handbooks.map((item, index) => {
                return (
                  <div
                    className="section-customize d-flex"
                    key={index}
                    onClick={() => this.handleViewDetailClinic(item)}
                  >
                    <div
                      className="bg-image handle-section"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div style={{ fontSize: "18px", marginLeft: "15px" }}>
                      {item.name}
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
    handbooks: state.admin.handbooks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHandBook: () => dispatch(actions.fetchHandBook()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HandBook)
);
