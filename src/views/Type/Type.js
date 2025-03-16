import React, {useEffect, useState} from 'react'

import{Table } from 'antd'
import{$list} from '../../api/typeApi'
import{ Button} from 'antd'
import MyNotification from '../../components/MyNotification/MyNotification';
//import axios from './utils/request'
import AddType from './addType'
import { AliveScope } from "react-activation";
export default function Type() {
  

  //房型数据
   let [typeList,setTypeList] = useState(0)
  // 是否打开抽屉
  const [open, setOpen] = useState(false);
    //关闭抽屉




  

  // 角色列表数据
  let [roleList, setRoleList] = useState([]);
  useEffect(() => {
    loadList();
  }, []);
  // 加载列表数据的方法
  const loadList = () => {
    $list().then((data) => {
      data = data.map((r) => {
        return {
          ...r,
          key: r.roomTypeId,
        };
      });
      setTypeList(data);
    });
  };

  

const columns = [
  {
    title: '房型编号',
    dataIndex: 'roomTypeId',
    
  },
  {
    title: '房型名称',
    dataIndex: 'roomTypeName',
   
  },
   {
    title: '价格',
    dataIndex: 'roomTypePrice',
    
  },
  {
    title: '床位数量',
    dataIndex: 'benNum',
   
  },
 
];
  return (
    

    <>
    <div className='search'>
      <Button size='small' onClick={()=>{setOpen(true)}}>添加</Button>
      

    </div>
        <Table size = 'small' dataSource={typeList} columns={columns} />

       <AddType open={open} setOpen={setOpen} loadList={loadList}/>
      {/* <MyNotification notiMsg={notiMsg}/> */}
    
    </>

    
    
  )
}
