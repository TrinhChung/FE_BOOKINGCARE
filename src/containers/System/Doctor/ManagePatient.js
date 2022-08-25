import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import { getAllPatientAllDoctorService } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import RemedyModal from "../Doctor/RemedyModal";
import * as actions from "../../../store/actions";
import ReactPaginate from "react-paginate";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date().setHours(0, 0, 0, 0),
      listPatients: [],
      isOpenModal: false,
      currentPage: 0,
      countPage: 1,
      email: "",
      id: 1,
    };
  }

  async componentDidMount() {
    this.getAllPatientAllDoctor();
  }

  getAllPatientAllDoctor = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formattedDate = new Date(currentDate).getTime();
    let res = await getAllPatientAllDoctorService(user.id, formattedDate, 1);
    if (res && res.errCode === 0 && res.data) {
      this.setState({
        listPatients: res.data.patientData,
        countPage: res.data.countPage,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    // if (this.state.listPatients !== prevState.listPatients) {
    //   this.getAllPatientAllDoctor();
    // }
  }

  handleOnChangeDatePicker = (date) => {
    this.setState({ currentDate: date[0] });
  };

  toggleUserModal = () => {
    this.setState({ isOpenModal: false });
  };

  handleConfirm = (email, id) => {
    console.log(id);
    this.setState({ email: email, id: id, isOpenModal: true });
  };

  handleChangePage = (e) => {
    this.setState({ currentPage: e.target.value });
  };

  render() {
    let { language } = this.props;
    return (
      <div className="manage-patient-container">
        <RemedyModal
          isOpen={this.state.isOpenModal}
          toggleFormParent={this.toggleUserModal}
          email={this.state.email}
          id={this.state.id}
          reloadList={this.getAllPatientAllDoctor}
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
                    <FormattedMessage id="manage-patient.address" />
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
                          onClick={() =>
                            this.handleConfirm(
                              patient.patientData.email,
                              patient.id
                            )
                          }
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
            <div className="d-flex justify-content-center mt-2">
              <ReactPaginate
                pageCount={this.state.countPage}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={(e) => this.handleChangePage(e)}
                forcePage={this.state.currentPage}
                pageClassName="page-item"
                activeClassName="active"
                nextLinkClassName="page-link"
                previousLinkClassName="page-link"
                previousClassName="page-item"
                pageLinkClassName="page-link"
                nextClassName="page-item"
                containerClassName="pagination"
                breakLinkClassName="page-link"
                breakClassName="page-item"
                breakLabel="..."
                nextLabel="Next"
                previousLabel="Previous"
              />
            </div>
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
