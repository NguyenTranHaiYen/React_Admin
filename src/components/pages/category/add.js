import React, { Component } from 'react'
import {
    MDBDataTable,
    MDBContainer,
    MDBBtn,
    Row,
    Col,
    ToastContainer,
    toast
} from 'mdbreact';
import imageDefault from "../../../assets/default.jpg"
import * as CategoryApi from '../../../api/category';
import Loading from '../loading';

export default class AddCategory extends Component {
    
    //#region CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isShowLoading: false,
            name: "",
            base64: imageDefault
        }
        this.Preview = this.Preview.bind(this);
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
        if (this.state.name == null || this.state.name == "") {
            toast.error("Vui lòng nhập tên danh mục");
        } else if (this.state.base64 == null || this.state.base64 == "") {
            toast.error('Vui lòng chọn ảnh cho danh mục này');
        } else {
            let result = await CategoryApi.Insert({
                url_hinh: this.state.base64.replace(/^data:image\/[a-z]+;base64,/, ""),
                ten_danh_muc: this.state.name
            })
            if (result == null) {
                toast.error("Hệ thống lỗi. Vui lòng thử lại");
            } else {
                if (result.ResponseCode == 1) {
                    toast.warn(result.ResponseMessage);
                    return;
                }
                window.location.href = "/category";
            }
        }
    }
    //#endregion

    //#region RENDER
    render() {
        return (
            <MDBContainer fluid>
                <Loading isShow={this.state.isShowLoading} />
                <Row>
                    <label >Tên danh mục</label>
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={(event) => {
                            this.setState({ name: event.target.value });
                        }}
                        className="form-control" />
                </Row>
                <Row>
                    <label >Tên danh mục</label>
                </Row>
                <Row>
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
                <Row style={{ marginTop: 10 }}>
                    <MDBBtn block
                        onClick={() => { this.add() }}
                    >Thêm</MDBBtn>
                </Row>
                <ToastContainer
                    hideProgressBar={true}
                    newestOnTop={true}
                    autoClose={5000}
                />
            </MDBContainer >
        );
    }
    //#endregion
}
