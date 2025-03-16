import React, {useEffect, useState,lazy, Suspense,useMemo,useCallback} from 'react'

import{Table } from 'antd'
import{$list,$del} from '../../api/RoleApi'
import{ Button,Popconfirm} from 'antd'
import { KeepAlive } from "react-activation";

import MyNotification from '../../components/MyNotification/MyNotification';

// 懒加载 AddRole 组件
//const AddRole = lazy(() => import('./AddRole'));

const AddRole = lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => resolve(import('./AddRole')), 2000); // 2 秒后才加载
    });
});


// ** 使用 React.memo 对 AddRole 组件进行优化
const MemoizedAddRole = React.memo(AddRole);

export default function Role() {
     useEffect(() => {
        console.log("Role 组件挂载");

        return () => {
            console.log("Role 组件卸载"); // 如果 KeepAlive 生效，这条日志不会出现
        };
    }, []);

  // 通知框状态
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });
  

  //角色列表数据
   let [roleId,setRoleId] = useState(0)
  // 是否打开抽屉
  const [open, setOpen] = useState(false);
    //关闭抽屉


  // const edit = (roleId)=>{
  //   setOpen(true)  //打开抽屉
  //   setRoleId(roleId)  //设置为编辑状态
  // }

  
  const edit = useCallback((roleId) => {
    setOpen(true);
    setRoleId(roleId);
}, []);




  // 角色列表数据
  let [roleList, setRoleList] = useState([]);
  useEffect(() => {
    loadList();
  }, []);
  // 加载列表数据的方法
  // const loadList = () => {
  //   $list().then((data) => {
  //     data = data.map((r) => {
  //       return {
  //         ...r,
  //         key: r.roleId,
  //       };
  //     });
  //     setRoleList(data);
  //   });
  // };

   const loadList = useCallback(() => {
        $list().then((data) => {
            setRoleList(data.map(r => ({ ...r, key: r.roleId })));
        });
    }, []);


//  const del = (roleId) => {
//     $del({ roleId }).then(({ success, message }) => {
//       if (success) {
//         setNotiMsg({ type: "success", description: message });
//         loadList(); //重新加载列表
//       } else {
//         setNotiMsg({ type: "error", description: message });
//       }
//     });
//   };


const del = useCallback((roleId) => {
    $del({ roleId }).then(({ success, message }) => {
        if (success) {
            setNotiMsg({ type: "success", description: message });
            loadList(); // 重新加载列表
        } else {
            setNotiMsg({ type: "error", description: message });
        }
    });
}, [loadList]); 



  
const columns = useMemo(() => {
    console.log("columns 重新计算了"); // 观察是否在不必要的时候执行
    return [
        {
            title: '角色编号',
            dataIndex: 'roleId',
        },
        {
            title: '角色名称',
            dataIndex: 'roleName',
        },
        {
            title: "操作",
            key: "action",
            render: (ret) => (
                <>
                    <Button size="small" style={{ borderColor: 'orange', color: 'orange' }} onClick={() => edit(ret.roleId)}>
                        编辑
                    </Button>
                    <Popconfirm
                        title="提示"
                        description="确定删除吗？"
                        onConfirm={() => del(ret.roleId)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button style={{ marginLeft: '5px' }} danger size="small">
                            删除
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];
}, [edit, del]); // 依赖项不变时，columns 不会重新计算

  return (
    

    <>
    <div className='search'>
      <Button size='small' onClick={()=>{setOpen(true)}}>添加</Button>
      <Button size="small" style={{ marginLeft: '10px' }} onClick={() => setRoleId((prev) => prev + 1)}>
                更改 roleId
            </Button>

    </div>
        <Table size = 'small' dataSource={roleList} columns={columns} />

       
      {/* 使用 Suspense 处理懒加载组件 */}
             <KeepAlive>
            <Suspense fallback={<div style={{ textAlign: "center", padding: "20px" }}>加载中...</div>}>
               <MemoizedAddRole open={open} setOpen={setOpen} loadList={loadList} roleId={roleId} setRoleId={setRoleId} />
            </Suspense>
            </KeepAlive>
       <MyNotification notiMsg={notiMsg}/>
    </>

    
    
  )
}
