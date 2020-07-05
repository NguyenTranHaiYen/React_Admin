import React, { Component } from 'react'
import {
    MDBContainer,
    MDBBtn,
    Row,
    Col,
    toast
} from 'mdbreact';
import { Editor } from '@tinymce/tinymce-react';
import * as ProductApi from '../../../api/product';
import * as CategoryApi from '../../../api/category';
import Loading from '../loading';
import * as CurrencyFormat from 'react-currency-format';

export default class EditProduct extends Component {
    //#region CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isShowLoading: false,

            categoryId: "",
            productId: 0,
            productName: "",
            productPrice: "",
            productDiscountedPrice: "",
            productQuantity: "",
            productDescription: "",
            productAvatar: "",
            isChangeImage: false,

            categories: []
        }
        this.init();

    }
    //#endregion

    //#region 
    async init() {
        let id = this.props.match.params.id;
        let product = await ProductApi.GetById(id);

        let categories = await CategoryApi.FindAll();
        if (product != null) {
            this.setState({
                categoryId: product.id_danh_muc,
                productId: product.id_san_pham,
                productName: product.ten_sp,
                productPrice: product.gia_sp,
                productDiscountedPrice: product.gia_km,
                productQuantity: product.so_luong,
                productDescription: product.mo_ta,
                productAvatar: product.url_hinh_chinh,
                categories: categories
            })
        }
    }
    //#endregion

    //#region PREVIEW IMAGE FUNCTION
    async Preview(event) {
        var base64 = await this.GetBase64(event.target.files[0]);
        this.setState({
            productAvatar: base64,
            isChangeImage: true
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

    //#region EDIT
    async edit() {
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
            let base46 = "";
            if (this.state.isChangeImage)
                base46 = this.state.productAvatar;
            let result = await ProductApi.Update({
                id_san_pham: this.state.productId,
                id_danh_muc: this.state.categoryId,
                ten_sp: this.state.productName,
                gia_sp: this.state.productPrice,
                gia_km: this.state.productDiscountedPrice,
                so_luong: this.state.productQuantity,
                mo_ta: this.state.productDescription,
                url_hinh_chinh: base46
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
                {/* <Loading isShow={this.state.isShowLoading} /> */}
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
                                    <option key={element.id_danh_muc} value={element.id_danh_muc}>{element.ten_danh_muc}</option>
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
                            plugins: 'link image code table',
                            menubar: "table",
                            toolbar: "code insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons | table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
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
                <Row className="form-group" style={{ marginTop: 20 }}>
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
                        <img src={this.state.productAvatar} alt="preview" style={{ maxWidth: "100%" }} />
                    </Col>
                </Row>
                <Row className="form-group">
                    <MDBBtn block
                        onClick={() => this.edit()}
                    >Sửa</MDBBtn>
                </Row>
            </MDBContainer >
        );
    }
    //#endregion
}
