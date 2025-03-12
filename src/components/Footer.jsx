import { Image } from 'antd';
import React from 'react';
import gemini from "../assets/logo/gemini.svg";
import google from "../assets/logo/google.png";
import { Layout } from 'antd';

const { Footer } = Layout
const AppFooter = () => {
  return (
    <Footer className="footer">
    <p
      className="font-sm d-flex align-items-center justify-content-center"
      style={{
        position: "fixed",
        bottom: "0px",
        left: "55%",
        transform: "translateX(-50%)", 
        color: "#9458cf",
        width: "100%", 
      }}
    >
      Powered by
      <Image
        src={google}
        style={{ width: "90px" }}
        preview={false}
        className="p-0 m-0"
      />
    </p>
  
  </Footer>
  
  )
}

export default AppFooter