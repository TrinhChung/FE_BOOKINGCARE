import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import UserRedux from "../containers/System/Admin/UserRedux";
import Header from "../containers/Header/Header";
import * as actions from "../store/actions";
import ManageDoctor from "../containers/System/Admin/ManageDoctor";
import ManageSchedule from "../containers/System/Doctor/ManageSchedule";

import ManageSpecialty from "../containers/System/Specialty/ManageSpecialty";
import ManageClinic from "../containers/System/Clinic/ManageClinic";
import { USER_ROLE } from "../utils/constant";
import { withRouter } from "react-router-dom";

class System extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: this.props.userInfo,
    };
  }

  componentDidMount() {
    this.props.loginToken();

    if (this.state.userInfo && this.state.userInfo.roleId !== USER_ROLE.ADMIN) {
      this.props.history.push("/home");
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.userInfo !== prevProps.userInfo) {
      this.setState({ userInfo: this.props.userInfo });
    }
  }

  render() {
    const { systemMenuPath, isLoggedIn } = this.props;

    return (
      <>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/user-manage" component={UserManage} />
              <Route path="/system/user-redux" component={UserRedux} />
              <Route path="/system/manage-doctor" component={ManageDoctor} />
              <Route
                path="/system/manage-schedule"
                component={ManageSchedule}
              />
              <Route
                path="/system/manage-specialty"
                component={ManageSpecialty}
              />
              <Route path="/system/manage-clinic" component={ManageClinic} />

              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginToken: () => dispatch(actions.loginToken()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(System));
