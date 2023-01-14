import React, { Component } from "react";
import { Row, Col } from "antd";
import avatarUser from "../../../assets/avatar.png";
class View extends Component {
  constructor(props) {
    super(props);
    this.myVideo = React.createRef();
    this.state = {
      video: null,
    };
  }
  componentDidMount() {
    if (this.props.stream) {
      this.myVideo.current.srcObject = this.props.stream;
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.stream !== prevProps.stream) {
      this.myVideo.current.srcObject = this.props.stream;
    }
  }
  render() {
    const { muted, height, video, audio } = this.props;

    const image = this.props.image ? this.props.image : avatarUser;
    return (
      <div
        style={{
          position: "relative",
          height: `${height}vh`,
        }}
      >
        <video
          playsInline
          muted={muted}
          autoPlay
          ref={this.myVideo}
          style={{
            height: `${height}vh`,
          }}
        />
        {!video && (
          <div
            style={{
              position: "absolute",
              height: `${height}vh`,
              maxWidth: `${height * 1.5}vh`,
              display: "flex",
              justifyContent: "center",
              top: 0,
              left: 0,
            }}
          >
            <image
              src={image}
              style={{
                backgroundImage: `url(${image})`,
                height: `${height}vh`,
                width: `${height * 1.35}vh`,
                backgroundPosition: "center center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></image>
          </div>
        )}
        <Row
          style={{
            position: "absolute",
            top: 5,
            left: 5,
            fontWeight: "bold",
            color: "green",
          }}
        >
          {this.props.name}
        </Row>
        <Row
          style={{
            position: "absolute",
            bottom: 5,
            left: 5,
            gap: 5,
            color: "green",
          }}
        >
          <Col>
            {audio === true ? (
              <i className="fa fa-microphone"></i>
            ) : (
              <i className="fa fa-microphone-slash"></i>
            )}
          </Col>
          <Col>
            {video === true ? (
              <i className="fa fa-video-camera"></i>
            ) : (
              <i className="fas">&#xf4e2;</i>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default View;
