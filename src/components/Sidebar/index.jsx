import React from 'react';


import { Menu } from 'antd';
import { Link } from "react-router-dom";
import { MailOutlined, AppstoreOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: 'dark',
      current: 'wordList1',
    };

  }

  changeTheme = value => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });

  };


  render() {
    return  <>
      {/* <Switch
        checked={this.state.theme === 'dark'}
        onChange={this.changeTheme}
        checkedChildren="暗色主题"
        unCheckedChildren="亮色主题"
      /> */}

      <Menu
        theme={this.state.theme}
        onClick={this.handleClick}
        // style={{ width: 256 }}
        defaultOpenKeys={['userList']}
        selectedKeys={[this.state.current]}
        mode="inline"
      >
        {/* <Router><Link to="/article/list">文章列表</Link></Router> */}
        <SubMenu key="userList" icon={<UserOutlined />} title="学生管理">
          <Menu.Item key="websiteList"><Link to="/student/list/1">学生列表</Link></Menu.Item>
        </SubMenu>
      </Menu>

    </>
  }
}
