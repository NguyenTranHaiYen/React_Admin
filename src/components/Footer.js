import React from 'react';
import { MDBFooter, MDBBtn, MDBIcon } from 'mdbreact';

const Footer = () => {
    return (
        <MDBFooter color="blue" className="text-center font-small darken-2" style={{ position: "fixed", bottom: 0, width:"-webkit-fill-available"}}>
            <p className="footer-copyright mb-0 py-3 text-center footer__content">
                &copy; {new Date().getFullYear()} Copyright: Shop Bán Hàng Online  
            </p>
        </MDBFooter>
    );
}

export default Footer;