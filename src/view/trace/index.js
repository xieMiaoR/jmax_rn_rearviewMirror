import React,{Component} from 'react';
import {View} from 'react-native';
import {Jimi} from 'react-native-jimi';
import { connect } from 'react-redux';
import { shareUrl } from '../../api/index';

class Trace extends Component {
    render() {
        return (
            <View style={{ flex: 1}}>
                <Jimi.BaiduTrace
                    shareUrl={shareUrl}
                    onFile={()=>{
                        this.props.navigation.push('PrivacyAgreement');
                    }}
                    deviceMarkerOptions={{image:this.props.deviceIcon}}
                ></Jimi.BaiduTrace>
            </View>
        );
    }
}

export default connect(
    (state) => ({
        deviceIcon: state.storageData.deviceIcon
    })
)(Trace);