import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./HomePage/HomePage";
import DetailDoctor from "./Patient/Doctor/DetailDoctor";
import Doctor from "../routes/Doctor";
import VerifyEmailBooking from "../containers/Patient/VerifyEmailBooking";
import DetailSpecialty from "./Patient/Specialty/DetailSpecialty";
import DetailClinic from "./Patient/Clinic/DetailClinic";
import DetailHandbook from "./Patient/Handbook/DetailHandbook";
import Profile from "./HomePage/Profile";
import RemoteSchedules from "./HomePage/Stream/RemoteSchedules";
import Room from "./HomePage/Stream/Room";
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";

import Home from "../routes/Home";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import System from "../routes/System";
import * as actions from "../store/actions";

// import { CustomToastCloseButton } from "../components/CustomToast";
import ConfirmModal from "../components/ConfirmModal";

import CustomScrollbars from "../components/CustomScrollbars";
import HomeListSection from "./HomePage/ExtendSection/HomeList.Section";

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <ConfirmModal />
            <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
              <div className="content-container">
                <Switch>
                  <Route path={path.HOME} exact component={Home} />
                  <Route
                    path={path.LOGIN}
                    component={userIsNotAuthenticated(Login)}
                  />
                  <Route
                    path={path.REGISTER}
                    component={userIsNotAuthenticated(Register)}
                  />
                  <Route
                    path={path.SYSTEM}
                    component={userIsAuthenticated(System)}
                  />

                  <Route
                    path={path.HOMEPAGE}
                    component={userIsAuthenticated(HomePage)}
                  />

                  <Route
                    path={path.DETAILDOCTOR}
                    component={userIsAuthenticated(DetailDoctor)}
                  />
                  <Route
                    path={path.DETAILHANDBOOK}
                    component={userIsAuthenticated(DetailHandbook)}
                  />
                  <Route
                    path={path.HOMELISTSECTION}
                    component={userIsAuthenticated(HomeListSection)}
                  />

                  <Route
                    path={path.DOCTOR}
                    component={userIsAuthenticated(Doctor)}
                  />

                  <Route
                    path={path.PROFILE}
                    component={userIsAuthenticated(Profile)}
                  />

                  <Route
                    path={path.REMOTE_SCHEDULE}
                    component={userIsAuthenticated(RemoteSchedules)}
                  />

                  <Route
                    path={path.ROOM}
                    component={userIsAuthenticated(Room)}
                  />

                  {/* user confirm schedule */}
                  <Route
                    path={path.VERIFY_EMAIL_BOOKING}
                    component={VerifyEmailBooking}
                  />
                  <Route
                    path={path.DETAILSPECIALTY}
                    component={userIsAuthenticated(DetailSpecialty)}
                  />
                  <Route
                    path={path.DETAILCLINIC}
                    component={userIsAuthenticated(DetailClinic)}
                  />
                </Switch>
              </div>
            </CustomScrollbars>

            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
