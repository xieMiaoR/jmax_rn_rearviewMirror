
import React, { Component } from 'react';
import { View,StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { SegmentedBar } from 'teaset';
import Alarm from './alarm/Alarm';
import Instruct from './instruct/Instruct';

class SetUp extends Component { 

    constructor(props){
        super(props);
        this.state = {
            activeIndex:0,
        }
    }


    render(){
        return <View style={Styles.container}>
            <View style={Styles.tab}>
                <View style={Styles.tabList}>
                    <SegmentedBar indicatorType={'customWidth'} indicatorWidth={26} indicatorLineColor={'#3479F6'} onChange={this._onChange} >
                        <SegmentedBar.Item title='指令设置' titleStyle={Styles.titleStyle} activeTitleStyle={Styles.activeTitleStyle} />
                        <SegmentedBar.Item title='报警通知' titleStyle={Styles.titleStyle} activeTitleStyle={Styles.activeTitleStyle}/>
                    </SegmentedBar>
                </View>
            </View>
            <View style={Styles.main}>
                   <Alarm  style={{display:this.state.activeIndex?'flex':'none'}} deviceType={this.props.deviceInfo.typeNum}  />
                   <Instruct style={{display:this.state.activeIndex?'none':'flex'}}
                   deviceType={this.props.deviceInfo.typeNum}
                   onArrowButton={(params)=>{
                        this.props.navigation.navigate('Instructions',params);
                   }}
                   onSos={()=>{
                    this.props.navigation.navigate('SosAlarm');
                   }}
                   />
            </View>
        </View> 
    }

    _onChange = (index)=>{
        this.setState({
            activeIndex:index
        })
    }
}

export default connect(
    (state) => ({
        deviceInfo: state.storageData.deviceInfo
    }),
)(SetUp);


const Styles = StyleSheet.create({
    container:{
        flex:1,   
        backgroundColor:'#F7F7F7'
    },
    main:{
        flex:1,
    },
    tab:{
        backgroundColor:'#fff', 
        alignItems:'center'
    },
    tabList:{
        width:180,
    },
    titleStyle:{
        fontSize:14,
        color:'#4D4D4D',
    },
    activeTitleStyle:{
        color:'#3479F6',
        fontSize:14
    },
});


