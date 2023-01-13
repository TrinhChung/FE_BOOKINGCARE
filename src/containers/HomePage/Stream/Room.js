import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row, Button } from "antd";
import { io } from "socket.io-client";
import Peer from "peerjs";
class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomId: 1,
      bookingId: 1,
      stream: null,
      end: true,
      friendId: 1,
      voice: true,
      camera: true,
    };
    this.myVideo = React.createRef();
    this.userVideo = React.createRef();
    this.socket = io("http://localhost:8080");
    this.peer = new Peer(this.props.userInfo.id, {
      host: "localhost",
      port: "8080",
      path: "peerjs",
    });
  }

  componentDidMount() {
    if (this.props.userInfo && this.props.userInfo.id) {
      this.peer.on("open", (id) => {
        this.socket.emit("join-room", 1, id);
      });

      this.peer.on("call", (call) => {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            this.myVideo.current.srcObject = stream;

            call.answer(stream);
            call.on("stream", (remoteStream) => {
              this.userVideo.current.srcObject = remoteStream;
            });
          });
      });

      this.socket.on("user-connected", (userId) => {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((currentStream) => {
            this.myVideo.current.srcObject = currentStream;
            this.setState({ stream: currentStream });
            const call = this.peer.call(userId, currentStream);
            call.on("stream", (remoteStream) => {
              this.userVideo.current.srcObject = remoteStream;
            });
          });
      });
    }
  }

  render() {
    return (
      <div>
        <div
          style={{
            height: "93vh",
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <video
            playsInline
            autoPlay
            muted
            ref={this.myVideo}
            style={{ position: "absolute", top: 20, right: 20, height: "20%" }}
          ></video>
          <video
            playsInline
            autoPlay
            ref={this.userVideo}
            style={{ height: "100%" }}
          ></video>
        </div>
        <div
          span={24}
          style={{
            padding: "10px 20px",
            backgroundColor: "black",
            height: "7vh",
          }}
        >
          <Row
            style={{ gap: 5, display: "flex", justifyContent: "space-between" }}
          >
            <Col style={{ display: "flex", gap: 5 }}>
              <Button
                type="primary"
                onClick={() => {
                  const enabled =
                    this.myVideo.current.srcObject.getAudioTracks()[0].enabled;
                  this.setState({ voice: !enabled });
                  this.myVideo.current.srcObject.getAudioTracks()[0].enabled =
                    !enabled;
                }}
              >
                {this.state.voice ? (
                  <i className="fa fa-microphone"></i>
                ) : (
                  <i className="fa fa-microphone-slash"></i>
                )}
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  const enabled =
                    this.myVideo.current.srcObject.getVideoTracks()[0].enabled;
                  this.setState({ camera: !enabled });
                  this.myVideo.current.srcObject.getVideoTracks()[0].enabled =
                    !enabled;
                  console.log(enabled);
                }}
              >
                {this.state.camera ? (
                  <i className="fa fa-video-camera"></i>
                ) : (
                  <i className="fas">&#xf4e2;</i>
                )}
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                danger
                onClick={() => {
                  this.props.history.push(`/home`);
                  window.location.reload();
                }}
              >
                Kết thúc
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);
