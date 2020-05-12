
import {Api} from 'react-native-jimi';

Api.setApi({
    getInstructionsContent:'/instructionsConfig/getInstructionsContent', //根据机型和设备类型查询指令内容
    instructionRecord:'/proxy/module/instruction/record',//获取指令最新信息
    saveLocatorConfigData:'/locator/saveLocatorConfigData',//定位器配置内容保存
    getLocatorConfigData:'/locator/getLocatorConfigData',//定位器配置信息查询
});


//测试环境
// const appKey = 'ba5afd5dfa88b14a';
// const appSecret = '26dcb393631fb62c552ba10c56afaff3';
// const shareUrl = 'http://appsat.jimimax.com/static/locationShare/index.html#/';//测试环境分享地址
// Api.setServer('http://test.api.jimimax.com');

// const shareUrl = 'http://10.0.16.242:8080/#/';//本地地址

//试运行环境
// const appKey = '15e7cb6fbf21e8d4';
// const appSecret = 'cf82edb852e0cd72db17680bb214deaf';
// const shareUrl = 'http://apps.jimimax.com/static/locationShare/index.html#/';//正式环境
// Api.setServer('http://pre.api.jimimax.com');

//正式环境
const appKey = '9b68c972e3ce0e78';
const appSecret = 'bdcc62f87a7bb5dc03714417df940e2d';
const shareUrl = 'http://apps.jimimax.com/static/locationShare/index.html#/';//正式环境
Api.setServer('https://apis.jimimax.com');

export {Api,shareUrl,appKey,appSecret}