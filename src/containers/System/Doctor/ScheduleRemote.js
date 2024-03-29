import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Button, Pagination, Row } from "antd";
import DatePicker from "../../../components/Input/DatePicker";
import { getAllPatientAllDoctorService } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import RemedyModal from "../Doctor/RemedyModal";

class RemoteSchedules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date().setHours(0, 0, 0, 0),
      currentPage: 1,
      countPage: 50,
      pageSize: 10,
      listPatients: [],
      isOpenModal: false,
      email: "",
      id: 1,
    };
  }

  componentDidMount() {
    this.getAllPatientAllDoctor();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.user !== prevProps.user) {
      this.getAllPatientAllDoctor();
    }

    if (prevState.currentDate !== this.state.currentDate) {
      this.getAllPatientAllDoctor();
    }
  }

  handleOnChangeDatePicker = (date) => {
    this.setState({ currentDate: date[0] });
  };

  getAllPatientAllDoctor = async () => {
    let { user } = this.props;
    let { currentDate, currentPage } = this.state;
    let formattedDate = new Date(currentDate).getTime();
    let res = await getAllPatientAllDoctorService(
      user.id,
      formattedDate,
      currentPage,
      0
    );
    if (res && res.errCode === 0 && res.data) {
      this.setState({
        listPatients: this.buildData(res.data.patientData),
        countPage: res.data.countPage * 10,
      });
    }
  };

  buildData = (arr) => {
    const { language } = this.props;
    const data = [];
    for (let i = 0; i < arr.length; i++) {
      const o = {};
      o.key = i + 1;
      o.index = i + 1;
      o.nameDoctor = arr[i].patientData.firstName;
      o.time =
        language === "vi"
          ? arr[i].timeTypeDataBooking.valueVi
          : arr[i].timeTypeDataBooking.valueEn;

      o.reason = arr[i].reason ? arr[i].reason : "Khong ly do";
      o.bookingId = arr[i].id;
      o.email = arr[i].patientData.email;
      data.push(o);
    }

    return data;
  };
  toggleUserModal = () => {
    this.setState({ isOpenModal: false });
  };

  handleConfirm = (email, id) => {
    console.log(id);
    this.setState({ email: email, id: id, isOpenModal: true });
  };

  render() {
    const columns = [
      {
        title: "STT",
        dataIndex: "index",
        key: "index",
        width: 50,
        height: 56,
        align: "center",
      },
      {
        title: "Tên bệnh nhân",
        dataIndex: "nameDoctor",
        key: "nameDoctor",
        align: "center",
      },
      {
        title: "Thời gian khám",
        dataIndex: "time",
        key: "time",
        width: 150,
        align: "center",
      },
      {
        title: "Lý do khám bênh",
        dataIndex: "reason",
        key: "reason",
        align: "center",
      },
      {
        title: "Thao tác",
        dataIndex: "actions",
        key: "actions",
        width: 250,
        align: "center",
        render: (text, record, index) => {
          return (
            <Row style={{ display: "flex", gap: 10 }}>
              <Button
                type="primary"
                onClick={() => {
                  this.props.history.push(`/room/${record.bookingId}`);
                }}
              >
                Khám Online
              </Button>
              <Button
                type="primary"
                onClick={() =>
                  this.handleConfirm(record.email, record.bookingId)
                }
                danger
              >
                Hoàn tất
              </Button>
            </Row>
          );
        },
      },
    ];

    const { countPage } = this.state;

    return (
      <>
        <RemedyModal
          isOpen={this.state.isOpenModal}
          toggleFormParent={this.toggleUserModal}
          email={this.state.email}
          id={this.state.id}
          reloadList={this.getAllPatientAllDoctor}
        />
        <div className="col-4 form-group">
          <label>
            <FormattedMessage id="manage-patient.choose-day" />
          </label>
          <DatePicker
            onChange={this.handleOnChangeDatePicker}
            className="form-control"
            value={this.state.currentDate}
          />
        </div>
        <div style={{ padding: "0 100px 0 0 " }}>
          <div
            style={{
              fontSize: 16,
              textTransform: "uppercase",
              fontWeight: "bold",
              padding: "10px 0",
            }}
          >
            Danh sách lịch khám bệnh từ xa
          </div>
          <div>
            <Table
              columns={columns}
              dataSource={[...this.state.listPatients]}
              pagination={false}
            />
            <div style={{ float: "right", paddingTop: 10 }}>
              <Pagination
                defaultCurrent={this.state.currentPage}
                total={countPage}
                pageSize={10}
              />
            </div>
          </div>
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemoteSchedules);
