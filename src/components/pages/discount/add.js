import React, { Component } from 'react'
import {
    MDBContainer,
    MDBBtn,
    Row,
    Col,
    toast
} from 'mdbreact';
import * as moment from 'moment';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import * as PromotionApi from '../../../api/promotion';
import imageDefault from "../../../assets/default.jpg"
import Loading from '../loading';

export default class AddDiscount extends Component {
    //#region CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            promotionName: "",
            promotionValue: "",
            base64: imageDefault,
            date: [new Date(), new Date()],

            isShowLoading: false,
            listCategory: []
        }
    }
    //#endregion

    //#region PREVIEW IMAGE FUNCTION
    async Preview(event) {
        var base64 = await this.GetBase64(event.target.files[0]);
        this.setState({ base64: base64 });
    };

    GetBase64(file) {
        return new Promise(resolve => {
            var reader = new FileReader();
            reader.onload = function (event) {
                resolve(event.target.result);
            };
            reader.readAsDataURL(file);
        });
    };
    //#endregion

    //#region ADD
    async add() {
        if (this.state.promotionName == null || this.state.promotionName == "") {
            toast.error("Vui lòng nhập tên khuyến mãi");
        } else if (this.state.promotionValue == null || this.state.promotionValue == "") {
            toast.error('Vui lòng nhập giá trị khuyến mãi');
        } else if (this.state.base64 == null || this.state.base64 == "") {
            toast.error('Vui lòng chọn ảnh cho chương trình khuyến mãi');
        } else {
            let result = await PromotionApi.Insert({
                ten_km: this.state.promotionName,
                phan_tram_km: this.state.promotionValue,
                t_bat_dau: moment(this.state.date[0]).format("YYYY-MM-DD"),
                t_ket_thuc: moment(this.state.date[1]).format("YYYY-MM-DD"),
                url_hinh: this.state.base64.replace(/^data:image\/[a-z]+;base64,/, "")
            })
            if (result == null) {
                toast.error("Hệ thống lỗi. Vui lòng thử lại");
            } else {
                if (result.ResponseCode == 1) {
                    toast.warn(result.ResponseMessage);
                    return;
                }
                window.location.href = "/discount";
            }
        }
    }
    //#endregion

    //#region RENDER
    render() {
        return (
            <MDBContainer fluid>
                <Loading isShow={this.state.isShowLoading} />
                <Row className="form-group">
                    <label >Tên khuyến mãi *</label>
                    <input type="text"
                        value={this.state.promotionName}
                        onChange={(event) => { this.setState({ promotionName: event.target.value }) }}
                        className="form-control" />
                </Row>

                <Row className="form-group">
                    <label >Thời gian bắt đầu *</label>
                </Row>
                <Row className="form-group">
                    <DateRangePicker
                        onChange={(data) => { this.setState({ date: data }) }}
                        value={this.state.date}
                    />
                </Row>
                <Row className="form-group">
                    <label >Phần trăm khuyến mãi *</label>
                    <input
                        type="number"
                        value={this.state.promotionValue}
                        onChange={(event) => {
                            this.setState({
                                promotionValue: event.target.value
                            })
                        }}
                        className="form-control" />
                </Row>
                <Row className="form-group">
                    <Col>
                        <div className="file-field">
                            <div className="btn btn-primary float-left" style={{ position: "relative" }}>
                                <span>Chọn ảnh</span>
                                <input style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    margin: 0,
                                    padding: 0,
                                    width: "100%",
                                    height: "100%",
                                    cursor: "pointer",
                                    opacity: 0,
                                }}
                                    type="file"
                                    onChange={this.Preview.bind(this)}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <img src={this.state.base64} style={{ maxWidth: "100%" }} alt="preview" />
                    </Col>
                </Row>
                <Row className="form-group">
                    <MDBBtn block
                        onClick={() => { this.add() }}
                    >Thêm</MDBBtn>
                </Row>
            </MDBContainer >
        );
    }
    //#endregion
}
