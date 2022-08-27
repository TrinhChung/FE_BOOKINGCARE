import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "../containers/Header/Header";
import ManageSchedule from "../containers/System/Doctor/ManageSchedule";
import ManagePatient from "../containers/System/Doctor/ManagePatient";
import CreateHandBook from "../containers/System/Doctor/CreateHandBook";
class Doctor extends Component {
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
