import actionTypes from "./actionTypes";
import { io } from "socket.io-client";
export const socket = io("http://localhost:8080", { reconnect: true });
export const setSocketReducer = (socket) => {
  return (dispatch) => {
    if (socket.connected === true) {
      dispatch({
        type: actionTypes.SOCKET_CONNECT_SUCCESS,
        socket: socket,
      });
    } else {
      dispatch({ action: actionTypes.SOCKET_CONNECT_FAIL, socket: socket });
    }
  };
};

export const setPeerReducer = (peer) => {
  return (dispatch) => {
    if (peer._open === true) {
      dispatch({
        type: actionTypes.PEER_CONNECT_SUCCESS,
        peer: peer,
      });
    } else {
      dispatch({ type: actionTypes.PEER_CONNECT_FAIL, peer: peer });
    }
  };
};

export const createNameSpace = (userId) => {
  socket.emit("login", userId);
};

export const socketDisconnect = () => {
  socket.disconnect();
};
