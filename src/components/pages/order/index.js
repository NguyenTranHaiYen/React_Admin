import React, { Component } from 'react';
import { MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBContainer, MDBBtn, toast } from 'mdbreact';
import numeral from 'numeral';

import * as OrderApi from '../../..//api/order';
import * as StatusOrderApi from '../../../api/status-order';
import Loading from '../loading';

export default class Order extends Component {
    //#region CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isShowLoading: false,

            orders: [],
            order: {
                danhSachHang: []
            },
            isShowModalDetail: false,

            statuses: []
        }
        this.toggleModalDetail = this.toggleModalDetail.bind(this);

        this.init();



    }
    //#endregion

    //#region 
    async init() {
        let orders = await OrderApi.FindAll(1);
        let statuses = await StatusOrderApi.FindAll();
        if (orders != null) {
            this.setState({
                orders: orders,
                statuses: statuses
            })
        }

    }
    //#endregion

    //#region MODAL FUNCTION
    async toggleModalDetail(id) {
        let order = {
            danhSachHang: []
        }
        if (!this.state.isShowModalDetail) {
            order = await OrderApi.GetById(id);
        }
        this.setState(previousState => ({
            order: order,
            isShowModalDetail: !previousState.isShowModalDetail
        }));
    }
    //#endregion

    //#region CHANGE STATUS
    async changeStatus(idDonHang, status) {
        let result = await OrderApi.ChangeStatus(idDonHang, status);
        toast.success("Đã chuyển trạng thái");
        this.init();
    }
    //#endregion

    //#region  RENDER
    render() {
        var total = 0;
        return (
            <MDBContainer fluid>
                <Loading isShow={this.state.isShowLoading} />
                <MDBContainer>
                    <MDBModal
                        isOpen={this.state.isShowModalDetail}
                        toggle={() => this.toggleModalDetail(0)}
                        fullHeight
                        position="bottom">
                        <MDBModalHeader toggle={() => this.toggleModalDetail(0)}>Đơn hàng: {this.state.order.idDonDatHang}</MDBModalHeader>
                        <MDBModalBody>
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td>Tên người nhận</td>
                                        <td>{this.state.order.tenNguoiNhan}</td>
                                    </tr>
                                    <tr>
                                        <td>Số điện thoại</td>
                                        <td>{this.state.order.soDT}</td>
                                    </tr>
                                    <tr>
                                        <td>Ngày đặt</td>
                                        <td>{this.state.order.ngayLap}</td>
                                    </tr>
                                    <tr>
                                        <td>Địa chỉ nhận</td>
                                        <td>{this.state.order.diaChi}</td>
                                    </tr>
                                    <tr>
                                        <td>Tình trạng đơn hàng</td>
                                        <td>{this.state.order.trangThai}</td>
                                    </tr>
                                    <tr>
                                        <td>Chi tiết</td>
                                        <td>
                                            <table className="table table-borderless">
                                                <thead>
                                                    <tr>
                                                        <th>Tên hàng</th>
                                                        <th>Số lượng</th>
                                                        <th>Giá</th>
                                                        <th>Thành tiền</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.order.danhSachHang.map((element) => {
                                                            total += element.tongGia;
                                                            return (
                                                                <tr>
                                                                    <td>{element.sanPham.ten_sp}</td>
                                                                    <td>{numeral(element.soLuong).format('0,0')}</td>
                                                                    <td>{numeral(element.giaKM).format('0,0')}</td>
                                                                    <td>{numeral(element.tongGia).format('0,0')}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    <tr>
                                                        <td colSpan={3}><strong>Tổng tiền</strong></td>
                                                        <td>{numeral(total).format('0,0')}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={() => this.toggleModalDetail(0)}>Đóng</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên khách hàng</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Ngày đặt</th>
                            <th scope="col">Tổng tiền</th>
                            <th scope="col">Tình trạng đơn hàng</th>
                            <th scope="col">Xử lý</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.orders.map(element => {
                                return (
                                    <tr key={element.idDonHang}>
                                        <td scope="row">{element.idDonHang}</td>
                                        <td>{element.tenKhachHang}</td>
                                        <td>{element.soDT}</td>
                                        <td>{element.ngayLap}</td>
                                        <td>{numeral(element.tongTien).format('0,0')}</td>
                                        <td>
                                            <select
                                                className="form-control"
                                                value={element.idTinhTrang}
                                                onChange={(event) => {
                                                    this.changeStatus(element.idDonHang, event.target.value);
                                                }}
                                            >
                                                {
                                                    this.state.statuses.map(element => {
                                                        return (
                                                            <option
                                                                key={element.id_tinh_trang}
                                                                value={element.id_tinh_trang}>{element.tinh_trang_don_hang}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </td>
                                        <td>
                                            <MDBBtn
                                                color="info"
                                                size="sm"
                                                onClick={() => this.toggleModalDetail(element.idDonHang)} >Chi tiết</MDBBtn>
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
