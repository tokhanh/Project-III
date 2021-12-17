import { Tabs } from 'antd'
import React from 'react'
import OpenClassTab from './OpenClassTab'
import RegisterClassTab from './RegisterClassTab'

const { TabPane } = Tabs
export default function Class() {
    return (
        <Tabs defaultActiveKey="1" type="card" style={{ margin: '10px' }}>
            <TabPane tab="Open Class" key="1">
                <OpenClassTab />
            </TabPane>
            <TabPane tab="Register Class" key="2">
                <RegisterClassTab />
            </TabPane>
        </Tabs>
    )
}
