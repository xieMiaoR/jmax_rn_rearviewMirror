/*
 * @Descripttion: 公共数据处理，逻辑处理方法出口
 * @version: 1.0.0
 * @Author: liujinyuan
 * @Date: 2019-08-05 17:17:51
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-10-30 18:21:09
 */
import {Dimensions,Platform} from 'react-native';
import {Circle} from 'react-native-jimi';
const {Theme} = Circle;

/**
 * 兼容ios苹果X
 * @param {Number} initHeight 高度
 */
export const iphoneXHeight =(initHeight)=> {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    // iPhoneX
    const X_WIDTH = 375;
    const X_HEIGHT = 812;
    const isIPhoneX =  Platform.OS === 'ios' &&(screenHeight === X_HEIGHT && screenWidth === X_WIDTH || screenHeight === X_WIDTH && screenWidth === X_HEIGHT);
    return  isIPhoneX? initHeight+Theme.iphoneXBottomDefault :initHeight;
};


/**
 * 
 * @param {Number} time 时间简化显示处理
 */
export const parseDate = (time) => {
    var dZero = new Date(new Date().toLocaleDateString()).getTime();
    var d = 24 * 60 * 60 * 1000;
    if (time > dZero) {
        return '今天';
    } else if (time > dZero - d) {
        return '昨天';
    } else if (time > dZero - d * 2) {
        return '前天';
    } else {
        return new Date(time).Format('YYYY-MM-DD');
    }
};

/**
 * 
 * @param {Number} time 时间
 */
export const parseTime = (time) => {
    var h = parseInt(time / 60 / 60);
    var m = parseInt(time / 60) % 60;
    var s = time % 60;

    h = h > 9 ? h : `0${h}`;
    m = m > 9 ? m : `0${m}`;
    s = s > 9 ? s : `0${s}`;
    
    return `${h}:${m}:${s}`;
};
