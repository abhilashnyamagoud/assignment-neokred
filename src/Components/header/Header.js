import React from "react";
import { Layout, Flex } from 'antd';
const { Header } = Layout;

const HeaderComponent=()=>{
    const headerStyle = {
        textAlign:'center' ,
        color: '#fff',
        height: 60,
        paddingInline: 24,
        lineHeight: '40px',
        backgroundColor: '#2e2d2c',
      
      };
      const layoutStyle = {
        borderRadius: 8,
        overflow: 'hidden',
        width: 'calc(100%)',
        maxWidth: 'calc(100%)',
        marginBottom: 10 ,
      };

    return(
        <Flex gap="middle" wrap="wrap">
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>Real-time Markdown Editor with Live Preview</Header>
    </Layout>


  
  </Flex>
    )
}

export  default HeaderComponent;