import React, { Component } from "react";
import { Popover, Row, Badge, Col } from "antd";
import "./Notification.scss";
import {
  getAllNotificationsService,
  bulkReaderNotificationService,
} from "../../services/userService";
import { socket } from "../../store/actions/socketActions";
class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      notificationsNotRead: [],
      total: 7,
      totalNotRead: 0,
    };
  }

  fetchNotifications = async () => {
    const res = await getAllNotificationsService(this.state.total);
    if (res.errCode === 0 && res.data) {
      this.setState({ notifications: res.data });
      if (res.data.length > 0) {
        const arr = [];
        res.data.forEach((notification) => {
          if (notification.read === 0) {
            arr.push(notification.id);
          }
        });
        if (arr.length > 0) {
          this.setState({ notificationsNotRead: arr });
        }
        this.setState({ totalNotRead: arr.length });
      }
    }
  };

  readNotifications = async (notifications) => {
    if (notifications && notifications.length > 0) {
      const res = await bulkReaderNotificationService(notifications);
      if (res.errCode === 0) {
        this.fetchNotifications();
      }
    }
  };

  componentDidMount() {
    this.fetchNotifications();
    if (socket) {
      socket.on("notification", (data) => {
        this.fetchNotifications();
      });
    }
  }

  ItemNotification = (data) => {
    return (
      <Row className={"item-notification"}>
        <Badge dot={data.read === 0 ? true : false}>
          <Row>
            <Col span={24}>{data.content}</Col>
            <Col
              span={24}
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "3px",
              }}
            >
              {/* <Row style={{ display: "flex", justifyContent: "space-between" }}> */}
              <div
                style={{
                  fontStyle: "italic",
                  fontSize: "11px",
                  paddingLeft: 3,
                }}
              >
                {data.time}
              </div>
              <div
                className="markdown"
                style={{ color: "#45c3d2" }}
                onClick={() => {
                  this.readNotifications([data.id]);
                }}
              >
                Đánh dấu đã xem
              </div>
              {/* </Row> */}
            </Col>
          </Row>
        </Badge>
      </Row>
    );
  };

  render() {
    return (
      <Popover
        content={
          <div style={{ paddingBottom: "0" }}>
            <Row
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{ color: "blue", cursor: "pointer" }}
                className="markdown"
                onClick={() => {
                  if (this.state.total > this.state.notifications.length) {
                    this.setState({ total: 7 });
                  } else {
                    this.setState({ total: this.state.total + 5 });
                  }
                  this.fetchNotifications();
                }}
              >
                {this.state.total > this.state.notifications.length
                  ? "Thu gọn"
                  : "Xem thêm "}
              </div>
            </Row>
            <div className={"notification-content"}>
              {this.state.notifications.length > 0 &&
                this.state.notifications.map((notification) => {
                  return this.ItemNotification(notification);
                })}
            </div>
            <Row
              className={"markdown"}
              style={{ color: "green", cursor: "pointer", fontSize: "14px" }}
              onClick={() => {
                this.readNotifications(this.state.notificationsNotRead);
              }}
            >
              Đánh dấu đã xem tất cả
            </Row>
          </div>
        }
        style={{
          margin: "0!important",
          padding: "0!important",
        }}
        title="Thông báo"
        trigger="click"
        // open={this.props.open}
      >
        <Badge size="small" count={this.state.totalNotRead} overflowCount={9}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "20px",
              cursor: "pointer",
              width: 38,
              height: 38,
              justifyContent: "center",
              borderRadius: "30px",
              color: "#ffc10e",
              border: "1px solid #ffc10e",
            }}
          >
            <i className="fas fa-bell"></i>
          </div>
        </Badge>
      </Popover>
    );
  }
}

export default Notification;
