import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import { LANGUAGES } from "../../../utils";
import { Tabs } from "antd";
import ScheduleRemote from "./ScheduleRemote";
import ScheduleOffline from "./ScheduleOffline";
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { language } = this.props;
    const items = [
      {
        key: "1",
        label: `Lịch hẹn Offline`,
        children: <ScheduleOffline />,
      },
      {
        key: "2",
        label: `Lịch hẹn Online`,
        children: <ScheduleRemote history={this.props.history} />,
      },
    ];
    return (
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={(e) => {
          console.log(e);
        }}
        style={{ paddingLeft: 100 }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
