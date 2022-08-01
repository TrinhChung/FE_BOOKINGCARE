import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import { LANGUAGES } from "../../../utils";
import { getInfoDoctorByIdService } from "../../../services/userService";
import NumberFormat from "react-number-format";

import { FormattedMessage } from "react-intl";

class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hiddenInfo: true,
      extraInfo: {},
    };
  }

  componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
    }

    if (this.props.detailDoctorId !== prevProps.detailDoctorId) {
      let res = await getInfoDoctorByIdService(this.props.detailDoctorId);
      if (res && res.errCode === 0) {
        this.setState({ extraInfo: res.data });
      }
    }
  }

  setHiddenTrue = () => {
    this.setState({ hiddenInfo: true });
  };

  setHiddenFalse = () => {
    this.setState({ hiddenInfo: false });
  };
  fullInfo = (language) => {
    let extraInfo = this.state.extraInfo;
    return (
      <div className="wrap-info">
        <div className="content-up">
          <div className="title-clinic">
            <FormattedMessage id="patient.extra-info-doctor.address-clinic" />
          </div>
          <div className="name-clinic">
            {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ""}
          </div>
          <div className="name-clinic">
            {extraInfo && extraInfo.addressClinic
              ? extraInfo.addressClinic
              : ""}
          </div>
        </div>
        <hr></hr>
        <div className="content-down">
          <div className="price-box">
            <div></div>
            <div className="title-clinic">
              <FormattedMessage id="patient.extra-info-doctor.price-test" />:
            </div>
            <div className="box-content">
              <div className="box-up">
                <div className="price">
                  <div>
                    <FormattedMessage id="patient.extra-info-doctor.price-test" />
                  </div>
                  <div>
                    {extraInfo &&
                    extraInfo.priceData &&
                    extraInfo.priceData.valueVi &&
                    extraInfo.priceData.valueEn ? (
                      language === LANGUAGES.VI ? (
                        <NumberFormat
                          value={extraInfo.priceData.valueVi}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"VNĐ"}
                        />
                      ) : (
                        extraInfo.priceData.valueEn + "$"
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="text-content" style={{ maxWidth: "400px" }}>
                  {extraInfo && extraInfo.note ? extraInfo.note : ""}
                </div>
              </div>
              <div className="box-down">
                <div className="text-content">
                  <FormattedMessage id="patient.extra-info-doctor.payment" />
                  {extraInfo &&
                  extraInfo.paymentData &&
                  extraInfo.paymentData.valueVi
                    ? language === LANGUAGES.VI
                      ? extraInfo.paymentData.valueVi
                      : extraInfo.paymentData.valueEn
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden-content" onClick={() => this.setHiddenTrue()}>
          <FormattedMessage id="patient.extra-info-doctor.hiddenInfo" />
        </div>
      </div>
    );
  };

  hiddenInfo = (language) => {
    let extraInfo = this.state.extraInfo;

    return (
      <div className="wrap-info">
        <div className="content-up">
          <div className="title-clinic">
            {" "}
            <FormattedMessage id="patient.extra-info-doctor.address-clinic" />
          </div>
          <div className="name-clinic">
            {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ""}
          </div>
          <div className="name-clinic">
            {extraInfo && extraInfo.addressClinic
              ? extraInfo.addressClinic
              : ""}
          </div>
        </div>
        <hr></hr>
        <div className="content-down">
          <div className="d-flex">
            <div className="title-clinic">
              <FormattedMessage id="patient.extra-info-doctor.price-test" />:
            </div>
            <div className="mt-1 mx-2 value-price">
              {extraInfo &&
              extraInfo.priceData &&
              extraInfo.priceData.valueVi &&
              extraInfo.priceData.valueEn ? (
                language === LANGUAGES.VI ? (
                  <NumberFormat
                    value={extraInfo.priceData.valueVi}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"VNĐ"}
                  />
                ) : (
                  extraInfo.priceData.valueEn + "$"
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="hidden-content" onClick={() => this.setHiddenFalse()}>
          <FormattedMessage id="patient.extra-info-doctor.moreInfo" />
        </div>
      </div>
    );
  };

  render() {
    let { language } = this.props;
    console.log(this.state.extraInfo);

    return (
      <div className="doctor-extra-info-container">
        <div style={{ height: "31px" }}></div>
        {!this.state.hiddenInfo
          ? this.fullInfo(language)
          : this.hiddenInfo(language)}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
