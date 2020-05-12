/*
 * @Descripttion: 媒体同步
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-2-19 21:16:42
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-03-31 16:43:27
 */
import React, {Component} from 'react';
import {Jimi} from 'react-native-jimi'
export default class MediaSyc extends Component { 

    constructor(props){
        super(props);
    }

    render(){
        return (
            <Jimi.MediaSyc onSelect={(item) => this.onSelect(item)} />
        );
        
    }
    onSelect = (item) => {
        this.props.navigation.navigate('MediaDetails',item);
    }

}