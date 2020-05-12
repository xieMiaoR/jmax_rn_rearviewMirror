import React,{Component} from 'react';
import {View} from 'react-native';
import {Jimi} from 'react-native-jimi';

export default  class FenceList extends Component {
    render() {
        return (
            <View style={{ flex: 1}}>
                <Jimi.FenceList  onAddEditFence={(data)=>{
                    let obj = data ? {fenceId:data.fenceId} : null;
                    this.props.navigation.push('AddFence',obj);
                }}/>
            </View>
        );
    }
}