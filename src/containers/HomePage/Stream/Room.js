import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row, Button, Layout, Badge } from "antd";
import { io } from "socket.io-client";
import Peer from "peerjs";
import { USER_ROLE } from "../../../utils/constant";
import View from "./View";
import "./Room.scss";

const { Sider, Content } = Layout;

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: 1,
      bookingId: 1,
      stream: null,
      streamVideo: null,
      ended: false,
      friend: {
        audio: true,
        video: true,
      },
      voice: true,
      camera: true,
      start: true,
      connect: false,
      currentCall: null,
      dataRemote: {},
      collapsed: false,
      badge: false,
      chats: [],
    };
    this.myVideo = React.createRef({});
    this.userVideo = React.createRef({});
    this.socket = io("http://localhost:8080");
    this.peer = new Peer(this.props.userInfo.id, {
      host: "localhost",
      port: "8080",
      path: "peerjs",
    });
    this.conn = {};
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
        this.socket.emit("join-room", this.state.roomId, id);
        this.setState({ ended: false });
        this.socket.on("newMessage", (data) => {
          if (data.id && data.content) {
            const messages = this.state.chats;
            messages.push(data);
            this.setState({ chats: messages });
            if (this.state.collapsed === true) {
              this.setState({ badge: true });
            }
          }
        });
      });

      this.callVideo();
      this.answerCall();

      this.peer.on("connection", (conn) => {
        this.conn = conn;
        conn.on("data", (data) => {
          let obj = this.state.friend;
          if (data && data.firstName) {
            obj = {
              ...this.state.friend,
              image: data.image,
              name: data.firstName + " " + data.lastName,
            };
            this.setState({
              friend: obj,
            });
          } else {
            this.setState({
              friend: {
                ...this.state.friend,
                ...data,
              },
            });
            console.log(data);
          }
          conn.send(this.props.userInfo);
        });
      });
      this.socket.on("user-disconnected", (id) => {
        if (Number(id) === Number(this.state.friend.id)) {
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
          this.setState({ stream: stream });
          call.answer(stream);
          call.on("stream", (remoteStream) => {
            console.log("remotestream in answer" + remoteStream);
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
        this.setState({ stream: currentStream });
        this.socket.on("user-connected", (userId) => {
          this.setState({ friend: { ...this.state.friend, id: userId } });
          this.conn = this.peer.connect(userId);
          this.conn.on("open", () => {
            this.conn.send(this.props.userInfo);
            this.conn.on("data", (data) => {
              if (data && data.firstName) {
                this.setState({
                  friend: {
                    ...this.state.friend,
                    image: data.image,
                    name: data.firstName + " " + data.lastName,
                  },
                });
              } else {
                this.setState({
                  friend: {
                    ...this.state.friend,
                    ...data,
                  },
                });
                console.log(data);
              }
            });
          });
          const call = this.peer.call(userId, this.state.stream);
          call.on("stream", (remoteStream) => {
            console.log("remotestream in call" + remoteStream);
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
    this.state.stream.getTracks().forEach(function (track) {
      if (track.readyState === "live") {
        track.stop();
      }
    });
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
      <Layout>
        <Content style={{ backgroundColor: "white" }}>
          <div width={"100%"}>
            <div
              style={{
                height: "100vh",
                position: "relative",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="minVideo" style={{ zIndex: 100 }}>
                <View
                  height={20}
                  muted={true}
                  video={this.state.camera}
                  audio={this.state.voice}
                  stream={this.state.stream}
                  image={
                    this.props.userInfo && this.props.userInfo.image
                      ? this.props.userInfo.image
                      : undefined
                  }
                  name={"You"}
                />
              </div>

              {this.state.ended !== true && (
                <div className="mainVideo">
                  <View
                    stream={this.state.remoteStream}
                    height={93}
                    image={
                      this.state.friend.image ? this.state.friend.image : null
                    }
                    name={
                      this.state.friend.name ? this.state.friend.name : null
                    }
                    audio={this.state.friend.audio}
                    video={this.state.friend.video}
                  />
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
                    backgroundColor: "black",
                    color: "white",
                  }}
                >
                  Đối phương đang vắng mặt
                  <div>Vui lòng chờ...</div>
                </div>
              )}
            </div>
          </div>
          <div
            style={{
              padding: "0px 20px",
              height: "8vh",
              display: "flex",
              justifyContent: "center",
              position: "fixed",
              bottom: 0,
              width: "100%",
              backgroundColor: "black",
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
                      const enabled =
                        this.state.stream.getAudioTracks()[0].enabled;
                      this.setState({ voice: !enabled });
                      this.state.stream.getAudioTracks()[0].enabled = !enabled;
                      if (this.conn && this.conn.send) {
                        this.conn.send({ audio: !enabled });
                      }
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
                      const enabled =
                        this.state.stream.getVideoTracks()[0].enabled;
                      this.setState({ camera: !enabled });
                      this.state.stream.getVideoTracks()[0].enabled = !enabled;
                      if (this.conn && this.conn.send) {
                        this.conn.send({ video: !enabled });
                      }
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
                    onClick={() => {
                      this.setState({
                        collapsed: !this.state.collapsed,
                        badge: false,
                      });
                    }}
                    style={{ backgroundColor: "transparent", fontSize: 20 }}
                  >
                    {this.state.badge === true ? (
                      <Badge showZero={0} dot>
                        <i
                          className="fas"
                          style={{ fontSize: 20, color: "white" }}
                        >
                          &#xf27a;
                        </i>
                      </Badge>
                    ) : (
                      <i
                        className="fas"
                        style={{ fontSize: 20, color: "white" }}
                      >
                        &#xf27a;
                      </i>
                    )}
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
        </Content>
        <Sider
          trigger={null}
          width={300}
          style={{
            backgroundColor: "#cccccc80",
          }}
          collapsed={this.state.collapsed}
          collapsedWidth={0}
        >
          <div style={{ height: "100%", display: "flex", flexFlow: "column" }}>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                textJustify: "center",
                padding: 10,
                backgroundColor: "#cccccc",
                width: "100%",
                flex: "0 1 auto",
              }}
            >
              Tin nhắn
            </div>
            <div
              style={{
                flex: "1 1 auto",
                backgroundColor: "#fafafa",
                padding: 10,
                overflow: "auto",
              }}
            >
              {this.state.chats.length > 0 &&
                this.state.chats.map((chat, index) => {
                  return (
                    <div key={index} style={{ padding: "5px 0" }}>
                      <Row
                        className={
                          chat.id === this.props.userInfo.id
                            ? "name-your-chat"
                            : "name-friend-chat"
                        }
                      >
                        <di>
                          {chat.id === this.props.userInfo.id
                            ? "You"
                            : this.state.friend.name}
                        </di>
                      </Row>
                      <Row
                        className={
                          chat.id === this.props.userInfo.id
                            ? "your-chat"
                            : "friend-chat"
                        }
                      >
                        <div>{chat.content}</div>
                      </Row>
                    </div>
                  );
                })}
            </div>
            <div
              style={{
                flex: "0 1 50px",
                backgroundColor: "#cccccc",
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  border: "1px solid #cccccc80",
                  borderRadius: "40%",
                }}
              >
                <input
                  type="text"
                  style={{
                    width: "100%",
                    outline: "none",
                    border: "none",
                    paddingLeft: "10px",
                    backgroundColor: "#fafafa",
                    borderRadius: "40px",
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      console.log(e);
                      this.socket.emit("message", {
                        content: e.target.value,
                        id: this.props.userInfo.id,
                      });
                      e.target.value = "";
                    }
                  }}
                  placeholder={"Nhập nội dung chat tại đây"}
                />
              </div>
            </div>
          </div>
        </Sider>
      </Layout>
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
