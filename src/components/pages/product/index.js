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
    MDBRow,
    MDBNavLink
} from 'mdbreact';
import { NavLink } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';

import Loading from '../loading';



import * as ProductAPI from '../../../api/product';
import numeral from 'numeral';
export default class ImageProduct extends Component {
    //#region  CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isShowLoading: false,
            isShowModalDelete: false,

            totalPage: 0,
            productId: 0,
            products: []
        }
    }
    //#endregion

    //#region 
    async _init(page) {
        let result = await ProductAPI.FindAll(page);
        if (result != null) {
            this.setState({
                products: result.ltam,
                totalPage: Math.ceil(result.count / 10)
            })
        }
    }
    //#endregion

    //#region 
    componentDidMount() {
        let page = this.props.match.params.page;
        page = page == undefined ? 1 : page;
        this._init(page);
    }
    componentDidUpdate() {
        let page = this.props.match.params.page;
        page = page == undefined ? 1 : page;
        this._init(page);
    }
    //#endregion

    //#region  MODAL FUNCTION
    toggleModalDelete(productId) {
        this.setState(previousState => ({
            productId: productId,
            isShowModalDelete: !previousState.isShowModalDelete
        }));
    }
    //#endregion

    //#region DELETE 
    async confirmDelete() {

        let result = ProductAPI.Delete(this.state.productId);
        if (result == null) {
            toast.error("Hệ thống lỗi. Vui lòng thử lại");
            return;
        }

        if (result.ResponseCode == 1) {
            toast.warn(result.ResponseMessage);
            return;
        }
        this._init();
        this.setState(previousState => ({
            isShowModalDelete: !previousState.isShowModalDelete
        }));
    }
    //#endregion

    //#region PAGNING FUNCTION
    createPaging() {
        var result = [];
        for (let i = 1; i <= this.state.totalPage; i++) {
            result.push(
                <MDBPageNav href={"/product/" + i} >
                    <span aria-hidden="true">{i}</span>
                </MDBPageNav >
            )
        }
        return result;
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

                <NavLink to="/add-product" activeClassName="activeClass">
                    <MDBBtn color="primary">Thêm mới</MDBBtn>
                </NavLink>
                <MDBRow>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Danh mục</th>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Giá khuyến mãi</th>
                                <th scope="col">Phần Trăm Khuyến Mãi</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Xử lý</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.products.map(element => {
                                    return (
                                        <tr key={element.id_san_pham}>
                                            <th scope="row">{element.id_san_pham}</th>
                                            <td>100.000</td>
                                            <td>{element.ten_sp}</td>
                                            <td>{numeral(element.gia_sp).format('0,0')}</td>
                                            <td>{numeral(element.gia_km).format('0,0')}</td>
                                            <td>{numeral(((element.gia_sp - element.gia_km)/element.gia_sp)*100).format('0,0')}%</td>
                                            <td>{numeral(element.so_luong).format('0,0')}</td>
                                            <td>
                                                <NavLink
                                                    style={{ display: "block" }}
                                                    to={"/edit-product/" + element.id_san_pham}
                                                    activeClassName="activeClass">
                                                    <MDBBtn color="success" size="sm">Sửa</MDBBtn>
                                                </NavLink>
                                                <MDBBtn
                                                    onClick={() => this.toggleModalDelete(element.id_san_pham)}
                                                    color="danger" size="sm">Xóa</MDBBtn>
                                                {/* <NavLink
                                                    to={"/image-product/" + element.id_san_pham}
                                                    activeClassName="activeClass">
                                                    <MDBBtn color="secondary" size="sm">Hình ảnh</MDBBtn>
                                                </NavLink> */}
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </MDBRow>
                <MDBRow center>
                    <MDBCol center>
                        <MDBPagination className="mb-5">
                            {this.createPaging()}
                        </MDBPagination>
                    </MDBCol>
                </MDBRow>
            </MDBContainer >
        );
    }
    //#endregion
}
