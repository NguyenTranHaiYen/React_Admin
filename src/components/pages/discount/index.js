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
import { NavLink } from 'react-router-dom';

import * as PromotionApi from '../../../api/promotion';

import Loading from '../loading';

export default class Discount extends Component {
    //#region  CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            discountId: 0,
            isShowLoading: false,
            promotions: [],
            isShowModalDelete: false
        }
        this.init();
    }
    //#endregion

    //#region 
    async init() {
        let promotions = await PromotionApi.FindAll();
        if (promotions != null) {
            this.setState({
                promotions: promotions
            })
        }
    }
    //#endregion

    //#region  MODAL FUNCTION
    toggleModalDelete(id) {
        this.setState(previousState => ({
            discountId: id,
            isShowModalDelete: !previousState.isShowModalDelete
        }));
    }
    //#endregion

    //#region DELETE 
    async confirmDelete() {
        let result = PromotionApi.Delete(this.state.discountId);
        if (result == null) {
            toast.error("Hệ thống lỗi. Vui lòng thử lại");
            return;
        }

        this.init();
        this.setState(previousState => ({
            isShowModalDelete: !previousState.isShowModalDelete
        }));
    }
    //#endregion

    //#region RENDER
    render() {
        return (
            <MDBContainer fluid>
                <Loading isShow={this.state.isShowLoading} />
                <MDBContainer>
                    <MDBModal isOpen={this.state.isShowModalDelete} toggle={() => this.toggleModalDelete(0)}>
                        <MDBModalBody>
                            Bạn có chắc muốn xóa
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={() => { this.confirmDelete() }}>Xóa</MDBBtn>
                            <MDBBtn color="danger" onClick={() => this.toggleModalDelete(0)}>Đóng</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>

                <NavLink to="/add-discount" activeClassName="activeClass">
                    <MDBBtn color="primary">Thêm mới</MDBBtn>
                </NavLink>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên khuyến mãi</th>
                            <th scope="col">Phần trăm khuyến mãi</th>
                            <th scope="col">Thời gian bắt đầu</th>
                            <th scope="col">Thời gian kết thúc</th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Xử lý</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.promotions.map(element => {
                                return (
                                    <tr key={element.id_khuyen_mai}>
                                        <th scope="row">{element.id_khuyen_mai}</th>
                                        <td>{element.ten_km}</td>
                                        <td>{element.phan_tram_km}%</td>
                                        <td>{element.t_bat_dau}</td>
                                        <td>{element.t_ket_thuc}</td>
                                        <td>
                                            <img src={element.url_hinh} style={{ maxWidth: 500 }} />
                                        </td>
                                        <td>
                                            {/* <NavLink to={"/edit-discount/" + element.id_khuyen_mai}
                                                activeClassName="activeClass">
                                                <MDBBtn color="success" size="sm">Sửa</MDBBtn>
                                            </NavLink> */}
                                            <MDBBtn
                                                onClick={() => this.toggleModalDelete(element.id_khuyen_mai)}
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
