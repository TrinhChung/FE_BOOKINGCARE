import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row, Button } from "antd";
import { io } from "socket.io-client";
import Peer from "peerjs";
import { USER_ROLE } from "../../../utils/constant";
import View from "./View";
import "./Room.scss";
class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomId: 1,
      bookingId: 1,
      stream: null,
      streamVideo: null,
      ended: false,
      friendId: 1,
      voice: true,
      camera: true,
      start: true,
      connect: false,
      currentCall: null,
    };
    this.myVideo = React.createRef({});
    this.userVideo = React.createRef({});
    this.socket = io("http://localhost:8080");
    this.peer = new Peer(this.props.userInfo.id, {
      host: "localhost",
      port: "8080",
      path: "peerjs",
    });
  }

  componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      this.setState({ roomId: this.props.match.params.id });
    }
    if (this.props.userInfo && this.props.userInfo.id) {
      this.peer.on("open", (id) => {
        this.socket.emit("join-room", this.state.zoomId, id);
        this.setState({ ended: false });
      });

      this.answerCall();
      this.callVideo();

      this.socket.on("user-disconnected", (id) => {
        if (Number(id) === Number(this.state.friendId)) {
          this.setState({ ended: true });
        }
      });
    }
  }

  answerCall = () => {
    this.peer.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          // this.myVideo.current.srcObject = stream;
          this.setState({ stream: stream });
          if (stream) {
            console.log("MyVideo of AnswerCall" + stream);
          }
          call.answer(stream);
          call.on("stream", (remoteStream) => {
            console.log("VideoRemote from answer: " + remoteStream);
            // this.userVideo.current.srcObject = remoteStream;
            this.setState({ remoteStream: remoteStream });
            this.setState({ start: false });
          });
        });
      this.setState({ currentCall: call });
    });
  };

  callVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        if (this.myVideo && this.myVideo.current) {
          this.myVideo.current.srcObject = currentStream;
        }
        this.setState({ stream: currentStream });

        this.socket.on("user-connected", (userId) => {
          console.log("Có user kết nối: " + userId);
          this.setState({ friendId: userId });
          const call = this.peer.call(userId, this.state.stream);
          call.on("stream", (remoteStream) => {
            if (remoteStream) {
              console.log("VideoRemote from call: " + remoteStream);
            }
            this.setState({ remoteStream: remoteStream });
            this.setState({ start: false });
            this.setState({ ended: false });
          });
          this.setState({ currentCall: call });
        });
      });
  };

  disconnectVideo = async () => {
    this.endCall();
    // this.myVideo.current.srcObject.getTracks().forEach(function (track) {
    //   if (track.readyState === "live") {
    //     track.stop();
    //   }
    // });
    this.state.stream.getTracks().forEach(function (track) {
      if (track.readyState === "live") {
        track.stop();
      }
    });
    console.log(this.props.userInfo);
    const path =
      this.props.userInfo.roleId === USER_ROLE.DOCTOR
        ? "/doctor/manage-patient"
        : "/remote-schedules";
    this.props.history.push(path);
    window.location.reload();
  };

  endCall = () => {
    if (!this.state.currentCall) return;
    try {
      this.state.currentCall.close();
    } catch (error) {
      console.log(error);
    }
    this.setState({ currentCall: undefined });
  };

  render() {
    return (
      <div style={{ backgroundColor: "black" }}>
        <div
          style={{
            height: "100vh",
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="minVideo" style={{ zIndex: 100 }}>
            {/* <video
              playsInline
              autoPlay
              muted
              ref={this.myVideo}
              style={{ height: "20vh" }}
            ></video> */}
            <View height={20} muted={true} stream={this.state.stream} />
          </div>

          {this.state.ended !== true && (
            // <video
            //   playsInline
            //   autoPlay
            //   ref={this.userVideo}
            //   className={"mainVideo"}
            // ></video>
            <div className="mainVideo">
              <View stream={this.state.remoteStream} height={93} />
            </div>
          )}

          {(this.state.start === true || this.state.ended === true) && (
            <div
              style={{
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "30px",
                flexDirection: "column",
                color: "white",
              }}
            >
              Đối phương đang vắng mặt
              <div>Vui lòng chờ...</div>
            </div>
          )}
        </div>
        <div
          style={{
            padding: "10px 20px",
            height: "9vh",
            display: "flex",
            justifyContent: "center",
            position: "fixed",
            bottom: 0,
            width: "100%",
            backgroundColor: "transparent",
          }}
        >
          <Row
            style={{
              gap: 5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Col
              style={{
                display: "flex",
                gap: 30,
                alignItems: "center",
                paddingLeft: 20,
              }}
            >
              <Col
                style={{
                  backgroundColor: "transparent",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "white",
                }}
              >
                <Button
                  type="primary"
                  onClick={() => {
                    // const enabled =
                    //   this.myVideo.current.srcObject.getAudioTracks()[0]
                    //     .enabled;
                    // this.setState({ voice: !enabled });
                    // this.myVideo.current.srcObject.getAudioTracks()[0].enabled =
                    //   !enabled;
                    const enabled =
                      this.state.stream.getAudioTracks()[0].enabled;
                    this.setState({ voice: !enabled });
                    this.state.stream.getAudioTracks()[0].enabled = !enabled;
                  }}
                  style={{
                    backgroundColor: "transparent",
                    fontSize: 20,
                    textAlign: "center",
                  }}
                >
                  {this.state.voice ? (
                    <i className="fa fa-microphone"></i>
                  ) : (
                    <i className="fa fa-microphone-slash"></i>
                  )}
                </Button>
                <Col>Muted</Col>
              </Col>

              <Col
                style={{
                  backgroundColor: "transparent",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "white",
                }}
              >
                <Button
                  type="primary"
                  onClick={() => {
                    // const enabled =
                    //   this.myVideo.current.srcObject.getVideoTracks()[0]
                    //     .enabled;
                    // this.setState({ camera: !enabled });
                    // this.myVideo.current.srcObject.getVideoTracks()[0].enabled =
                    //   !enabled;
                    const enabled =
                      this.state.stream.getVideoTracks()[0].enabled;
                    this.setState({ camera: !enabled });
                    this.state.stream.getVideoTracks()[0].enabled = !enabled;
                  }}
                  style={{ backgroundColor: "transparent", fontSize: 20 }}
                >
                  {this.state.camera ? (
                    <i className="fa fa-video-camera"></i>
                  ) : (
                    <i className="fas">&#xf4e2;</i>
                  )}
                </Button>
                <Col>Start Camera</Col>
              </Col>
              <Col
                style={{
                  backgroundColor: "transparent",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "white",
                }}
              >
                <Button
                  type="primary"
                  onClick={() => {}}
                  style={{ backgroundColor: "transparent", fontSize: 20 }}
                >
                  <i className="fas">&#xf27a;</i>
                </Button>
                <Col>Chat</Col>
              </Col>
              <Col>
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    this.disconnectVideo();
                  }}
                >
                  <i className="fas fa-phone-slash"></i>
                </Button>
              </Col>
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
