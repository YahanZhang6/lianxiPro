import axios from '../utils/request'

//房型列表
export const $list = async () => {
    let{data} = await axios.get('RoomType/List')
    return data
}

//添加房型

export const $add = async (params)=>{
  let {data} = await axios.post('RoomType/Add',params)
  return data
}

//获取单个房型
//添加角色


export const $getOne = async (params)=>{
  let {data} = await axios.get('RoomType/GetOne',params)
  return data
}

//显示销售统计
export const $TotalTypePrice = async()=>{
       let{data} = await axios.get('RoomType/TotalTypePrice')
    return data
}

