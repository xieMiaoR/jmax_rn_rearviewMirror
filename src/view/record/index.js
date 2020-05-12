
import React,{Component} from 'react';
import {View} from 'react-native';
import { connect } from 'react-redux';
import {Jimi} from 'react-native-jimi';

class Record extends Component {
    render() {
        return (
            <View style={{ flex: 1}}>
                <Jimi.Record
                    insTimeArr={this.props.insTimeArr}
                ></Jimi.Record>
            </View>
        );
    }
    
}



export default connect(
    (state) => ({
        insTimeArr: state.storageData.insTimeArr,
    })
)(Record);

