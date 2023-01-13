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

      navigator.mediaDevices
        .getUserMedia({ video: this.state.camera, audio: this.state.voice })
        .then((currentStream) => {
          this.setState({ stream: currentStream });
          this.myVideo.current.srcObject = currentStream;
        });

      this.peer.on("call", (call) => {
        navigator.mediaDevices
          .getUserMedia({ video: this.state.camera, audio: this.state.voice })
          .then((stream) => {
            call.answer(stream);
            call.on("stream", (remoteStream) => {
              this.userVideo.current.srcObject = remoteStream;
            });
          });
      });

      this.socket.on("user-connected", (userId) => {
        this.setState({ friendId: userId });
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevState.friendId !== this.props.friendId &&
      this.state.stream !== null
    ) {
      const call = this.peer.call(this.state.friendId, this.state.stream);
      call.on("stream", (remoteStream) => {
        this.userVideo.current.srcObject = remoteStream;
      });
    }
  }

  render() {
    return (
      <div>
        <div style={{ height: "7vh", backgroundColor: "black" }} span={24}>
          <Col
            span={24}
            style={{
              padding: "10px 20px",
            }}
          >
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
        </div>
        <div
          style={{
            height: "86vh",
            justifyContent: "center",
            display: "flex",
            position: "relative",
          }}
        >
          <video
            playsInline
            muted
            ref={this.myVideo}
            autoPlay
            style={{
              height: "20%",
              position: "absolute",
              top: 20,
              right: 40,
              zIndex: 40,
            }}
          />
          <video
            playsInline
            muted
            ref={this.userVideo}
            autoPlay
            style={{ height: "100%", zIndex: 20 }}
          />
        </div>
        <div
          span={24}
          style={{
            padding: "10px 20px",
            backgroundColor: "black",
            height: "7vh",
          }}
        >
          <Row style={{ gap: 5 }}>
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
              }}
            >
              {this.state.camera ? (
                <i className="fa fa-video-camera"></i>
              ) : (
                <i className="fas">&#xf4e2;</i>
              )}
            </Button>
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
