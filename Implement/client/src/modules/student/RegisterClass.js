import { Tabs } from 'antd'
import React from 'react'
import OpenClass from './OpenClass'

const { TabPane } = Tabs
export default function RegisterClass() {
    return (
        <Tabs defaultActiveKey='1' type='card' style={{margin: '10px'}}>
            <TabPane tab="Open Class" key="1">
                <OpenClass />
            </TabPane>
            <TabPane tab="Register Class" key="2">

            </TabPane>
        </Tabs>
    )
}
