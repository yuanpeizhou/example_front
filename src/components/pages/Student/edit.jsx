import React from "react";
import {Input  , Button ,Form , Select , message} from 'antd';
// import { FormInstance } from 'antd/lib/form';
import BreadcrumbComponent from '../../Breadcrumb/index'
import {getStudentInfo , studentInsert, studentUpdate} from '../../../api';

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 8 },
};

export default class StudentEdit extends React.Component {
  formRef = React.createRef();
  
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      tel: '',
      age: '',
      sex: '',
      path: ''
    };

  }
  componentDidMount(){
    if(this.props.match.path !== '/student/insert'){
      this.loadData()
    }
  }
  /*加载数据*/
  loadData(isInit = true){
    const _this = this 
    const params = {
      id : _this.props.match.params.id,
    }

    getStudentInfo(params,function(res){
        _this.formRef.current.setFieldsValue({
          username: res.username,
          tel: res.tel,
          age: res.age,
          sex: res.sex_origin ? res.sex_origin.toString() : '',
        })
    })
  }
  onFinish = (values) => {
    const _this = this

    if(this.props.match.path != '/student/insert'){
      values.id = _this.props.match.params.id
      studentUpdate(values,function(res){
        if(res.code == 200){
          message.success(res.msg);
          _this.props.history.go(-1)
        }else if(res.code == 201){
          message.warning(res.msg);
        }else if (res.code == 202){
          message.error(res.msg);
        }
      })
    }else{
      studentInsert(values,function(res){
        if(res.code == 200){
          message.success(res.msg);
          _this.props.history.go(-1)
        }else if(res.code == 201){
          message.warning(res.msg);
        }else if (res.code == 202){
          message.error(res.msg);
        }
      })
    }
  

  }
  onFinishFailed = (errorInfo: any) => {
    // console.log('Failed:', errorInfo);
  }
  render() {
    return (
      <>
      {
        this.state.path !== 'student/insert' && <BreadcrumbComponent path="学生管理/编辑学生"/>
      }

      {
        this.state.path === 'student/insert' && <BreadcrumbComponent path="学生管理/新增学生"/>
      }

      <div style={{margin : "30px"}}>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish.bind(this)}
          onFinishFailed={this.onFinishFailed.bind(this)}
          ref={this.formRef}
        >
          <Form.Item
            label="姓名"
            name="username"
            rules={[{ required: true, message: '请填写学生姓名' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="电话"
            name="tel"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="年龄"
            name="age"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="性别"
            name="sex"
          >
            <Select>
              <Option value="1">男</Option>
              <Option value="2">女</Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>

      </>
    );
  }
};

