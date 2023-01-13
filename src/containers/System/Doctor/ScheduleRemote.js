import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Button } from "antd";

class RemoteSchedules extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {}

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
        title: "Tên bác sĩ",
        dataIndex: "nameDoctor",
        key: "nameDoctor",
        width: 150,
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
        width: 150,
        align: "center",
      },
      {
        title: "Thao tác",
        dataIndex: "actions",
        key: "actions",
        width: 150,
        align: "center",
        render: (text, record, index) => {
          return (
            <Button
              type="primary"
              onClick={() => {
                this.props.history.push(`/room/${record.doctorId}`);
              }}
            >
              Xem
            </Button>
          );
        },
      },
    ];

    const data = [
      {
        index: 1,
        key: 1,
        nameDoctor: "Chung",
        time: "10/1/2023",
        reason: "Nhuc dau",
        doctorId: 1,
      },
    ];
    return (
      <>
        <div style={{ padding: "0 100px" }}>
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
            <Table columns={columns} dataSource={data} />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemoteSchedules);
