
import React, { Component } from 'react';
import { View,Text,ScrollView} from 'react-native';
import {ListRow} from 'teaset';
import {Applet,Api,Circle,Jimi} from 'react-native-jimi';
import {appKey,appSecret} from '../../../api/index';

export default  class Alarm extends Component { 

    constructor(props){
        super(props);
        this.state= {
            code:'',
            appKey:appKey,
            appSecret:appSecret,
            deviceType:this.props.deviceType,
            alarmList:[],
            openId:'',
            enabledFlag:false
        }
    }

    render(){
        return <ScrollView style={[this.props.style,{marginTop:15,flex:1}]}>
            {
                this.state.openId ?
                <View>
                <View style={{marginBottom:15,backgounrdColor:'#F7F7F7'}}>
                 <ListRow 
                    style={{height:65}}
                    bottomSeparator ={'none'}
                    title={<View style={{marginLeft:7}}><Text style={{fontSize:14}}>告警接收</Text><Text style={{color:'#A3A3A3',fontSize:11,marginTop:5}}>关闭后，App将不再接收所有告警信息</Text></View>} 
                    detail={<Circle.Switch value={this.state.enabledFlag}
                        activeColor={'#13A887'}
                        onValueChange={(value)=>this.onAppAlarmModeChange(value)}
                    />}
                    bottomSeparator={'none'}
                    detailStyle={{marginRight:7}}
                /> 
                </View>
            {
                this.state.enabledFlag?
                    this.state.alarmList.map((item,index)=>{
                        return  <View key={'alarm'+index}><ListRow 
                        title={item.alarmName} 
                        detail={<Circle.Switch value={item.enabledFlag?true:false}
                        activeColor={'#13A887'} 
                        onValueChange={(value)=>this.upDateState(value?1:0,item)}
                        />}
                        bottomSeparator={'none'}
                        titleStyle={{marginLeft:7}}
                        detailStyle={{marginRight:7}}
                    />
                    {
                        index === this.state.alarmList.length-1?null:
                        <View key={'border'+index}   style={{flex:1,height:Circle.Theme.wheelHoleLineWidth,flexDirection:'row',backgroundColor:'#bebebe',marginLeft:15,marginRight:15}}></View>
                    }
                    </View>
                    })
            :null
            }
           
            <View style={{height:100,width:100}}></View>
            </View>:<Jimi.Empty 
                imgStyle={{marginTop:163}}
                text={'upDate'}
                onPress={()=>{
                    console.log('1111111');
                    this.authorizationProcess();
                }}
            />
        }
        </ScrollView> 
    }

    componentWillMount(){
        this.authorizationProcess();
    }

    /**
     * 授权流程
     */
    authorizationProcess = ()=>{
        Applet.authorizationProcess({
            appKey:this.state.appKey,
            responseType:'code',
            scope:'auth_oauth2_account',
            state:'1',
            callBack:(res)=>{
                this.setState({
                    code:res.code
                },()=>{
                    this.userInit(res.code);
                });
            }
        })
    }

    /**
     * 初始化数据
     */
    userInit = (code)=>{
        Applet.jmAjax({
            url:Api.userInit,
            method:'POST',
            encoding:true,
            encodingType:true,
            data:{
                deviceType:this.state.deviceType,
                code:code,
                appKey:this.state.appKey,
                appSecret:this.state.appSecret,
            }
        }).then((res)=>{
           this.setState({
            openId:res.data.openid
           },()=>{
                this.getAlarmMode();
           });
        });
    }

    /**
     * 获取报警方式
     */
    getAlarmMode = ()=> {
        Applet.jmAjax({
            url:Api.alarmMode,
            method:'GET',
            encoding:true,
            encodingType:true,
            data:{
                openId:this.state.openId
            }
        }).then((res)=>{
            this.setState({
                enabledFlag:res.data.app
            },()=>{
                this.getAlarmList();
            });
        });
    }


    /**
     * 获取报警列表
     */
    getAlarmList = ()=> {
        Applet.jmAjax({
            url:Api.alarmList,
            method:'GET',
            encoding:true,
            encodingType:true,
            data:{
                alarmMode:'app',
                openId:this.state.openId,
            },
            header:0
        }).then((res)=>{
            console.log(res,'报警列表');
           if(res.data){
                this.setState({
                    alarmList:[...res.data]
                });
           }
        });        
    }

    /**
     * 修改报警状态
     */
    upDateState = (value,params)=>{
        console.log(value,'value');
        
        Applet.jmAjax({
            url:Api.enableState,
            method:'PUT',
            encoding:true,
            encodingType:true,
            data:{
                enabledFlag:value,
                alarmMode:'app',
                alarmCode:params.alarmCode,
                openId:this.state.openId
            }
        }).then((res)=>{
            this.getAlarmList();
        }).catch((res)=>{
            this.setState({
                alarmList:this.state.alarmList
            });
        });  
    }

    /**
     * 监听报警方式状态修改
     */
    onAppAlarmModeChange = (value) =>{
        this.setState({
            enabledFlag:value
        },()=>{
            Applet.jmAjax({
                url:Api.setAlarmState,
                method:'PUT',
                encoding:true,
                encodingType:true,
                data:{
                    enabledFlag:value?1:0,
                    alarmMode:'app',
                    openId:this.state.openId
                }
            }).then((res)=>{
                this.getAlarmMode();
            }).catch(()=>{
                this.setState({
                    enabledFlag:!this.state.enabledFlag
                });
            }); 
        });
    }
}



