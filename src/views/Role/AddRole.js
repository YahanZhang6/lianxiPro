import React ,{useEffect, useState}from 'react'
import{$add, $update,$getOne} from '../../api/RoleApi'
import MyNotification from '../../components/MyNotification/MyNotification';
import{ Button, Drawer, Form,Input } from 'antd'


export default function AddRole({open, setOpen, loadList,roleId,setRoleId}){
   let[form]= Form.useForm()

    const onClose = () => {
    clear()//清空表单
    setRoleId(0)
    setOpen(false);//再关闭

  };
//    useEffect(()=>{
//     if(roleId!==0){
//       $getOne({roleId}).then(data=>{
//         form.setFieldsValue(data)
//       })
//     }
//   },[roleId])

     let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });

    //表单提交方法
    
const onFinish = (values) => {
  const requestData = { ...values, roleId }; // 确保包含 roleId

  if (roleId) {
    $update(requestData).then(({ success, message }) => {
      if (success) {
        setNotiMsg({ type: "success", description: message });
        loadList(); // 重新加载列表
        setOpen(false); // 关闭抽屉
      } else {
        setNotiMsg({ type: "error", description: message });
      }
    });
  } else {
    $add(values).then(({ success, message }) => {
      if (success) {
        setNotiMsg({ type: "success", description: message });
        clear(); // 清空表单
        loadList(); // 重新加载列表
      } else {
        setNotiMsg({ type: "error", description: message });
      }
    });
  }
};


    const clear = ()=>{
  
    form.resetFields(); // 清空表单
    setOpen(false); // 关闭抽屉
    setRoleId(0);
  }

  return(
     <>
        <Drawer title="添加角色"  placement="right" onClose ={onClose} open={open}>
       <Form
         name="basic"
         form={form}
         labelCol={{
           span: 8,
         }}
         wrapperCol={{
           span: 18,
         }}
         style={{
           maxWidth: 600,
         }}
         initialValues={{
           remember: true,
         }}
         onFinish={onFinish}
      
         autoComplete="off"
       >
         <Form.Item
           label="角色名称"
           name="roleName"
           rules={[
             {
               required: true,
               message: '请输入角色名称',
             },
           ]}
         >
           <Input />
         </Form.Item>
     
       
     
         <Form.Item name="remember" valuePropName="checked" label={null}>
         </Form.Item>
     
         <Form.Item label={null}>
           {/* <Button type="primary" htmlType="submit">
             添加
           </Button> */}
             <Button type="primary" htmlType="submit">
              {roleId?'修改':'添加'}
            </Button>
     
          <Button onClick={clear} style={{ marginLeft: "10px" }}>
              取消
            </Button>
     
         </Form.Item>
       </Form>
     );
           </Drawer>
          <MyNotification notiMsg={notiMsg}/>
             </>
            

  )

}