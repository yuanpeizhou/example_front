import React from 'react';
import { Breadcrumb } from 'antd';

export default class BreadcrumbComponent extends React.Component {
  constructor(props) {
		super(props);
    var lists = []

    if(props.path){
      lists = props.path.split('/')
    }
    this.state = {
      lists : lists,
      test : '123'
    }
  }

  render() {
    return  <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        {this.state.lists.map( (item,index) => {
          return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
        })}
      </Breadcrumb>
    </>
  }
}
