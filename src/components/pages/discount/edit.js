import React, { Component } from 'react'
import { MDBDataTable, MDBContainer, MDBBtn, Row, Col } from 'mdbreact';

import Loading from '../loading';

export default class EditDiscount extends Component {
    //#region CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isShowLoading: false,

            categoryId: "",
            productName: "",
            price: "",
            discountedPrice: "",
            quantity: "",
            description: "",
            avatar: "",
            isChageImage: false,
            listCategory: []
        }
        this.Preview = this.Preview.bind(this);


    }
    //#endregion

    //#region PREVIEW IMAGE FUNCTION
    async Preview(event) {

        var base64 = await this.GetBase64(event.target.files[0]);
        this.setState({
            base64: base64,
            isChageImage: true
        });
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

    //#region RENDER
    render() {
        return (
            <MDBContainer fluid>
                <Loading isShow={this.state.isShowLoading} />
                <Row className="form-group">
                    <label >Tên khuyến mãi *</label>
                    <input type="text" value={this.state.name} onChange={(text) => { this.setState({ productName: text }) }} className="form-control" />
                </Row>

                <Row className="form-group">
                    <Col style={{ paddingLeft: 0 }}>
                        <label >Thời gian bắt đầu *</label>
                        <input type="number" value={this.state.name} onChange={(text) => { this.setState({ price: text }) }} className="form-control" />
                    </Col>
                    <Col style={{ paddingRight: 0 }}>
                        <label >Thời gian kết thúc *</label>
                        <input type="number" value={this.state.name} onChange={(text) => { this.setState({ discountedPrice: text }) }} className="form-control" />
                    </Col>
                </Row>
                <Row className="form-group">
                    <label >Phần trăm khuyến mãi *</label>
                    <input type="number" value={this.state.name} onChange={(text) => { this.setState({ price: text }) }} className="form-control" />
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
                                    onChange={this.Preview}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <img src={this.state.avatarw} alt="preview" />
                    </Col>
                </Row>
                <Row className="form-group">
                    <MDBBtn block>Thêm</MDBBtn>
                </Row>
            </MDBContainer >
        );
    }
    //#endregion
}
