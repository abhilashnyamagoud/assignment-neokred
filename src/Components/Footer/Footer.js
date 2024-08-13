import React from "react";

import { Layout } from 'antd';
const {Footer } = Layout;

const FooterComponent =()=>{

    return(
        <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Real Time Markdown Editor  ©{new Date().getFullYear()} Created by Abhilash N
      </Footer>
    )
}

export default FooterComponent