import React, { Component } from 'react';
import {
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter,
    MDBContainer,
    MDBBtn,
    toast
} from 'mdbreact';

import Loading from '../loading';
import * as ImageProductApi from '../../../api/image-product';

export default class ImageProduct extends Component {
    //#region  CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isShowLoading: false,
            isShowModalDelete: false,

            productId: 0,
            images: [],
            imageProductId: 0,

            base64: ""
        }
    }
    //#endregion

    //#region INIT 
    async init() {
        let id = this.props.match.params.id;

        let imageProduct = await ImageProductApi.GetByProduct(id);
        if (imageProduct != null) {
            this.setState({
                productId: id,
                images: imageProduct
            })
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

    //#region  MODAL FUNCTION
    toggleModalDelete(imageProductId) {
        this.setState(previousState => ({
            imageProductId: imageProductId,
            isShowModalDelete: !previousState.isShowModalDelete
        }));
    }
    //#endregion

    //#region DELETE 
    async confirmDelete() {

        let result = ImageProductApi.Delete(this.state.imageProductId);
        if (result == null) {
            toast.error("Hệ thống lỗi. Vui lòng thử lại");
            return;
        }

        if (result.ResponseCode == 1) {
            toast.warn(result.ResponseMessage);
            return;
        }
        this.init();
        this.setState(previousState => ({
            isShowModalDelete: !previousState.isShowModalDelete
        }));
    }
    //#endregion

    //#region UPLOAD
    async upload() {
        if (this.state.base64 == null || this.state.base64 == "") {
            toast.error("Vui lòng chọn ảnh.");
        } else {
            let result = await ImageProductApi.Insert({
                id_sp: this.state.productId,
                url_hinh: this.state.base64
            })
            if (result == null) {
                toast.error("Hệ thống lỗi. Vui lòng thử lại");
            } else {
                if (result.ResponseCode == 1) {
                    toast.warn(result.ResponseMessage);
                    return;
                }
                window.location.reload();
            }
        }
    }
    //#endregion

    //#region RENDER
    render() {
        return (
            <MDBContainer fluid>
                <Loading isShow={this.state.isShowLoading} />
                <MDBContainer>
                    <MDBModal isOpen={this.state.isShowModalDelete} toggle={() => this.toggleModalDelete()}>
                        <MDBModalBody>
                            Bạn có chắc muốn xóa
                            </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={() => { this.confirmDelete() }}>Xóa</MDBBtn>
                            <MDBBtn color="danger" onClick={() => this.toggleModalDelete()}>Đóng</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>


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
                <MDBBtn
                    color="primary"
                    onClick={() => this.upload()}
                >Tải lên</MDBBtn>
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Xử lý</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.images.map(element => {
                                return (
                                    <tr key={element.id_hinh}>
                                        <th scope="row">{element.id_hinh}</th>
                                        <td>
                                            <img src={element.url_hinh} alt={"image_product_" + element.id_hinh} />
                                        </td>
                                        <td>
                                            <MDBBtn
                                                onClick={() => this.toggleModalDelete(element.id_hinh)}
                                                color="danger" size="sm">Xóa</MDBBtn>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </MDBContainer >
        );
    }
    //#endregion
}
