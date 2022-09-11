import React, { Component } from "react";
import { connect } from "react-redux";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">Giới thiệu</div>
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
                src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAFLQUdkEvQ&#x2F;view?embed"
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
