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
  jobinfo_get() {
    return oGet('http://127.0.0.1:5000/getxqinfo');
  },

  //host的方法==================================================================================
  host_get () {
    return oGet('');
  },
  host_post (params) {
    console.log('进到这里来了');
    return oPost('http://127.0.0.1:5000/jobAdd' + '?' + params);
  },
  host_put (param,params) {
    return oPut('http://127.0.0.1:5000/jobUpdate/' + param, params);
  },
  host_remove(row){
    let rowid = row.id;
    return oRemove('http://127.0.0.1:5000/jobDelete/'+ rowid);
  },
  host_removes(params){
    return oRemove(''+params);
  },

}
