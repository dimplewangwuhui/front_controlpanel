import axios from 'axios';
import qs from 'qs'

axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.params = {};

//封装get方法
export const oGet = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.get(url, params)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      }).catch(err => {
      reject(err)
    })
  })
};
//封装post方法
export const oPost = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params))
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      }).catch(err => {
      reject(err);
    })
  })
};
//patch方法用来更新局部资源，put方法用来更新完整的资源对象
//封装patch方法
export const oPatch = (url, param, params) => {
  return new Promise((resolve , reject) => {
    axios.patch(url ,param, params)
      .then(res => {
        resolve(res.data)
      }, err => {
        reject(err)
      }).catch(err => {
      reject(err)
    })
  })
};
//封装put方法
export function oPut(url, param, params){
  return new Promise((resolve,reject) => {
    axios.put(url, param, params)
      .then(res => {
        resolve(res.data);
      },err => {
        reject(err)
      }).catch(err => {
      reject(err)
    })
  })
}
//封装删除数据
export const oRemove = (url , params) => {
  return new Promise((resolve,reject) => {
    axios.delete(url,params)
      .then(res => {
        resolve(res.data)
      },err => {
        reject(err)
      }).catch(err => {
      reject(err)
    })
  })
};

export default {
  job_get(params) {
    return oGet('http://127.0.0.1:5000/getxqinfo' + '?' + params);
  },
  job_post (params) {
    console.log('进到这里来了');
    return oPost('http://127.0.0.1:5000/jobAdd', params);
  },
  job_put (param,params) {
    return oPut('http://127.0.0.1:5000/jobUpdate/' + param, params);
  },
  job_remove(row){
    let rowid = row.id;
    return oRemove('http://127.0.0.1:5000/jobDelete/'+ rowid);
  },
  job_removes(params){
    return oRemove('http://127.0.0.1:5000/jobMultiDelete/' + params);
  },
  //====================================================================================================================
  users_get(params) {
    return oGet('http://127.0.0.1:5000/getUsers' + '?' + params);
  },
  users_put (param, params) {
    return oPut('http://127.0.0.1:5000/userUpdate/'+ param, params);
  },
  users_remove(row){
    let rowid = row.id;
    return oRemove('http://127.0.0.1:5000/userDelete/'+ rowid);
  },
  users_removes(params){
    return oRemove('http://127.0.0.1:5000/userMultiDelete/' + params);
  },
  //====================================================================================================================
  house_get(params) {
    return oGet('http://127.0.0.1:5000/gethouse' + '?' + params);
  },
  house_post (params) {
    return oPost('http://127.0.0.1:5000/houseAdd', params);
  },
  house_put (param,params) {
    return oPut('http://127.0.0.1:5000/houseUpdate/' + param, params);
  },
  house_remove(row){
    let rowid = row.id;
    return oRemove('http://127.0.0.1:5000/houseDelete/'+ rowid);
  },
  house_removes(params){
    return oRemove('http://127.0.0.1:5000/houseMultiDelete/' + params);
  },
  // ===================================================================================================================
  agency_get(params) {
    return oGet('http://127.0.0.1:5000/getAgency' + '?' + params);
  },
  agency_post (params) {
    return oPost('http://127.0.0.1:5000/agencyAdd', params);
  },
  agency_put (param,params) {
    return oPut('http://127.0.0.1:5000/agencyUpdate/' + param, params);
  },
  agency_remove(row){
    let rowid = row.id;
    return oRemove('http://127.0.0.1:5000/agencyDelete/'+ rowid);
  },
  agency_removes(params){
    return oRemove('http://127.0.0.1:5000/agencyMultiDelete/' + params);
  },
  // ===================================================================================================================
  message_get(params) {
    return oGet('http://127.0.0.1:5000/getMessage' + '?' + params);
  },
  message_post (params) {
    console.log('进到这里来了');
    return oPost('http://127.0.0.1:5000/messageAdd', params);
  },
  message_put (param,params) {
    return oPut('http://127.0.0.1:5000/messageUpdate/' + param, params);
  },
  message_remove(row){
    let rowid = row.id;
    return oRemove('http://127.0.0.1:5000/messageDelete/'+ rowid);
  },
  message_removes(params){
    return oRemove('http://127.0.0.1:5000/messageMultiDelete/' + params);
  },
  // ==================================================================================================================
  notice_get(params) {
    return oGet('http://127.0.0.1:5000/getNotice' + '?' + params);
  },
  notice_post (params) {
    return oPost('http://127.0.0.1:5000/noticeAdd', params);
  },
  notice_put (param,params) {
    return oPut('http://127.0.0.1:5000/noticeUpdate/' + param, params);
  },
  notice_remove(row){
    let rowid = row.id;
    return oRemove('http://127.0.0.1:5000/noticeDelete/'+ rowid);
  },
  notice_removes(params){
    return oRemove('http://127.0.0.1:5000/noticeMultiDelete/' + params);
  },
  //===================================================================================================================
  focusHouse_get(params) {
    return oGet('http://127.0.0.1:5000/getfocusHouse' + '?' + params);
  },
  focusHouse_remove(row){
    let rowid = row.id;
    return oRemove('http://127.0.0.1:5000/focusHouseDelete/'+ rowid);
  },
  focusHouse_removes(params){
    return oRemove('http://127.0.0.1:5000/focusHouseMultiDelete/' + params);
  },
  // ==================================================================================================================
  userMessage_get(params) {
    return oGet('http://127.0.0.1:5000/getUserMessage' + '?' + params);
  },
  userMessage_put (param,params) {
    return oPut('http://127.0.0.1:5000/userMessageUpdate/' + param, params);
  },
  userMessage_remove(row){
    let rowid = row.id;
    return oRemove('http://127.0.0.1:5000/userMessageDelete/'+ rowid);
  },
  userMessage_removes(params){
    return oRemove('http://127.0.0.1:5000/userMessageMultiDelete/' + params);
  },
}
