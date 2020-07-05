import React from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBModalFooter,
    MDBIcon,
    MDBCardHeader,
    MDBBtn,
    MDBInput,
    ToastContainer,
    toast
} from "mdbreact";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import * as AdminApi from '../../../api/admin';
import App from '../../../App';
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    async login() {
        if (this.state.email == "") {
            toast.error('Vui lòng nhập địa chỉ email');
        } else if (this.state.password == "") {
            toast.error('Vui lòng nhập mật khẩu');
        } else {
            let token = await AdminApi.Login(this.state.email, this.state.password);
            
            if (token != null) {
                localStorage.setItem("token", token);
                ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
            }
        }
    }

    render() {
        return (
            <MDBContainer>
                <ToastContainer
                    hideProgressBar={true}
                    newestOnTop={true}
                    autoClose={5000}
                />
                <MDBRow center style={{ marginTop: "10%", }}>
                    <MDBCol md="8" >
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardHeader className="form-header deep-blue-gradient rounded text__login text-white">
                                    <h3 className="my-3">
                                        <MDBIcon icon="lock" /> Đăng Nhập
                </h3>
                                </MDBCardHeader>
                                <div className="grey-text ">
                                    <MDBInput className="input__login"
                                        label="Nhập email"
                                        icon="envelope"
                                        group
                                        type="email"
                                        validate
                                        error="wrong"
                                        success="right"
                                        onChange={(event) => {
                                            this.setState({ email: event.target.value })
                                        }}
                                    />
                                    <MDBInput className="input__login"
                                        label="Nhập mật khẩu"
                                        icon="lock"
                                        group
                                        type="password"
                                        validate
                                        onChange={(event) => {
                                            this.setState({ password: event.target.value })
                                        }}
                                    />
                                </div>

                                <div className="text-center mt-4">
                                    <MDBBtn
                                        color="light-blue"
                                        className="mb-3 text__login"
                                        type="submit"
                                        onClick={() => { this.login() }}
                                    >
                                        Login
                </MDBBtn>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer >
        );
    }
};