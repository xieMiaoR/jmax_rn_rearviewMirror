
import React, { Component } from 'react';
import {Image,ScrollView,Text} from 'react-native';
import { connect } from 'react-redux';
import {ListRow} from 'teaset';
import {Applet,Jimi,Circle} from 'react-native-jimi';
import {Api} from '../../../api';
import instructData from '../instruct/data';

export default class Instruct extends Component { 

    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
    }

    render(){
        return <ScrollView style={[this.props.style,{flex:1,marginTop:15}]}>
             <Jimi.Instruction 
                instructionArr={this.state.data} 
                onArrowButton={(data) => this.onArrowButton(data)}
             ></Jimi.Instruction>
             {
                 this.state.data.length>0?
             <ListRow  
                icon={<Image style={{marginLeft:5,marginRight:10}} source={require('../../../assets/setting/Sos.png')}></Image>} 
                title={<Text style={{fontSize:14}}>SOS告警</Text>} 
                accessory={<Image style={{marginRight:5,width:15,height:15}} source={require('../../../assets/setting/List_arrow.png')} />}
                onPress={()=>{
                    this.props.onSos();
                }}
                activeOpacity={1}
                bottomSeparator={'none'}
                >
               </ListRow>:<Jimi.Empty 
                imgStyle={{marginTop:163}}/>
                }
        </ScrollView> 
    }

    componentWillMount() {
        // this.init();
        this.getInstructionsContent();
    }

    /**
     * 本地数据初始化获取数据（测试本地数据使用）
     */
    init = () =>{
        instructData.forEach(item => {
            if(item.type == this.props.deviceType){
                this.setState({
                    data:[...item.data]
                });
            }
        });
    }


    onArrowButton = (data) => {
        const params = JSON.parse(JSON.stringify(data));
        this.props.onArrowButton(params);
    }



    /**
     * 获取指令内容
     */
    getInstructionsContent = () =>{
        let loading = Circle.Toast.loading('加载中...');
        Applet.jmAjax({
            url:Api.getInstructionsContent,
            method:'GET',
            encoding:true,
            encodingType:true,
            data:{
                deviceType:'DVR',
                typeNum:this.props.deviceType
            },
            header:0
        }).then((res)=>{
            Circle.Toast.remove(loading);
            if(res.data){
                this.setState({
                    data:[...JSON.parse(res.data.content)]
                },()=>{
                    console.log(this.state.data,'asdasdasd');
                });
            }  
        }).catch(()=>{
            Circle.Toast.remove(loading);
        });
    }
}





