import React ,{useEffect, useState}from 'react'
import{$add} from '../../api/typeApi'
import MyNotification from '../../components/MyNotification/MyNotification';
import{ Button, Drawer, Form,Input } from 'antd'

export default function AddType({open, setOpen, loadList}){
   let[form]= Form.useForm()

    const onClose = () => {
    clear()//清空表单
    setOpen(false);//再关闭

  };

     let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });

    //表单提交方法
      const onFinish = (values) => {
        try{
        $add(values).then(({success,message}) =>{
          if(success){
            console.log("Submitting values:", values);
           setNotiMsg({type:'success', description:message})
           clear()
           loadList()//刷新
          
          }
          else{
            setNotiMsg({type:'error', description:message})
          }
        })
      }
      catch{
        
            setNotiMsg({ type: 'error', description: "服务器错误，请稍后再试！" });
      }
    };
    const clear = ()=>{
    form.resetFields()
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
           label="房型编号"
           name="roomTypeId"
           >  <Input />
           </Form.Item>

         <Form.Item
           label="房型名称"
           name="roomName"
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
           <Button type="primary" htmlType="submit">
             添加
           </Button>
     
           <Button onClick ={clear} style={{marginLeft:'10px'}} >
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