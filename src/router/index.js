import React from 'react';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import index from '../view/index';
import Trace from '../view/trace';
import Track from '../view/track';
import Fence from '../view/fence';
import Record from '../view/record';
import AddFence from '../view/fence/addFence';
// import FlowCard from '../view/flowCard';
import Rvc from '../view/rvc';
import Photo from '../view/photo';
import PhotoDeatil from '../view/photo/photoDeatil';
import PhotoList from '../view/photo/photoList';
import PrivacyAgreement from '../view/privacyAgreement';
import SetUp from '../view/setUp';
import Instructions from '../view/setUp/instruct/Instructions';
import Details from '../view/details';
import IconLibrary from '../view/details/IconLibrary';
import MediaContral from '../view/photo/MediaContral';
import SosAlarm from '../view/setUp/instruct/sosAlarm';
import MediaSyn from '../view/mediaSync/MediaSyn';
import MediaDetails from '../view/mediaSync/MediaDetails';
const getOptions = (title) => {
    let headerTitle = {};
    if(title){
        headerTitle = {
            title:title
        };
    }
    return {
        ...headerTitle,
        headerBackTitle:null,
        headerStyle:{
            backgroundColor:'#fff',
            // height:44
        },
        headerTintColor:'#232323',
        headerTitleStyle:{
            fontSize:16,
            fontWeight: 'bold',
        },
        gesturesEnabled:false
    };
};

const AppNavigator = createStackNavigator({
    index:{
        screen:index,
        params: {
            title: ''
        },
        navigationOptions:getOptions()
    },
    Trace:{
        screen:Trace,
        navigationOptions:getOptions('追踪')
    },
    Track:{
        screen:Track,
        navigationOptions:getOptions('轨迹')
    },   
    Fence:{
        screen:Fence,
        navigationOptions:getOptions('围栏')
    },
    Record:{
        screen:Record,
        navigationOptions:getOptions('录音')
    },
    // FlowCard:{
    //     screen:FlowCard,
    //     navigationOptions:getOptions('流量卡')
    // },
    Rvc:{
        screen:Rvc,
        navigationOptions:getOptions()
    },
    Photo:{
        screen:Photo,
        navigationOptions:getOptions('相册')
    },
    PhotoDeatil:{
        screen:PhotoDeatil,
        navigationOptions:getOptions()
    },
    PhotoList:{
        screen:PhotoList,
        navigationOptions:getOptions()
    },   
    Instructions:{
        screen:Instructions,
        navigationOptions:getOptions()
    },   
    PrivacyAgreement:{
        screen:PrivacyAgreement,
        navigationOptions:getOptions('隐私协议')
    },  
    Details:{
        screen:Details,
        navigationOptions:getOptions('详情')
    }, 
    IconLibrary:{
        screen:IconLibrary,
        navigationOptions:getOptions('图标库')
    }, 
    MediaContral:{
        screen:MediaContral,
        navigationOptions:getOptions('远程拍摄')
    }, 
    SosAlarm:{
        screen:SosAlarm,
        navigationOptions:getOptions('SOS告警')
    }, 
    MediaSyn:{
        screen:MediaSyn,
        navigationOptions:getOptions('媒体同步')   
    },
    MediaDetails:{
        screen:MediaDetails,
        navigationOptions:getOptions('媒体同步')   
    },
    SetUp:{
        screen:SetUp,
        navigationOptions: ({ navigation }) => (
            {
                ...getOptions('设置'),
                headerStyle:{
                    backgroundColor:'#fff',
                    borderBottomColor:'#fff',
                    elevation:0
                },
            }),
    },  
    AddFence:{
        screen:AddFence,
        navigationOptions: ({ navigation }) => (
            {
                ...getOptions('添加围栏'),
                headerStyle:{
                    backgroundColor:'#fff',
                    borderBottomColor:'#fff',
                    elevation:0
                },
            }),
    }
});

export const Root = createAppContainer(AppNavigator);