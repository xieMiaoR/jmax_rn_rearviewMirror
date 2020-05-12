/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-12-27 17:43:23
 * @LastEditors  : xieruizhi
 * @LastEditTime : 2019-12-28 10:30:35
 */
import React,{Component} from 'react';
import {Jimi} from 'react-native-jimi';
import { connect } from 'react-redux';

class Details extends Component { 
    
    constructor(props){
        super(props);
        this.state = {
            deviceInfo:props.deviceInfo
        }
    }

    render(){
        return <Jimi.Details 
            data = {this.state.deviceInfo}
            onDeviceNameChange={(value)=>{
                //修改名称成功回调，更新数据
                let data = this.state.deviceInfo;
                data.deviceName = value;
                this.setState({
                    deviceInfo:data
                },()=>{
                    this.props.setDeviceInfo(data);
                });
            }}
            onSetUpIcon = {()=>{
                //跳转到设置图标界面
                this.props.navigation.push('IconLibrary',{activateKey:this.state.deviceInfo.deviceIcon,callBack:(value)=>{
                    //设置图标后回调获取更新后的图标，重新更新数据
                    let data = this.state.deviceInfo;
                    data.deviceIcon = value;
                    this.setState({
                        deviceInfo:data
                    },()=>{
                        this.props.setDeviceInfo(data);
                        this.props.setDeviceIcon({deviceIcon:value,deviceStatus:data.deviceStatus});
                    });

                }});
            }}
        />;
    }
}

export default connect(
    (state) => ({
        deviceInfo: state.storageData.deviceInfo
    }),
    (dispatch) => ({
        setDeviceInfo:(params) => {
            dispatch({
                type:'DEVICE_INFO',
                value:params
            });
        },
        setDeviceIcon:(params) => {
            dispatch({
                type:'DEVICE_ICON',
                value:params
            });   
        }
    })
)(Details);