import React,{useEffect,useState} from "react";
import HeaderComponent from "./Components/header/Header";
import FooterComponent from "./Components/Footer/Footer";
import downloadHtml from "./Utils/Helpers/download";
import { FullscreenOutlined,FullscreenExitOutlined, CopyOutlined } from '@ant-design/icons';
import io from 'socket.io-client'
import axios from 'axios'
import { Input ,Layout,Row,Col,Tooltip,Divider,FloatButton } from 'antd';
const { TextArea } = Input;



const socket = io.connect('http://localhost:3001')

const App=()=>{
const [message,setMessage]=useState('')
const [datas,setDatas]=useState('')
const [fullScreen,setFullScreen]=useState(false)

  useEffect(()=>{
    socket.on("receive_message",(data)=>{
      setDatas(data)
    })
  },[])

    // this without Socket IO
  // useEffect(()=>{
  //   const data={
  //     message
  //   }
  //   axios.post('http://localhost:3001/send',data)
  //   .then((res)=>{
  //     console.log("RESPOPNSE",res.data)
  //     // setDatas(res.data)
  //   })
  //   .catch((err)=>{
  //     alert(err.message)
  //   })
  // },[message])

const sendMesg=(e)=>{ 
  setMessage(e.target.value)
  socket.emit("update",{message:e.target.value})
 }
 const fullScreenStyle={
  backgroundColor:'#2b2b2b',color:'#fff',minHeight:'90vh',maxHeight:'100%',borderRadius:'8px',padding:'10px',width: '100%'
 }

 const handleDownload = () => {
  downloadHtml(datas)
};
  return (
    <Layout>
    <Layout style={{backgroundColor:'whitesmoke',maxHeight:'100%',minHeight:'100vh'}}>
      <HeaderComponent />
      <Row>
        {
          !fullScreen && <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <Layout style={{width: 'calc(50%) -8px',backgroundColor:'#f3f2f2'}}>
         <TextArea placeholder="Enter Text In HTML Syntax" value={message} style={{minHeight:'90vh',maxHeight:'80vh' }} onChange={sendMesg} > </TextArea>
         </Layout>
         </Col>
        }
      <Col xl={fullScreen?24:12} lg={fullScreen?24:12} md={fullScreen?24:12} sm={24} xs={24}  >
        {
          !message.length==0 ? <Layout style={fullScreen?fullScreenStyle: {backgroundColor:'#2b2b2b',color:'#fff',minHeight:'90vh',maxHeight:'100%',borderRadius:'8px',padding:'10px',width: 'calc(50%-8px)'}}>
            <Row>
              {
                fullScreen ?<Tooltip title='Exit FullScreen'>
                  <FullscreenExitOutlined onClick={()=>setFullScreen(false)} style={{ fontSize: '24px', color: '#08c' }}/>
                </Tooltip>: <Tooltip title='FullScreen'>
                <FullscreenOutlined onClick={()=>setFullScreen(true)} style={{ fontSize: '24px', color: '#08c',marginRight:'16px' }} />
                </Tooltip>
              }
              <Tooltip title="Copy Clipboard">
              <CopyOutlined onClick={()=>navigator.clipboard.writeText(datas)} style={{ fontSize: '24px', color: '#08c' }}/>
              </Tooltip>
              
             </Row>
             <Divider plain style={{backgroundColor:'#fff'}}>HTML Converter</Divider>
             <div dangerouslySetInnerHTML={{__html:datas}}  >
          </div>
          <Tooltip title="Download HTML File">
          <FloatButton onClick={handleDownload} />
          </Tooltip>
          </Layout>:
          <Layout style={{textAlign:'center',color:'lightgray'}}>
            <h1>Write Text In HTML </h1>
          </Layout>
        }
      </Col>
      </Row>
      </Layout>
      <FooterComponent />
      </Layout>
  )
}

export default App