import actionTypes from "../actions/actionTypes";

let initialState = {
  socket: null,
  peer: null,
};

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SOCKET_CONNECT_SUCCESS:
      console.log("set true");
      return { ...state, socket: action.socket };
    case actionTypes.SOCKET_CONNECT_FAIL:
      return { ...state, socket: action.socket };
    case actionTypes.PEER_CONNECT_FAIL:
      return { ...state, peer: action.peer };
    case actionTypes.PEER_CONNECT_SUCCESS:
      return { ...state, peer: action.peer };
    default:
      return state;
  }
};

export default socketReducer;
