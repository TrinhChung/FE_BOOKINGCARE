import actionTypes from "./actionTypes";
import { io } from "socket.io-client";
import Peer from "simple-peer";
const socket = io(process.env.REACT_APP_BACKEND_URL);
const myVideo = {};

const turnCamera = () => {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {
      setStream(stream);
      myVideo.srcObject = stream;
    });
  socket.on("me", (id) => {
    setMe(id);
  });
  socket.on("callUser", ({ from, name: callerName, signal }) => {
    setCall({ isReceivedCall: true, from, name: callerName, signal });
  });
};

const answerCall = () => {
  setCalledAccepted(true);
  const peer = new Peer({ initiator: false, trickle: false, stream });

  peer.on("signal", () => {
    socket.emit("answercall", { signal: data, to: call.from });
  });

  peer.on("stream", (currentStream) => {
    userVideo.srcObject = currentStream;
  });

  peer.signal(call.signal);

  connection.current = peer;
};

const callUser = (user) => {
  const peer = new Peer({ initiator: true, trickle: false, stream });

  peer.on("signal", (data) => {
    socket.emit("calluser", { userToCall: id, signalData: data, from: me });
  });

  peer.on("stream", (currentStream) => {
    userVideo.srcObject = currentStream;
  });
};

const leaveCall = () => {};
