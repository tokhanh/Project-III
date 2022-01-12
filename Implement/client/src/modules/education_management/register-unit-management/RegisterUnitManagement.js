import { Tabs } from 'antd'
import React from 'react'
import ListRegisterUnitOfStudy from './ListRegisterUnitOfStudy'
import StudyPlan from './StudyPlan'

const { TabPane } = Tabs

export default function RegisterUnitManagement() {
    return (
        <Tabs type="card">
            <TabPane tab="Kế hoạch học tập" key="1">
                <StudyPlan />
            </TabPane>
            <TabPane tab="Danh sách đăng ký học phần" key="2">
                <ListRegisterUnitOfStudy />
            </TabPane>
        </Tabs>
    )
}
