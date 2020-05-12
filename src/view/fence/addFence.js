import React, {Component} from 'react';
import {Jimi} from 'react-native-jimi';
import { connect } from 'react-redux';

class AddFence extends Component { 
    constructor(props) {
        super(props);
    }
    

    render() {
        let {params} = this.props.navigation.state;
        return <Jimi.BaiduAddFence
            fenceId={params?params.fenceId:''}
            onSave={()=>{
                this.props.navigation.goBack();
            }}
            deviceMarkerOptions={{image:this.props.deviceIcon}}
        ></Jimi.BaiduAddFence>;
    }
}

export default connect(
    (state) => ({
        deviceIcon: state.storageData.deviceIcon
    })
)(AddFence);