/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-03-17 16:22:00
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-03-17 18:52:55
 */
import React, { Component } from 'react';
import {Jimi,Applet,Circle} from 'react-native-jimi';
import {Api} from '../../../api/index';

export default class Instruction extends Component {

    static navigationOptions = ({navigation}) => ({
        title: navigation.getParam('content').text,
    });

    constructor(props){
        super(props);
        this.state = {
            instructionId:this.props.navigation.state.params.content.id,
            instructionData:this.props.navigation.state.params.data
        }
    }

    render(){
        const data = this.state.instructionData;
        console.log(data,'data');
        return (
            <Jimi.Instruction 
                id={this.state.instructionId}   
                hint={data.hint} 
                instructionArr={data.instructionArr} 
                isButton={data.isButton} 
                instruction={data.instruction}
                setInstruction={()=>{
                    console.log('asdasdasd');
                    Circle.Toast.message('发送成功')
                }}
            ></Jimi.Instruction>
        );
    }

    componentWillMount() {
        this.getInstructionRecord();
    }

    /**
     * 获取指令信息
     */
    getInstructionRecord = ()=>{
        Applet.jmAjax({
            url:Api.instructionRecord,
            method:'GET',
            encoding:true,
            encodingType:true,
            data:{
                instructionId:this.state.instructionId
            },
            header:0
        }).then((res)=>{
            console.log(res,'有没有记录');
            
            let data = this.state.instructionData;
            if(res.data){
                data.instructionArr =JSON.parse(res.data).data;
                this.setState({
                    instructionData:data
                },()=>{
                    console.log(this.state.instructionData,'有没有记录');
                });
            }
        });
    }
}