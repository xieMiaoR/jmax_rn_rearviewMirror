import React, { Component } from 'react';
import {View,StyleSheet,Image,Dimensions,TouchableOpacity,Text} from 'react-native';
import {ListRow,ActionSheet} from 'teaset';
import {Circle,Applet} from 'react-native-jimi';
const {width} = Dimensions.get('window');
import {Api} from '../../../api';
import {iphoneXHeight} from '../../../libs/utils';
import Toast from 'teaset/components/Toast/Toast';
export default class SosAlarm extends Component {


    constructor(props){
        super(props);
         this.state = {
             content:{onOff:1,recordTime:3,direction:'out',cmd:'Vedio,out,3'},
             directionValue:'外部摄像头',
             timeItem:['3s', '4s', '5s', '6s', '7s','8s', '9s', '10s']
         }
    }


    render(){
        let data = this.state.content;
        return <View style={Styles.container}>
            <ListRow 
                style={{marginBottom:15,marginTop:15}}
                title={'允许视频上传'} 
                detail={<Circle.Switch value={data.onOff?true:false}
                activeColor={'#13A887'}
                onValueChange={(value)=>{
                    this.setData('onOff',value?1:0);
                }}
            />}
                bottomSeparator={'none'}
            ></ListRow >
            {
                this.state.content.onOff?
            <View>
                <ListRow 
                    activeOpacity={1}
                    title={'视频长度'}
                    accessory={<Image style={{width:15,height:15}} source={require('../../../assets/setting/List_arrow.png')} />}
                    onPress={this.onSelecTime}
                    detail={data.recordTime+'s'}
                    detailStyle={{marginRight:10}}
                ></ListRow>
                <ListRow 
                    bottomSeparator={'none'}
                    activeOpacity={1}
                    title={'摄像头方向'} 
                    accessory={<Image style={{width:15,height:15}} source={require('../../../assets/setting/List_arrow.png')} />}
                    onPress={()=>this.onSelect()}
                    detail={this.getDirectionValue(data.direction)}
                    detailStyle={{marginRight:10}}
                ></ListRow>
            </View>:null
            }
            <View style={{alignItems:'center'}}>
                <Circle.Button title={'发送指令'} type={'primary'} style={Styles.btn} onPress={this.onSave} ></Circle.Button>
            </View>
        </View>
    }


    componentWillMount() {
        this.init();
    }

    init = ()=> {
        Applet.jmAjax({
            url:Api.getLocatorConfigData,
            method:'GET',
            encoding:true,
            encodingType:true,
            header:0,
            data:{
                configType:'SOS_ALARM_SETING'
            }
        }).then((res)=>{
            console.log(res,'asdasdasd');
            if(res.data){
                this.setState({
                    content:JSON.parse(res.data.content)
                });
            }
        }); 
    }

    onSave =()=>{
        console.log(this.state.content,'content');
        Applet.jmAjax({
            url:Api.saveLocatorConfigData,
            method:'POST',
            encoding:true,
            encodingType:true,
            data:{
                configType:'SOS_ALARM_SETING',
                content:JSON.stringify(this.state.content)
            }
        }).then((res)=>{
            console.log(res);
            Toast.message('发送成功');
        });        
    }

    onSelect = ()=> {
        let items = [
            {title: '外摄像头', onPress:()=> this.setDirection('in')},
            {title: '内摄像头',onPress:()=> this.setDirection('out')},
            {title: '外+内摄像头',onPress:()=> this.setDirection('inout') },
          ];
          let cancelItem = {title: '取消'};
          ActionSheet.show(items, cancelItem);
    }

    /**
     * 设置摄像头方向
     */
    setDirection = (value)=> {
        this.setData('direction',value);
    }

    onSelecTime = ()=> {
        // let items = [
        //     {title: '3s', onPress:()=> this.setTime(3)},
        //     {title: '4s',onPress:()=> this.setTime(4)},
        //     {title: '5s',onPress:()=> this.setTime(5) },
        //     {title: '6s',onPress:()=> this.setTime(6) },
        //     {title: '7s',onPress:()=> this.setTime(7) },
        //     {title: '8s',onPress:()=> this.setTime(8) },
        //     {title: '9s',onPress:()=> this.setTime(9) },
        //     {title: '10s',onPress:()=> this.setTime(10) },
        //   ];
        //   let cancelItem = {title: '取消'};
        //   ActionSheet.show(items, cancelItem); 
        let time = this.state.content.recordTime;
        let open = Circle.Drawer.open(
            <View style={{width:width,height:iphoneXHeight(250),backgroundColor:'#fff'}}>
                <View style={Styles.header}>
                        <TouchableOpacity activeOpacity={1} onPress={()=>{
                             Circle.Drawer.close(open);
                        }} >
                            <Text style={Styles.headerText}>取消</Text>
                        </TouchableOpacity>
                        <Text style={{color:'#000',fontSize:17}}>选择时间</Text>
                        <TouchableOpacity activeOpacity={1} onPress={()=>{
                                this.setTime(time,()=>{
                                    Circle.Drawer.close(open);
                                });
                        }} >
                            <Text style={Styles.headerText}>确定</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.wheel}>
                        <Circle.Wheel
                            style={{width:width,height:160}}
                            itemStyle={{textAlign: 'center'}}
                            items={this.state.timeItem}
                            onChange={(index)=>{
                                time = parseInt(this.state.timeItem[index].replace('s',''));
                            }}
                        />
                    </View>
                    <View style={{height:iphoneXHeight(40),width:width}}></View>
            </View>
        );
    }


    setTime = (value,callBack)=>{
        this.setData('recordTime',value,callBack);
    }

    /**
     * 获取摄像头值
     */
    getDirectionValue = (value)=> {
        console.log(value,'value');
        switch(value) {
            case 'inout':
               return '外+内部摄像头';
               break;
            case 'out':
                return '内部摄像头';
               break;
            default:
               return '外摄像头'
       } 
    }

    setData = (key,value,callBack) =>{
        let data = this.state.content;
        data[key] = value;
        data.cmd = 'Vedio'+','+data.direction+','+data.recordTime;
        this.setState({
            content:data
        },()=>{
            callBack && callBack();
        });  
    }
}

const Styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F7F7F7'
    },
    btn:{
        marginTop:95,
    },
    header:{
        height: 50,
        backgroundColor:'#FCFCFC',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:15,
        paddingRight:15
    },
    headerText:{
        color:Circle.Theme.TextColorPrimary,
        fontSize:18
    },
    wheel:{
        backgroundColor: '#fff', 
        padding: 20, 
        flexDirection: 'row', 
        justifyContent: 'center'
    },
});