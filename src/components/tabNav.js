import React,{Component}from 'react';
import {View,Text,Image,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import {iphoneXHeight} from '../libs/utils';
import menu from './dynamicMenu';
const {width} = Dimensions.get('window');

export default  class TabNav extends Component {
    constructor(props){
        super(props);

    }

    render(){
        return <View style={{width:width,height:iphoneXHeight(74)}}>
            <View style={style.tab}>
                <View style={style.tabContent}>
                    {
                        this.props.menuArray.map((item,index)=>{
                            return <TouchableOpacity  style={style.btn} key={'menu'+index} onPress={()=>{
                                this._onPress(item);
                            }}  >
                                <Image source={item.icon}></Image>
                                <Text style={style.text}>{item.name}</Text>
                            </TouchableOpacity>;
                        })
                    }
                </View>
                {/* 兼容iphoneX */}
                <View style={style.sapce}></View>
            </View>
            {
                this.props.isPopoverPickerShow ? 
                    <View style={style.popoverPicker}>
                        <View >
                            {
                                this.props.moreArray.map((item,index)=>{
                                    return <TouchableOpacity 
                                        style={[style.popoverPickerBtn,{borderBottomWidth:index === this.props.moreArray.length-1?0:1}]} activeOpacity={1} 
                                        key={'more'+index}
                                        onPress={()=>{
                                            this._onPress(item); 
                                        }}
                                    >
                                        <Image style={style.popoverPickerBtnIcon} source={item.icon}></Image>
                                        <Text style={style.popoverPickerBtnText}>{item.name}</Text>
                                    </TouchableOpacity>;
                                })
                            }
                        </View>
                        <Image style={style.triangle} source={require('../assets/tabbar/position_bubble_shadow.png')}></Image>
                    </View>:null}
        </View>;
    }

    _onPress = (item)=>{
        this.props.onPress && this.props.onPress(item);
    }
}





const style = StyleSheet.create({
    tab:{
        position:'absolute',
        width:width,
        height:iphoneXHeight(74),
        bottom:0,
        backgroundColor:'#fff',
        zIndex:9999
    },
    tabContent:{
        flexDirection:'row',
        width:'100%',
        height:74, 
        alignItems:'center'
    },
    sapce:{
        width:'100%',
        height:iphoneXHeight(0),
    },
    btn:{
        flex:1,
        alignItems:'center',
    },
    text:{
        marginTop:5,
        fontSize:9
    },
    popoverPicker:{
        position:'absolute',
        width:108,
        right:10,
        bottom:iphoneXHeight(95),
        backgroundColor:'#fff',
        borderRadius:6,
        justifyContent:'center',
        zIndex:10000
    },
    triangle:{
        position:'absolute',
        bottom:-14,
        right:13,
    },
    popoverPickerBtn:{
        flexDirection:'row',
        marginLeft:12,
        marginRight:12,
        paddingTop:12,
        paddingBottom:12,
        borderBottomColor:'#e6e6e6',
        alignItems:'center'
    },
    popoverPickerBtnIcon:{
        width:16,
        height:16,
        marginRight:10,
    },
    popoverPickerBtnText:{
        fontSize:12,
    }
});