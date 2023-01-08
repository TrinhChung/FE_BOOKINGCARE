import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Col, Row, Tree, Avatar, Input, Select } from "antd";
import {
  HeartOutlined,
  DownOutlined,
  CommentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  getCommentByFkId,
  sendCommentService,
} from "../../../services/userService";
import "./Comment.scss";
import moment from "moment";
import ModalLoadingOverlay from "../../../components/ModalLoadingOverlay";
import { toast } from "react-toastify";
class Comment extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      fkId: 0,
      keyMap: 0,
      comments: [],
      parentId: 0,
      loading: false,
      change: false,
      pushedComment: false,
      minComment: 2,
    };
  }
  dataSelect = [
    { value: 0, label: "Mới nhất" },
    { value: 1, label: "Cũ nhất" },
  ];

  async componentDidMount() {
    if (this.props.fkId > 0 && this.props.keyMap > 0) {
      this.fetchComments();
    }
  }

  buildCommentData = (arr) => {
    if (arr.length > 0) {
      arr = arr.map((item) => {
        item.title = this.ElementComment(item);
        if (item.children && item.children.length > 0) {
          this.buildCommentData(item.children);
        }
        item.res = false;
        return item;
      });
    }

    return arr;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.fkId !== prevProps.fkId) {
      if (this.props.fkId > 0 && this.props.keyMap > 0) {
        this.fetchComments();
      }
    }
    if (this.state.change !== prevState.change) {
      this.setState({ comments: this.buildCommentData(this.state.comments) });
    }
    if (this.state.pushedComment !== prevState.pushedComment) {
      this.fetchComments();
    }
  }

  fetchComments = async () => {
    const res = await getCommentByFkId(this.props.fkId, this.props.keyMap);
    if (res.errCode === 0 && res.data) {
      this.setState({ comments: this.buildCommentData(res.data) });
    }
  };

  sendComment = async (content, id) => {
    if (id >= 0 && content && content.length > 0) {
      const data = {
        parentId: id,
        content: content,
        keyMap: this.props.keyMap,
        fkId: this.props.fkId,
        userId: this.props.userInfo.id,
      };
      const res = await sendCommentService(data);
      if (res.errCode === 0) {
        toast.success("Đã comment");
        this.setState({ pushedComment: !this.state.pushedComment });
        return true;
      } else {
        toast.error(res.errMessage);
        return false;
      }
    }
  };

  ElementComment = (obj) => {
    return (
      <div style={{ width: "100%", padding: "5px 0" }}>
        <Row>
          <Col style={{ marginRight: "10px" }}>
            <Avatar
              src={obj.user && obj.user.image ? obj.user.image : undefined}
              icon={
                obj.user &&
                obj.user.image &&
                obj.user.image &&
                obj.user.image.length > 0 ? (
                  <></>
                ) : (
                  <UserOutlined />
                )
              }
            />
          </Col>
          <Col
            style={{
              backgroundColor: "#cccccc80",
              padding: "5px 10px",
              borderRadius: "10px",
            }}
          >
            <Row
              style={{ fontWeight: "bold", fontSize: 14, lineHeight: "14px" }}
            >
              {obj.user.lastName + " " + obj.user.firstName}
            </Row>
            <Row>{obj.content}</Row>
            <Row
              style={{
                padding: 0,
                margin: 0,
                fontStyle: "italic",
                lineHeight: "11px",
              }}
            >
              <Col
                className="resComment"
                onClick={() => {
                  obj.res = !obj.res;
                  this.setState({
                    parentId: obj.id,
                    change: !this.state.change,
                    content: "",
                  });
                }}
              >
                Phản hồi
              </Col>
              <Col className="time-comment">
                {moment(obj.createdAt).fromNow()}
              </Col>
            </Row>
          </Col>
        </Row>
        {obj.res === true ? <Row>{this.BoxInputComment(obj.id)}</Row> : <></>}
      </div>
    );
  };

  BoxInputComment = (id) => {
    return (
      <Row width="100%" style={{ padding: "5px 20px", minWidth: "500px" }}>
        <Col
          style={{
            float: "right",
            marginRight: "10px",
            display: "flex",
            justifyContent: "end",
          }}
          flex={"40px"}
        >
          <Avatar
            src={
              this.state.userInfo && this.state.userInfo.image
                ? this.state.userInfo.image
                : ""
            }
            icon={
              this.state.userInfo &&
              this.state.userInfo.image &&
              this.state.userInfo.image.length > 0 ? (
                <></>
              ) : (
                <UserOutlined />
              )
            }
          />
        </Col>
        <Col flex="auto">
          <Input
            style={{ borderRadius: "20px", width: "100%" }}
            placeholder="Viết đánh giá của bạn tại đây"
            autoSize
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                this.sendComment(e.target.value, id);
                if (this.state.pushedComment) {
                  e.target.value = "";
                }
              }
            }}
          />
        </Col>
      </Row>
    );
  };

  render() {
    return (
      <div
        style={{
          padding: "20px 140px",
          borderRadius: 20,
        }}
      >
        <Row
          gutter={[8, 8]}
          style={{
            borderTop: "1px solid gray",
            borderBottom: "1px solid gray",
          }}
        >
          <Col span={12}>
            <Row className="item-react-comment">
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <HeartOutlined style={{ fontSize: 25, color: "red" }} />
              </Col>
              <Col>Thích</Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row className="item-react-comment">
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CommentOutlined style={{ fontSize: 25 }} />
              </Col>
              <Col style={{ display: "flex", alignItems: "center" }}>
                Comment
              </Col>
            </Row>
          </Col>
        </Row>
        <Row
          style={{
            paddingTop: 20,
            backgroundColor: "#cccccc30",
          }}
        >
          <Col span={24}>{this.BoxInputComment(0)}</Col>
          <Col span={24}>
            <Row style={{ display: "flex", justifyContent: "space-between" }}>
              <Col
                style={{
                  padding: "5px 0 0 20px",
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: "gray",
                }}
              >
                Tải thêm bình luận
              </Col>

              <Col style={{ paddingRight: 20 }}>
                <Select defaultValue={0} options={this.dataSelect} />
              </Col>
            </Row>
          </Col>
          <Tree
            showLine
            switcherIcon={<DownOutlined />}
            treeData={this.state.comments}
            style={{
              width: "100%",
              backgroundColor: "#cccccc30",
              paddingTop: 20,
            }}
            checkedKeys={this.setState.parentId}
            selectable={false}
          />
        </Row>
        <ModalLoadingOverlay
          isOpen={this.state.loading}
          onOk={() => this.setState({ loading: false })}
          onCancel={() => this.setState({ loading: false })}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Comment)
);
