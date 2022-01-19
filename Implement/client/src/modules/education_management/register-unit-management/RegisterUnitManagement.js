import { Tabs } from 'antd'
import Title from 'antd/lib/typography/Title'
import React from 'react'
import ListRegisterUnitOfStudy from './ListRegisterUnitOfStudy'
import StudyPlan from './StudyPlan'

const { TabPane } = Tabs

export default function RegisterUnitManagement() {
    return (
        <React.Fragment>
            <Title level={4} style={{margin: '0 20px 10px 10px'}}>Quản lý kế hoạch học tập</Title>
            <Tabs type="card">
                <TabPane tab="Kế hoạch học tập" key="1">
                    <StudyPlan />
                </TabPane>
                <TabPane tab="Danh sách đăng ký học phần" key="2">
                    <ListRegisterUnitOfStudy />
                </TabPane>
            </Tabs>
        </React.Fragment>
    )
}
