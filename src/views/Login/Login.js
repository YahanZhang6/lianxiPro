import React,{useState}from 'react'
import {useNavigate} from 'react-router-dom'
import './Login.scss'
 import{$login,$getOne}from '../../api/adminApi'
import {useDispatch} from 'react-redux'
//import MyNotification from '../../components/MyNotification/MyNotification';
import{Button, Form, Input, notification} from 'antd';
import MyNotification from '../../components/MyNotification/MyNotification';
import {adminSlice} from '../../redux'
//import adminSlice from '../../redux';

export default function Login(){
  //定义redux的派发器
const dispatch = useDispatch()
//获取更新admin全局数据的action
let{setAdmin} = adminSlice.actions
  //导航
  let navigate = useNavigate()
  //通知框状态
  let [notiMsg,setNotiMsg] = useState({type:'', description:''})



     //表单
    let[form] = Form.useForm()

const onFinish = async (values) => {
    try {
        console.log('Sending login request with values:', values);
        const response = await $login(values);
        console.log('Login response:', response);  // 检查 API 返回的数据

        if (!response || typeof response !== 'object') {
            console.error('Invalid response from $login:', response);
            return;
        }

        const { message, success } = response;

        if (success) {
          let admin = await $getOne({loginId:values.loginId})
          console.log(admin);
          //将当前登录账户信息，存储到redux
          dispatch(setAdmin(admin))
            setNotiMsg({ type: 'success', description: message || '登录成功' });
            navigate('/layout')
        } else {
            setNotiMsg({ type: 'error', description: message || '登录失败，请重试' });
        }
    } catch (error) {
        console.error('Login error:', error);
        setNotiMsg({ type: 'error', description: '登录请求失败，请检查网络连接' });
    }
};


    return(
        <div className = 'login'>
<div className ='content'>
    <h2>酒店后台管理系统 </h2>
    <Form
    name="basic"
    form = {form}
    labelCol={{
      span: 4,
    }}
    wrapperCol={{
      span: 18,
    }}
   
    initialValues={{
      loginId:'',
      loginPwd: ''
    }}
    onFinish={onFinish}
    autoComplete="off"
  >

 




    <Form.Item
      label="账号"
      name="loginId"
      rules={[
        {
          required: true,
          message: '请输入账号',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="密码"
      name="loginPwd"
      rules={[
        {
          required: true,
          message: '请输入密码',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item name="remember" valuePropName="checked" label={null}>
      
    </Form.Item>

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        登录
      </Button>
      <Button onClick = {()=>{
        form.resetFields()
      }} style ={{marginLeft:'10px'}}>
        取消
      </Button>
    </Form.Item>
  </Form>

</div>
<MyNotification notiMsg={notiMsg}></MyNotification>
        </div>
    )
}