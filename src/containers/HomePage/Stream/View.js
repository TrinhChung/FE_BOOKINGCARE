import React, { Component } from "react";

class View extends Component {
  constructor(props) {
    super(props);
    this.myVideo = React.createRef();
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
    const { muted, height } = this.props;
    return (
      <video
        playsInline
        muted={muted}
        autoPlay
        ref={this.myVideo}
        style={{ height: `${height}vh` }}
      />
    );
  }
}

export default View;
