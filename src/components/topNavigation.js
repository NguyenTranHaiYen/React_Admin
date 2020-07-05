import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, ToastContainer } from 'mdbreact';
import Login from '../components/pages/login/login'
import { BrowserRouter as Router } from 'react-router-dom';
import text from "../assets/store_1588129197_154.jpg";
import ReactDOM from 'react-dom';
class TopNavigation extends Component {
    state = {
        collapse: false
    }

    onClick = () => {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    logout() {
        localStorage.clear();
        ReactDOM.render(<Router><Login /></Router>, document.getElementById('root'));
    }

    render() {
        return (
            <MDBNavbar className="flexible-navbar" light expand="md" scrolling>
                <MDBNavbarBrand href="/">
                <img className="img-fluid img__logo" src={text} />
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.onClick} />
                <MDBCollapse isOpen={this.state.collapse} navbar>
                    <MDBNavbarNav right>

                        <MDBNavItem>
                            <a className="border border-light rounded mr-1 nav-link Ripple-parent button__top">Admin</a>
                        </MDBNavItem>
                        <MDBNavItem>
                            <a className="border border-light rounded mr-1 nav-link Ripple-parent button__top" onClick={() => this.logout()} >Đăng xuất</a>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
                <ToastContainer
                    hideProgressBar={true}
                    newestOnTop={true}
                    autoClose={5000}
                />
            </MDBNavbar>
        );
    }
}

export default TopNavigation;