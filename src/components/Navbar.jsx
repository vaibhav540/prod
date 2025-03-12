import React from 'react';
import { Image, Layout } from 'antd';
import AtgLogo from "../assets/logo/AtgeirLogo.svg";
const { Header } = Layout;

const Navbar = () => {
    return (
        <Header >
            {/* <div className="logo">
                <Image
                    style={{ position: "fixed", top: "0px", left: "20px", height: "12%", width: "12%" }}
                    src={AtgLogo}
                />
            </div> */}
        </Header>
    );
};

export default Navbar;
