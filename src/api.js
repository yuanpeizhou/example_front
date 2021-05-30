
import axios from 'axios'

const api_url = 'http://zhou.student.com/'


function httpRequest(url,method = 'get',params,charset,callback){
  var apiUrl = ''
  if(url.indexOf('http') !== -1){
    apiUrl = url
  }else{
    apiUrl = api_url + url
  }
  if(method === 'get'){
      axios.get(apiUrl, {
        params: params
      })
      .then(function (response) {
        callback(response.data.content)
      })
      .catch(function (error) {
        console.log(error);
      });
  }else{
    axios.post(apiUrl, params)
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

}



/**获取学生列表 */
export function getStudentList(params,callback){
  return httpRequest('admin/student/list','get',params,'utf-8',callback)
}

/**获取学生详情 */
export function getStudentInfo(params,callback){
  return httpRequest('admin/student/info','get',params,'utf-8',callback)
}

/**新增学生 */
export function studentInsert(params,callback){
  return httpRequest('admin/student/insert','post',params,'utf-8',callback)
}

/**编辑学生 */
export function studentUpdate(params,callback){
  return httpRequest('admin/student/update','post',params,'utf-8',callback)
}

/**删除学生 */
export function studentDelete(params,callback){
  return httpRequest('admin/student/delete','post',params,'utf-8',callback)
}

