/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-15 17:00:45
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-08-15 17:00:48
 */
import deviceIconList from '../components/deviceIcon';

const allData = {
    trackQueryTime:7,//轨迹时间
    insTimeArr:['30s','1分钟','2分钟','3分钟','4分钟','5分钟','持续录音'],//存储录音时长
    deviceInfo:{},//设备信息
    deviceIcon:require('../assets/deviceIcon/map_car_motion.png')
};

const storageData = (state = allData,action) => {
    switch (action.type) {
    case 'TRACK_QUERY_TIME':
        return {
            ...state,
            trackQueryTime:action.value
        };
    case 'INS_TIME_ARR':
        return {
            ...state,
            insTimeArr:action.value
        };
    case 'DEVICE_INFO':
        return {
            ...state,
            deviceInfo:action.value
        };    
    case 'DEVICE_ICON':
        let img = null;
        deviceIconList.map((item)=>{
            if(item.key==action.value.deviceIcon){
                img = action.value.deviceStatus? item.onLine :item.offLine; 
            }
        });
        return {
            ...state,
            deviceIcon:img
        };    
    default:
        return state;
    }
};

export default storageData;