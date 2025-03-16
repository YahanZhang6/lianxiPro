import axios from '../utils/request'
import md5 from 'md5'
//登录  (api接口-主播个人加api区分)
export const $login = async (params) => {
    params.loginPwd = md5(md5(params.loginPwd).split('').reverse().join(''))
   let{data} = await axios.get('Admin/Login',{params})
   
  if(data.success){
    // 在浏览器缓存中存储token
    sessionStorage.setItem('token',data.token)
  }
    return data  
}

// 获取单个账户
export const $getOne = async (params)=>{
  let {data} = await axios.get('Admin/GetOne',{params})
  return data
}


