import React, { Component } from 'react';
import { MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBContainer, MDBBtn } from 'mdbreact';
import { NavLink } from 'react-router-dom';

import * as UserApi from '../../../api/user';
import Loading from '../loading';

export default class User extends Component {
    //#region CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            user: {},
            isShowModalDetail: false,
            isShowLoading: false
        }
        this.toggleModalDetail = this.toggleModalDetail.bind(this);

        this.init();
    }
    //#endregion

    //#region 
    async init() {
        let users = await UserApi.FindAll();
        if (users != null) {
            this.setState({
                users: users.danhSach,
                user: {},
            })
        }
        console.log(users);

    }
    //#endregion

    //#region MODAL FUNCTION
    async toggleModalDetail(id) {
        let user = {};
        if (!this.state.isShowModalDetail) {
            user = await UserApi.GetById(id);
        }

        console.log(user);

        this.setState(previousState => ({
            user: user,
            isShowModalDetail: !previousState.isShowModalDetail
        }));
    }
    //#endregion

    //#region  RENDER
    render() {
        return (
            <MDBContainer fluid>
                <Loading isShow={this.state.isShowLoading} />
                <MDBContainer>
                    <MDBModal isOpen={this.state.isShowModalDetail} toggle={() => this.toggleModalDetail()} fullHeight position="right">
                        <MDBModalHeader toggle={() => this.toggleModalDetail()}>{this.state.user.ten_nguoi_dung}</MDBModalHeader>
                        <MDBModalBody>
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td>Email</td>
                                        <td>{this.state.user.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Giới tính</td>
                                        <td>{this.state.user.gioi_tinh}</td>
                                    </tr>
                                    <tr>
                                        <td>Ngày sinh</td>
                                        <td>{this.state.user.ngay_sinh}</td>
                                    </tr>
                                    <tr>
                                        <td>Số điện thoại</td>
                                        <td>{this.state.user.so_dt}</td>
                                    </tr>
                                    <tr>
                                        <td>Ngày đăng ký</td>
                                        <td>{this.state.user.t_dang_ky}</td>
                                    </tr>
                                    <tr>
                                        <td>Địa chỉ</td>
                                        <td>{this.state.user.t_dang_ky}</td>
                                    </tr>
                                    <tr>
                                        <td>Ảnh đại diện</td>
                                        <td>
                                            <img src={this.state.user.url_hinh} width="100%" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={() => this.toggleModalDetail()}>Đóng</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên khách hàng</th>
                            <th scope="col">Giới tính</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Email</th>
                            <th scope="col">Ngày đăng ký</th>
                            <th scope="col">Xử lý</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map(element => {
                                return (
                                    <tr key={element.id_khach_hang}>
                                        <th scope="row">{element.id_khach_hang}</th>
                                        <td>{element.ten_nguoi_dung}</td>
                                        <td>{element.gioi_tinh}</td>
                                        <td>{element.so_dt}</td>
                                        <td>{element.email}</td>
                                        <td>{element.t_dang_ky}</td>
                                        <td>
                                            <MDBBtn
                                                color="info"
                                                size="sm"
                                                onClick={() => this.toggleModalDetail(element.id_khach_hang)} >Chi tiết</MDBBtn>
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
