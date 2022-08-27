import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailHandbook.scss";

import * as actions from "../../../store/actions/adminActions";
import { LANGUAGES } from "../../../utils";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { FormattedMessage } from "react-intl";
import Footer from "../../Footer/Footer";

import { getDetailHandBook } from "../../../services/userService";

class DetailHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionHtml: "",
      handbookId: "",
      avatar: "",
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      this.setState({ handbookId: this.props.match.params.id });
      this.fetchDetailHandbook(this.props.match.params.id);
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    this.fetchDetailHandbook(this.props.match.params.id);
  }

  fetchDetailHandbook = async (id) => {
    let res = await getDetailHandBook(id);
    console.log(res);
    if (res && res.errCode === 0) {
      if (res.data && res.data.descriptionHtml && res.data.name) {
        this.setState({
          descriptionHtml: res.data.descriptionHtml,
          name: res.data.name,
        });
      }
    }
  };

  render() {
    console.log(this.state.descriptionHtml);
    let { descriptionHtml } = this.state;
    let language = this.props.language;

    return (
      <>
        <HomeHeader />
        <div className="detail-clinic-container">
          <div className="detail-clinic-description" id="introduce">
            <div className="detail-clinic-content">
              {descriptionHtml && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${descriptionHtml}`,
                  }}
                ></div>
              )}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
