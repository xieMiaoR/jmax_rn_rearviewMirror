/*
 * @Descripttion: 设备控制
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-03-16 09:32:25
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-03-16 09:34:12
 */
import React, {Component} from 'react';
import {Jimi} from 'react-native-jimi';

export default class MediaContral extends Component { 

    constructor(props){
        super(props);
    }

    render(){
        return (
            <Jimi.MediaContral/>
        );
    }

}