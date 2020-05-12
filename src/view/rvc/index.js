/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2020-04-11 09:17:33
 * @LastEditors: liujinyuan
 * @LastEditTime: 2020-04-11 11:47:03
 */

import React, { Component } from 'react';
import { View} from 'react-native';
import { connect } from 'react-redux';
import {Jimi} from 'react-native-jimi';

class Rvc extends Component {
    static navigationOptions = ({ navigation, screenProps }) => (
        {
            title: 'RVC',
            header:navigation.state.params ? navigation.state.params.param :undefined,
        }
    );
    constructor(props){
        super(props);
        this.params = {
            key:'69dcc204c82e4861a7a763c6bb3f4b96',
            secret:'fcb0f7e8ec9e4ed89d632240f4e1b8b9',
            imei:this.props.deviceInfo.encoding
        };
    }

    render(){
        return (
            <View style={{flex:1}}>
                <Jimi.RVC code={'DVR,ON'} params={this.params} onReversal={(data) => this.onReversal(data)} />
            </View>
        );
    }
    
    onReversal = (data) => {
        this.props.navigation.setParams({ param: data ? null : undefined});
    }
}

export default connect(
    (state) => ({
        deviceInfo: state.storageData.deviceInfo,
    })
)(Rvc);