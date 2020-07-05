import React from 'react';
import logo from "../assets/nbc_logo1.jpg";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

const TopNavigation = () => {
    return (
        <div className="sidebar-fixed position-fixed">
            <a href="#!" className="logo-wrapper waves-effect">
                <img alt="MDB React Logo" className="img-fluid p-0" src={logo} />
            </a>
            <MDBListGroup className="list-group-flush">
                <NavLink exact={true} to="/" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="chart-pie" className="mr-3" />
                        Danh mục
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/product/1" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="user" className="mr-3" />
                        Sản phẩm
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/discount" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="user" className="mr-3" />
                        Khuyến mãi
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/order" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="table" className="mr-3" />
                        Đặt hàng
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/user" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="map" className="mr-3" />
                        Khách hàng
                    </MDBListGroupItem>
                </NavLink>
            </MDBListGroup>
        </div>
    );
}

export default TopNavigation;