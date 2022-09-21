import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "./ButtonLike.scss";

import {
  handleLike,
  deleteLike,
  getFavoritesService,
} from "../../services/userService";

class DefaultClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      isLike: 0,
    };
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.data !== prevProps.data &&
      this.props.data.fkId &&
      this.props.data.keyMap
    ) {
      this.getFavorites(this.props.data);
    }
  }

  handleLike = async () => {
    if (this.state.isLike === 1) {
      let res = await deleteLike(this.props.data);
      if (res && res.errCode === 0) {
        this.getFavorites(this.props.data);
      }
    } else {
      let res = await handleLike(this.props.data);
      if (res && res.errCode === 0) {
        this.getFavorites(this.props.data);
      }
    }
  };

  getFavorites = async (data) => {
    let res = await getFavoritesService(data);
    if (res && res.errCode === 0) {
      this.setState({ isLike: res.data.isLike, count: res.data.count });
    } else {
      toast.error(res.errMessage);
    }
  };

  render() {
    let { count, isLike } = this.state;
    let { check } = this.props;

    return (
      <div className="buttonLike">
        <div
          className={`icon ${isLike ? "red" : ""}`}
          onClick={() => this.handleLike()}
        >
          <i className="fa fa-heart" aria-hidden="true"></i>
        </div>
        <div>
          {check ? `Có ${count} người thích nội dung này!` : `${count}`}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
