import React, { Component } from 'react'
import {
    MDBContainer,
    MDBBtn,
    Row,
    Col,
    toast,
    ToastContainer
} from 'mdbreact';
import { Editor } from '@tinymce/tinymce-react';
import * as CurrencyFormat from 'react-currency-format';
import imageDefault from "../../../assets/default.jpg"
import Loading from '../loading';

import * as CategoryApi from '../../../api/category';
import * as ProductApi from '../../../api/product';


export default class AddProduct extends Component {
    //#region CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isShowLoading: false,

            categoryId: "",
            productName: "",
            productPrice: "",
            productDiscountedPrice: "",
            productQuantity: "",
            productDescription: "",
            productAvatar: imageDefault,

            categories: []
        }
        this.init();
    }
    //#endregion

    //#region INIT
    async init() {
        let categories = await CategoryApi.FindAll();
        if (categories != null) {
            this.setState({ categories: categories });
        }
    }
    //#endregion

    //#region PREVIEW IMAGE FUNCTION
    async Preview(event) {
        var base64 = await this.GetBase64(event.target.files[0]);
        this.setState({ productAvatar: base64 });
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
        if (this.state.categoryId == null || this.state.categoryId == "") {
            toast.error("Vui lòng chọn danh mục sản phẩm");
        } else if (this.state.productName == null || this.state.productName == "") {
            toast.error('Vui lòng nhập tên sản phẩm này');
        } else if (this.state.productPrice == null || this.state.productPrice == "") {
            toast.error('Vui lòng nhập giá sản phẩm này');
        } else if (this.state.productQuantity == null || this.state.productQuantity == "") {
            toast.error('Vui lòng nhập số lượng sản phẩm này');
        } else if (this.state.productName == null || this.state.productName == "") {
            toast.error('Vui lòng nhập mô tả sản phẩm này');
        } else if (this.state.productAvatar == null || this.state.productAvatar == "") {
            toast.error('Vui lòng chọn ảnh đại diện sản phẩm này');
        } else {
            let result = await ProductApi.Insert({
                id_danh_muc: this.state.categoryId,
                ten_sp: this.state.productName,
                gia_sp: this.state.productPrice,
                gia_km: this.state.productDiscountedPrice,
                so_luong: this.state.productQuantity,
                mo_ta: this.state.productDescription,
                url_hinh_chinh: this.state.productAvatar.replace(/^data:image\/[a-z]+;base64,/, ""),
            })
            if (result == null) {
                toast.error("Hệ thống lỗi. Vui lòng thử lại");
            } else {
                if (result.ResponseCode == 1) {
                    toast.warn(result.ResponseMessage);
                    return;
                }
                window.location.href = "/product/1";
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
                    <label >Danh mục *</label>
                    <select className="browser-default custom-select"
                        onChange={(event) => {
                            this.setState({
                                categoryId: event.target.value
                            })
                        }}
                        value={this.state.categoryId}
                    >
                        <option value="">Danh mục</option>
                        {
                            this.state.categories.map(element => {
                                return (
                                    <option
                                        key={element.id_danh_muc}
                                        value={element.id_danh_muc}>{element.ten_danh_muc}</option>
                                )
                            })
                        }
                    </select>
                </Row>
                <Row className="form-group">
                    <label >Tên sản phẩm *</label>
                    <input

                        type="text"
                        value={this.state.productName}
                        onChange={(event) => {
                            this.setState({
                                productName: event.target.value
                            })
                        }}
                        className="form-control" />
                </Row>
                <Row className="form-group">
                    <Col style={{ paddingLeft: 0 }}>
                        <label >Giá sản phẩm *</label>
                        <CurrencyFormat
                            className="form-control"
                            value={this.state.productPrice}
                            thousandSeparator={true}
                            prefix={''}
                            onValueChange={(values) => {
                                const { formattedValue, value } = values;
                                // formattedValue = $2,223
                                // value ie, 2223                             
                                this.setState({ productPrice: value })
                            }} />
                    </Col>
                    <Col style={{ paddingRight: 0 }}>
                        <label >Giá khuyến mãi sản phẩm (bỏ trống nếu không khuyến mãi)</label>
                        <CurrencyFormat
                            className="form-control"
                            value={this.state.productDiscountedPrice}
                            thousandSeparator={true}
                            prefix={''}
                            onValueChange={(values) => {
                                const { formattedValue, value } = values;
                                // formattedValue = $2,223
                                // value ie, 2223                             
                                this.setState({ productDiscountedPrice: value })
                            }} />
                    </Col>
                </Row>
                <Row className="form-group">
                    <label >Số lượng *</label>
                    <CurrencyFormat
                        className="form-control"
                        value={this.state.productQuantity}
                        thousandSeparator={true}
                        prefix={''}
                        onValueChange={(values) => {
                            const { formattedValue, value } = values;
                            // formattedValue = $2,223
                            // value ie, 2223                             
                            this.setState({ productQuantity: value })
                        }} />
                </Row>
                <Row className="form-group">
                    <label >Mô tả sản phẩm *</label>
                </Row>
                <Row>
                    <Editor
                        initialValue={this.state.productDescription}
                        init={{
                            plugins: 'link image code',
                            toolbar: "code insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons",
                            height: 500,
                            width: "100%",
                            branding: false,
                            menubar: false,
                        }}
                        onChange={(e) => {
                            this.setState({

                                productDescription: e.target.getContent()
                            })
                        }}
                    />
                </Row>
                <Row className="form-group" style={{ marginTop: 10 }} >
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
                        <img src={this.state.productAvatar} style={{ maxWidth: "100%" }} alt="preview" />
                    </Col>
                </Row>
                <Row className="form-group" style={{ marginTop: 10 }}>
                    <MDBBtn block
                        onClick={() => this.add()}
                    >Thêm</MDBBtn>
                </Row>
            </MDBContainer >
        );
    }
    //#endregion
}
