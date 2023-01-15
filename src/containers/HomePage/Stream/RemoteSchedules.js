import React, { Component } from "react";
import { connect } from "react-redux";
import HomePageLayout from "../../../Layout/HomePageLayout";
import { Table, Button } from "antd";
import { getBookingsService } from "../../../services/userService";
class RemoteSchedules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
    };
  }

  componentDidMount() {
    this.getBookingRemote();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  getBookingRemote = async () => {
    const res = await getBookingsService(0);
    if (res.errCode === 0) {
      this.setState({ bookings: this.buildData(res.data) });
    }
  };

  buildData = (arr) => {
    const { language } = this.props;
    const data = [];
    for (let i = 0; i < arr.length; i++) {
      const o = {};
      o.key = i + 1;
      o.index = i + 1;
      o.nameDoctor = "Chung";
      o.time =
        language === "vi"
          ? arr[i].timeTypeDataBooking.valueVi
          : arr[i].timeTypeDataBooking.valueEn;

      o.reason = arr[i].reason ? arr[i].reason : "Khong ly do";
      o.bookingId = arr[i].id;
      o.date = arr[i].date;
      data.push(o);
    }
    return data;
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
        title: "Tên bác sĩ",
        dataIndex: "nameDoctor",
        key: "nameDoctor",
        width: 150,
        align: "center",
      },
      {
        title: "Ngày khám",
        dataIndex: "date",
        key: "date",
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
                this.props.history.push(`/room/${record.bookingId}`);
              }}
            >
              Xem
            </Button>
          );
        },
      },
    ];

    return (
      <HomePageLayout isShowBanner={false}>
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
          <Table columns={columns} dataSource={this.state.bookings} />
        </div>
      </HomePageLayout>
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
