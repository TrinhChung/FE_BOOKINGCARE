import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import { getAllPatientAllDoctor } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import RemedyModal from "../Doctor/RemedyModal";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date().setHours(0, 0, 0, 0),
      listPatients: [],
      isOpenModal: false,
    };
  }

  async componentDidMount() {
    this.getAllPatientAllDoctor();
  }

  getAllPatientAllDoctor = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formattedDate = new Date(currentDate).getTime();
    let res = await getAllPatientAllDoctor(user.id, formattedDate);
    if (res && res.errCode === 0 && res.data) {
      this.setState({ listPatients: res.data });
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.listPatients !== prevState.listPatients) {
      this.getAllPatientAllDoctor();
    }
  }

  handleOnChangeDatePicker = (date) => {
    this.setState({ currentDate: date[0] });
  };

  toggleUserModal = () => {
    this.setState({ isOpenModal: false });
  };

  handleConfirm = () => {
    console.log(1);
    this.setState({ isOpenModal: true });
  };

  render() {
    let { language } = this.props;
    return (
      <div className="manage-patient-container">
        <RemedyModal
          isOpen={this.state.isOpenModal}
          toggleFormParent={this.toggleUserModal}
          // createNewUser={this.createNewUser}
          // className={"modal-user-container"}
        />
        <div className="manage-patient-title">
          <FormattedMessage id="manage-patient.manage-patient" />
        </div>
        <div className="manage-patient-body row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manage-patient.choose-day" />
            </label>
            <DatePicker
              onChange={this.handleOnChangeDatePicker}
              className="form-control"
              minDate={new Date().setHours(0, 0, 0, 0)}
              value={this.state.currentDate}
            />
          </div>
          <div className="table-manage-patient">
            <table id="customers">
              <tbody>
                <tr>
                  <th>
                    <FormattedMessage id="manage-patient.od" />
                  </th>
                  <th>
                    <FormattedMessage id="manage-patient.full-name" />
                  </th>
                  <th>
                    <FormattedMessage id="manage-patient.email" />
                  </th>
                  <th>
                    <FormattedMessage id="manage-patient.email" />
                  </th>
                  <th>
                    <FormattedMessage id="manage-patient.gender" />
                  </th>
                  <th>
                    <FormattedMessage id="manage-patient.time" />
                  </th>
                  <th>
                    <FormattedMessage id="manage-patient.confirm" />
                  </th>
                </tr>

                {this.state.listPatients.map((patient, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {patient.patientData && patient.patientData.firstName
                          ? patient.patientData.firstName
                          : ""}
                      </td>
                      <td>{patient.patientData.email}</td>
                      <td>{patient.patientData.address}</td>

                      <td>
                        {language === LANGUAGES.VI
                          ? patient.patientData.genderData.valueVi
                          : patient.patientData.genderData.valueEn}
                      </td>
                      <td>
                        {language === LANGUAGES.VI
                          ? patient.timeTypeDataBooking.valueVi
                          : patient.timeTypeDataBooking.valueEn}
                      </td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleConfirm()}
                        >
                          <i className="fas fa-pencil-alt"></i>
                          <FormattedMessage id="manage-patient.confirm" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
