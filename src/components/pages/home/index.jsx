import React from "react";

import { Layout } from 'antd';
import Sidebar from '../../Sidebar/index';
import Router from '../../../router';
import 'antd/dist/antd.css';


const {Content,Sider } = Layout;

class Home extends React.Component {
  state = {
    collapsed: false,
    sider: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  componentDidMount(){
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Sidebar/>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <Router /> 
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </Layout>
      </Layout>
    );
  }
};

export default Home;