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

  readNotifications = async () => {
    if (this.state.notificationsNotRead) {
      const res = await bulkReaderNotificationService(
        this.state.notificationsNotRead
      );
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
                justifyContent: "flex-end",
                paddingTop: "3px",
                fontSize: "11px",
              }}
            >
              <div style={{ fontStyle: "italic" }}>{data.time}</div>
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
          <div style={{ paddingBottom: "10px" }}>
            <Row
              style={{
                display: "flex",
                justifyContent: "flex-end",
                textDecoration: "underline",
                color: "blue",
                cursor: "pointer",
              }}
            >
              <div
                onClick={() => {
                  if (this.state.total > this.state.notifications.length) {
                    this.setState({ total: 7 });
                  } else {
                    this.setState({ total: this.state.total + 5 });
                  }
                  this.fetchNotifications();
                  this.readNotifications();
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
          </div>
        }
        style={{
          margin: "0!important",
          padding: "0!important",
        }}
        title="Thông báo"
        trigger="click"
        // open={this.props.open}
        onOpenChange={(e) => {
          if (e === true) {
            this.readNotifications();
          }
        }}
      >
        <Badge size="small" count={this.state.totalNotRead} overflowCount={9}>
          {this.props.children}
        </Badge>
      </Popover>
    );
  }
}

export default Notification;
