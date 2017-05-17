import React from 'react'
import MobileHeader from './mobile_header'
import MobileFooter from './mobile-footer'
import {Tabs} from 'antd'
const TabPane = Tabs.TabPane

export default class MobileIndex extends React.Component {
    render() {
        return (
            <div>
                <MobileHeader/>
                <Tabs>
                    <TabPane tab="头条" key="1">111</TabPane>
                    <TabPane tab="社会" key="2">111</TabPane>
                    <TabPane tab="国内" key="3">111</TabPane>
                    <TabPane tab="国际" key="4">111</TabPane>
                    <TabPane tab="体育" key="5">111</TabPane>
                </Tabs>
                <MobileFooter/>
            </div>
        )
    }
}