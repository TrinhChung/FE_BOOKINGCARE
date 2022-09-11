import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "../containers/Header/Header";
import ManageSchedule from "../containers/System/Doctor/ManageSchedule";
import ManagePatient from "../containers/System/Doctor/ManagePatient";
import CreateHandBook from "../containers/System/Doctor/CreateHandBook";
import ManageDoctor from "../containers/System/Admin/ManageDoctor";
import { USER_ROLE } from "../utils/constant";
import { withRouter } from "react-router-dom";
import * as actions from "../store/actions";

class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: this.props.userInfo,
    };
  }

  componentDidMount() {
    this.props.loginToken();

    if (
      this.state.userInfo &&
      this.state.userInfo.roleId !== USER_ROLE.DOCTOR
    ) {
      this.props.history.push("/home");
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.userInfo !== prevProps.userInfo) {
      this.setState({ userInfo: this.props.userInfo });
    }
  }

  render() {
    const { DoctorMenuPath, isLoggedIn } = this.props;
    return (
      <>
        {isLoggedIn && <Header />}
        <div className="Doctor-container">
          <div className="Doctor-list">
            <Switch>
              <Route
                path="/doctor/manage-schedule"
                component={ManageSchedule}
              />
              <Route path="/doctor/manage-patient" component={ManagePatient} />
              <Route path="/doctor/manage-doctor" component={ManageDoctor} />
              <Route
                path="/doctor/create-handbook"
                component={CreateHandBook}
              />
              <Route
                component={() => {
                  return <Redirect to={DoctorMenuPath} />;
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
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginToken: () => dispatch(actions.loginToken()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
