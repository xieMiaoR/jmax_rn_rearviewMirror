import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { Jimi, Applet, Api, Circle } from 'react-native-jimi';
import TabNav from '../components/tabNav';
import menu from '../components/dynamicMenu';
import { shareUrl } from '../api/index';



class Position extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.title,
        }
    };


    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            isPopoverPickerShow: false,//更多的弹出框是否显示
            menuArray: [],//菜单
            moreArray: [],//更多菜单
            error: false,
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Jimi.BaiduPosition onDeviceChange={this._onDeviceChange}
                    ref={(ref) => this.BaiduPosition = ref}
                    onMapClick={() => {
                        this.setState({
                            isPopoverPickerShow: false
                        });

                    }}
                    deviceMarkerOptions={{ image: this.props.deviceIcon }}
                    error={this.state.error}
                >
                    <TouchableOpacity style={Styles.takePhoto} onPress={() => {
                        this.props.navigation.push('MediaContral');
                    }}>
                        <Image source={require('../assets/tabbar/Photobtn.png')} style={{ width: '100%', height: '100%' }}></Image>
                    </TouchableOpacity>

                </Jimi.BaiduPosition>
                {
                    this.state.menuArray.length > 0 ?
                        <TabNav onPress={this._onPress}
                            menuArray={this.state.menuArray}
                            moreArray={this.state.moreArray}
                            isPopoverPickerShow={this.state.isPopoverPickerShow}
                        /> : null
                }

                <Jimi.Share
                    ref={ref => this.share = ref}
                    shareUrl={shareUrl}
                    onFile={() => {
                        this.props.navigation.push('PrivacyAgreement');
                    }}
                />
            </View>
        );
    }

    componentWillMount() {
        this.getInitLocatorInfo();
        //更新地图
        this.viewDidAppear = this.props.navigation.addListener(
            'willFocus',
            (obj) => {
                this.BaiduPosition.mapViewFunc.reloadView && this.BaiduPosition.mapViewFunc.reloadView();
                this.BaiduPosition.upDate && this.BaiduPosition.upDate();
                this.setState({
                    error: false
                });
            }
        );
    }

    componentWillUnmount() { 
        this.viewDidAppear.remove();
    }


    /**
     * 获取菜单
     */
    getMenu = (deviceType) => {
        //获取菜单列表
        menu.forEach((item) => {
            if (item.type.includes(deviceType)) {
                //设置录音时间
                if (item.hasOwnProperty('insTimeArr')) {
                    this.props.setInsTimeArr(item.insTimeArr);
                }
                //设置轨迹查询区间
                if (item.hasOwnProperty('trackQueryTime')) {
                    this.props.setTrackQueryTime(item.trackQueryTime);
                }

                this.setState({
                    menuArray: [...item.menu]
                }, () => {
                    let menuArray = this.state.menuArray;
                    let children = menuArray.filter(elem => elem.action === 'more')[0].children
                    this.setState({
                        moreArray: [...children]
                    });
                })
            }
        });
    }


    _onPress = (item) => {
        //路由跳转包括更多里的子菜单
        if (item.routeName) {
            this.closePopoverPicker();
            this.props.navigation.push(item.routeName);
        } else {
            //导航
            if (item.action === 'navigation') {
                this.navigation();
                this.closePopoverPicker();
            } else if (item.action === 'share') {
                //分享
                this.share.show();
                this.closePopoverPicker();
            } else if (item.action === 'flowCard') {
                //流量卡
                this.goFlowCard();
                this.closePopoverPicker();
            } else if (item.action === 'rvc') {
                this.awakenDvr(() => {
                    this.props.navigation.push('Rvc');
                });
            } else {
                //更多
                this.setState({
                    isPopoverPickerShow: !this.state.isPopoverPickerShow
                });
            }
        }
    }

    /**
     * 关闭更多弹框
     */
    closePopoverPicker = () => {
        this.setState({
            isPopoverPickerShow: false,
            error: true,
        });
    }

    /**
     * 唤醒dvr
     */
    awakenDvr = (callBack) => {
        let loading = Circle.Toast.loading('加载中...');
        let data = {
            cmdCode: 'DVR,ON',
            cmdType: 0,
            cmdId: 700,
            isSync: 0,
            offLineFlag: 0,
            platform: 'app',
            offLineInsType: 'customIns',
            instructSetting: { data: { flag: 0 } }
        };
        console.log(data, '实时视频');

        Applet.jmAjax({
            url: Api.instruction,
            method: 'POST',
            encoding: true,
            encodingType: true,
            data
        }).then((res) => {
            console.log(res,'成功');
            
            callBack && callBack();
            Circle.Toast.remove(loading);
        }).catch((res) => {
            Circle.Toast.remove(loading);
        });
    }


    /**
     *导航
     */
    navigation = () => {
        //导航
        Applet.httpApp('jm_location.navigation', {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            onFail: () => {

            }
        });
    }


    /**
     * 监听定位信息变化
     */
    _onDeviceChange = (info) => {
        console.log(info, 'info');
        this.setState({
            latitude: info.gpsLatitude,
            longitude: info.gpsLongitude,
        });
        this.props.navigation.setParams({
            title: info.deviceName
        });
    }

    /**
     * 获取初始化信息
     */
    getInitLocatorInfo = () => {
        console.log('请求', Api)
        Applet.jmAjax({
            url: Api.initLocatorInfo,
            method: 'POST',
            encoding: true,
            encodingType: true
        }).then((res) => {
            console.log(res, '菜单信息')
            let data = res.data;
            if (data.typeNum) {
                this.getMenu(data.typeNum);
            } else {
                Circle.Toast.message('未检测到设备型号！');
            }
            //设置设备信息
            this.props.setDeviceInfo(res.data);
            //设置图标
            this.props.setDeviceIcon({ deviceIcon: data.deviceIcon, deviceStatus: data.deviceStatus });
        })
        .catch(res => {
            console.log(res,'错误信息')
        })
    }

    /**
     * 流量卡
     */
    goFlowCard = () => {
        Applet.goFlowCard({
            onSuccess: () => {

            },
            onFail: (err) => {
                if (err && err.code == 1) {
                    Circle.Toast.message('支付失败!');
                }
            }
        });
    }
}

export default connect(
    (state) => ({
        deviceIcon: state.storageData.deviceIcon,
        deviceInfo: state.storageData.deviceInfo,
    }),
    (dispatch) => ({
        setDeviceInfo: (params) => {
            dispatch({
                type: 'DEVICE_INFO',
                value: params
            });
        },
        setDeviceIcon: (params) => {
            dispatch({
                type: 'DEVICE_ICON',
                value: params
            });
        },
        setTrackQueryTime: (value) => {
            dispatch({
                type: 'TRACK_QUERY_TIME',
                value: value
            });
        },
        setInsTimeArr: (value) => {
            dispatch({
                type: 'INS_TIME_ARR',
                value: value
            });
        },
    })
)(Position);

const Styles = StyleSheet.create({
    takePhoto: {
        position: 'absolute',
        top: 107,
        right: 20,
        width: 37,
        height: 37,
        backgroundColor: '#fff',
        borderRadius: 37
    }
});