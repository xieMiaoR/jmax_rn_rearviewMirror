/*
 * @Descripttion: 
 * @version: 
 * @Author: xieruizhi
 * @Date: 2019-11-19 09:52:42
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-04-11 18:46:25
 */
import React, {Component} from 'react';
import {Jimi} from 'react-native-jimi'

export default class Photo extends Component { 

    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            obj => {
                this.photo.upDate();
            }
        );
    }

    componentWillUnmount(){
        this.willFocusSubscription.remove();
    }

    render(){
        return <Jimi.Photo onSelect={(data)=>{
            this.props.navigation.push('PhotoList',{fileType:data.fileType,title:data.title,mediaList:data.mediaList});}}
        ref={(e)=>this.photo =e} />;
    }

}