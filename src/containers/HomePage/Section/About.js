import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";

class About extends Component {
  render() {
    let language = this.props.language;
    const parseHtml = (html) =>
      new DOMParser().parseFromString(html, "text/html").body.innerText;
    let src =
      language === LANGUAGES.JP
        ? "https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAFMA9dt6DY&#x2F;view?embed"
        : "https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAFLQUdkEvQ&#x2F;view?embed";
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          <FormattedMessage id="homepage.profile.introduction.title" />
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <div
              style={{
                willChange: "transform",
                width: "100%",
                height: "400px",
                position: "relative",
              }}
            >
              <iframe
                loading="lazy"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: "0",
                  left: "0",
                  border: "none",
                  padding: "0",
                  margin: "0",
                }}
                // src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAFMA9dt6DY&#x2F;view?embed"
                src={parseHtml(src)}
                allowFullScreen
                allow="fullscreen"
                title="myFrame"
              ></iframe>
            </div>
          </div>

          <div className="content-right"></div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
