import React from "react";
import { Table, Input , Row , Button , Form , Popconfirm , message} from 'antd';
import BreadcrumbComponent from '../../Breadcrumb/index'

import {getStudentList, studentDelete} from '../../../api';
import { withRouter } from "react-router";


class StudentList extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      paginationProps: {
        position: ['none', 'bottomRight'],
        showSizeChanger: false,
        showQuickJumper: false,
        showTotal: () => `共0条`,
        pageSize: 10,
        current: this.props.match.params.page ? this.props.match.params.page : 1,
        total: 0,
        onChange: (current) => this.changePage(current),
      },
      searchData: {
        keyword : '',
      },
      searchLocalStorageKey: 'book_list_search_data',
    };

    this.columns = [
      {
        title: 'id',
        dataIndex: 'key',
        width: 80,
        align:'center',
      },
      {
        title: '学生姓名',
        dataIndex: 'username',
        width: 150,
        align:'center',
      },
      {
        title: '电话',
        dataIndex: 'tel',
        width: 150,
        align:'center',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        width: 150,
        align:'center',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        width: 150,
        align:'center',
      },
      {
        title: '创建时间',
        dataIndex: 'created_at',
        width: 200,
        align:'center',
      },
      {
        title: '上次更新日期',
        dataIndex: 'updated_at',
        width: 200,
        align:'center',
      },
      {
        title: '操作',
        dataIndex: 'address',
        width: 400,
        align: 'center',
        render: (text, record, index) => 
        <>
        {/*  */}
          <Button type="primary" onClick={this.goEdit.bind(this,record)}>编辑</Button>
          <Popconfirm title="是否要删除该条数据？" okText="是" cancelText="否" onConfirm={this.goDelete.bind(this,record)}>
            <Button type="danger" style={{ margin: '0 20px' }}>删除</Button>
          </Popconfirm>
          
        </>
      },
    ];

    this.loadData = this.loadData.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount(){
    const search = localStorage.getItem(this.state.searchLocalStorageKey)
    
    if(search){
      const searchData = JSON.parse(search)
      this.setState({
        searchData: searchData
      },function(){
        this.formRef.current.setFieldsValue({
          keyword: searchData.keyword,
        })
        this.loadData()   
      })
    }else{
      this.loadData()  
    }
  }
  /**翻页 */
  changePage(current){
    const pageData = this.state.paginationProps

    pageData.current = current

    this.props.history.push({pathname:'/student/list/' + current ,query:{page: current}})

    this.setState({
      paginationProps : pageData
    },function(){
      this.loadData()
    })
  }
  /**提交搜索 */
  searchSubmit(){
    const pageData = this.state.paginationProps

    pageData.current = 1

    localStorage.setItem(this.state.searchLocalStorageKey,JSON.stringify(this.state.searchData))

    this.setState({
      paginationProps : pageData
    },function(){
      this.loadData()
    })
  }
  /**重置搜索 */
  searchReset(){
    this.formRef.current.resetFields();

    const pageData = this.state.paginationProps

    pageData.current = 1

    const searchData = this.state.searchData

    searchData.book_name = ''
    searchData.author_name = ''

    this.setState({
      paginationProps : pageData,
      searchData: searchData
    },function(){
      this.loadData()
    })
  }
  /*加载数据*/
  loadData(isInit = true){
    const _this = this 

    const params = {
      page : _this.state.paginationProps.current,
      limit : _this.state.paginationProps.pageSize,
      keyword : _this.state.searchData.keyword,
    }

    getStudentList(params,function(res){
        console.log('返回',res)
        const data = res && res.data.map((item , index) => {
          var temp = []
          temp['key'] = item.id
          temp['username'] = item.username
          temp['tel'] = item.tel
          temp['age'] = item.age
          temp['sex'] = item.sex
          temp['created_at'] = item.created_at
          temp['updated_at'] = item.updated_at
          temp['current_page'] = item.current_page
          return temp
        })

        /**更新分页信息 */
        const pageData = _this.state.paginationProps
        pageData.total = res.total
        pageData.current = res.current_page
        pageData.pageSize = res.per_page
        pageData.showTotal = () => `共`+ res.total +`条`

        _this.setState({
          tableData : data,
          paginationProps : pageData
        });
    })
  }
  goInsert(){
    this.props.history.push({pathname:'/student/insert'})
  }
  goEdit(e){
    this.props.history.push({pathname:'/student/update/' + e.key ,query:{id: e.key}})
  }
  goDelete(e){
    const _this = this
    const params = {
      id : e.key
    }

    studentDelete(params,function(res){
      if(res.code == 200){
        message.success(res.msg);
        _this.loadData()
      }else if(res.code == 201){
        message.warning(res.msg);
      }else if (res.code == 202){
        message.error(res.msg);
      }
    })
  }
  getSpiderClick(id){
    const params = {
      id : id
    }
    console.log(params)
    // getSpiderCommond(params,function(res){
    //   console.log(res)
    // })
  }
  /*编辑数据*/
  handleEdit(id){
    alert(id)
  }
  /*删除数据*/
  handleDelete(id){
    alert(id)
  }
  handleInfo(id){
    this.props.history.push({pathname:'/book/info/' + id ,query:{id: id}})
  }
  handleClick(){
    alert('hahah');
  }
  changeInput(e){
    const field = e.target
    const searchData = this.state.searchData
    searchData[field.name] = field.value
    this.setState({
      searchData 
    })
  }
  /**弹出层隐藏 */
  hide = () => {
    this.setState({
      visible: false,
    });
  };
  /**弹出层变化 */
  handleVisibleChange = visible => {
    this.setState({ visible });
  };
  render() {
    return (
      <>
        <BreadcrumbComponent path='学生管理/学生列表'/>
        <div className="search" style={{ margin: '16px 15px', display : 'flex' , justifyContent : 'space-between' }}>
          <Form ref={this.formRef} name="search" layout="inline" >
            <Row>
                <Form.Item name="keyword" label="学生">                  
                  <Input placeholder="请输入学生姓名" name="keyword" value={this.state.searchData.keyword} onChange={this.changeInput.bind(this)}/>
                </Form.Item>
                <Form.Item> 
                  <Button type="primary" onClick={this.searchSubmit.bind(this)}>
                    搜索
                  </Button>
                </Form.Item>
                <Form.Item> 
                  <Button type="primary" onClick={this.searchReset.bind(this)}>
                    重置
                  </Button>
                </Form.Item>
            </Row>
          </Form>
          <Button type="primary" size="large" onClick={this.goInsert.bind(this)}>新增学生</Button>
        </div>
        <Table
          columns={this.columns}
          dataSource={this.state.tableData}
          pagination={this.state.paginationProps}
          bordered
          // title={() => 'Header'}
          // footer={() => 'Footer'}
        />
      </>
    );
  }
};

export default withRouter(StudentList);



