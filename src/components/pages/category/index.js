import React, { Component } from 'react';
import {
    MDBModal,
    MDBModalBody,
    MDBModalFooter,
    MDBContainer,
    MDBBtn,
    toast,
    ToastContainer,
    MDBPagination,
    MDBPageItem,
    MDBPageNav,
    MDBCol,
    MDBRow
} from 'mdbreact';
import { NavLink } from 'react-router-dom';

import Loading from '../loading';


import * as CategoryApi from '../../../api/category';



export default class Category extends Component {
    //#region CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isShowLoading: false,
            isShowModalDelete: false,
            categoryId: 0,
            categories: []
        }
        this.init();
        // this.test1();
    }
    //#endregion

    //#region INIT 
    async init() {
        this.setState({ isShowLoading: true })
        let categories = await CategoryApi.FindAll();
        if (categories != null) {
            this.setState({ categories: categories });
        }
    }

    //#endregion

    //#region  MODAL FUNCTION
    toggleModalDelete(categoryId) {
        this.setState(previousState => ({
            categoryId: categoryId,
            isShowModalDelete: !previousState.isShowModalDelete
        }));
    }
    //#endregion

    //#region DELETE 
    async confirmDelete() {

        let result = CategoryApi.Delete(this.state.categoryId);
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
                <ToastContainer
                    hideProgressBar={true}
                    newestOnTop={true}
                    autoClose={5000}
                />
                <NavLink to="/add-category" activeClassName="activeClass">
                    <MDBBtn color="primary">Thêm mới</MDBBtn>
                </NavLink>
                <MDBRow>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tên danh mục</th>
                                <th scope="col">Hình ảnh</th>
                                <th scope="col">Xử lý</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.categories.map(element => {
                                    return (
                                        <tr key={element.id_danh_muc}>
                                            <th scope="row">{element.id_danh_muc}</th>
                                            <td>{element.ten_danh_muc}</td>
                                            <td>
                                                <img src={element.url_hinh} style={{ width: 200 }} />
                                            </td>
                                            <td>
                                                <NavLink
                                                    to={"/edit-category/" + element.id_danh_muc}
                                                    activeClassName="activeClass">
                                                    <MDBBtn color="success" size="sm">Sửa</MDBBtn>
                                                </NavLink>
                                                {/* <MDBBtn
                                                    onClick={() => { this.toggleModalDelete(element.id_danh_muc) }}
                                                    color="danger"
                                                    size="sm">Xóa</MDBBtn> */}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </MDBRow>

            </MDBContainer >
        );
    }
    //#endregion
}
