import {
    Button,
    Input,
    message,
    Modal,
    Select,
    Space,
    Table,
    Tooltip,
    Typography,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { RequestMethods } from '../../../global/Constants'
import sendRequest from '../../../helpers/requestHelpers'
import CreateClassForm from '../class-management/CreateClassForm'
import EditClassForm from '../class-management/EditClassForm'
import ManageStudentOfClass from '../class-management/ManageStudentOfClass'

const { Search } = Input
const { Text, Title } = Typography
const { Option } = Select

export default function ClassManagement() {
    const [listClass, setListClass] = useState([])
    const [listAllStudent, setListAllStudent] = useState([])
    const [keySeach, setKeySearch] = useState('')
    {
        /* eslint-disable-next-line */
    }
    const [listTimestamp, setListTimeStamp] = useState([])
    const [semester, setSemester] = useState(null)
    const [listClassInSemester, setListClassInSemester] = useState([])
    function handleChangeSemester(value) {
        setSemester(value)
        setListClassInSemester(
            listClass.filter((i) => i.semester.toString() === value.toString())
        )
    }
    const columns = [
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Subject',
            dataIndex: 'subjectName',
            key: 'subjectName',
        },
        {
            title: 'Semester',
            dataIndex: 'semester',
            key: 'semester',
        },
        {
            title: 'Subject Code',
            dataIndex: 'subjectCode',
            key: 'subjectCode',
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Number Registered',
            dataIndex: 'numberRegisteredStudent',
            key: 'numberRegisteredStudent',
        },
        {
            title: 'Maximum quantity',
            dataIndex: 'maximum',
            key: 'maximum',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => (
                <Space size="middle">
                    {/* eslint-disable-next-line */}
                    <a onClick={() => handleOpenStudentOfClassModal(record)}>
                        <Text type="success">
                            <i className="fas fa-user"></i>
                        </Text>
                    </a>
                    {/* eslint-disable-next-line */}
                    <a onClick={() => handleEditClass(record)}>
                        <Text type="warning">
                            <i className="fas fa-edit"></i>
                        </Text>
                    </a>
                    {/* eslint-disable-next-line */}
                    <a onClick={() => handleRemoveClass(record._id)}>
                        <Text type="danger">
                            <i className="fas fa-trash"></i>
                        </Text>
                    </a>
                </Space>
            ),
        },
    ]
    const [isOpenCreateClassModal, setIsOpenCreateClassModal] = useState(false)
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const [isOpenStudentOfClassModal, setIsOpenStudentOfClassModal] =
        useState(false)
    // const [isConfirmDeleteModal, setIsConfirmDeleteModal] = useState(false)

    const [currentEditClassData, setCurrentEditClassData] = useState({})
    const [currentStudentOfClassData, setCurrentStudentOfClassData] = useState(
        {}
    )

    const handleOpenCreateClassModal = () => {
        setIsOpenCreateClassModal(true)
    }

    const handleCancelCreateClassModal = () => {
        setIsOpenCreateClassModal(false)
    }

    const handleEditClass = (record) => {
        setIsOpenEditModal(true)
        setCurrentEditClassData(record)
    }

    const handleCancelEditModal = () => setIsOpenEditModal(false)

    const handleOpenStudentOfClassModal = (record) => {
        setIsOpenStudentOfClassModal(true)
        setCurrentStudentOfClassData(record)
    }
    const handleCancelStudentOfClassModal = () => {
        setIsOpenStudentOfClassModal(false)
    }

    const handleRemoveClass = (id) => {}

    const convertDate = (data) => {
        switch (data) {
            case 2: {
                return 'Monday'
            }
            case 3: {
                return 'Tuesday'
            }
            case 4: {
                return 'Wednesday'
            }
            case 5: {
                return 'Thursday'
            }
            case 6: {
                return 'Friday'
            }
            default:
                break
        }
    }

    const fetchData = async (data = {}) => {
        const response = await sendRequest({
            url: 'http://localhost:4001/v1/training-department/class',
            method: RequestMethods.GET,
            data: data,
        })
        if (response) {
            const _data = response.data.content.map((i) => ({
                _id: i._id,
                key: i.code,
                code: i.code,
                subject: i.subjectId,
                subjectName: i.subjectId.name,
                subjectCode: i.subjectId.code,
                time: `${convertDate(i.time.day)} - Shift: ${i.time.shift}`,
                position: i.position,
                students: i.students,
                numberRegisteredStudent: i.students.length,
                maximum: i.maximum,
                semester: i.semester,
                defaultTime: i.time,
            }))
            setListClass(_data)
            setListClassInSemester(
                _data.filter((i) => i.semester.toString() == semester)
            )
        } else {
            message.error('Get open class failed!')
        }
    }
    const fetchTimestamp = async (data = {}) => {
        const response = await sendRequest({
            url: 'http://localhost:4001/v1/training-department/timestamp',
            method: RequestMethods.GET,
            data: data,
        })
        if (response) {
            const content = response.data.content.sort(
                (a, b) => b.semester - a.semester
            )
            setListTimeStamp(
                //set list sortable semester
                content
            )
        } else {
            message.error('Lấy danh sách các kỳ thất bại!')
        }
    }

    const fetchStudentData = async (data = {}) => {
        const response = await sendRequest({
            url: 'http://localhost:4001/v1/training-department/list-student',
            method: RequestMethods.GET,
            data: data,
        })
        if (response) {
            setListAllStudent(response.data.content)
        } else {
            message.error('Get list student failed!')
        }
    }

    const updateClassService = async (data = {}) => {
        const response = await sendRequest({
            url: 'http://localhost:4001/v1/training-department/class',
            method: RequestMethods.PUT,
            data: data,
        })
        if (response) {
            fetchData()
            message.success('Update data success!')
        } else {
            message.error('Update data failed!')
        }
    }

    const handleRefreshData = () => {
        fetchData()
    }

    const handleChangeKeySearch = (e) => setKeySearch(e.target.value)

    const handleSearch = () => {
        fetchData({
            codeKey: keySeach,
        })
    }

    useEffect(() => {
        return (() => {
            fetchTimestamp()
            fetchStudentData()
            fetchData()
        })()
        {
            /* eslint-disable-next-line */
        }
    }, [])

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    padding: '10px',
                    justifyContent: 'space-between',
                }}
            >
                <div>
                    <Title level={5}>Chọn kỳ học</Title>
                    <Select
                        style={{ width: 150 }}
                        onChange={handleChangeSemester}
                    >
                        {listTimestamp.map((i) => (
                            <Option key={i._id} value={i.semester}>
                                {i.semester}
                            </Option>
                        ))}
                    </Select>
                </div>
                <Button
                    onClick={handleOpenCreateClassModal}
                    disabled={!semester}
                >
                    Thêm lớp
                </Button>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    padding: '10px',
                }}
            >
                <Search
                    placeholder="Seacrh Subject Code"
                    onSearch={handleSearch}
                    onChange={handleChangeKeySearch}
                />
                <Tooltip title="Refresh">
                    <Button onClick={handleRefreshData}>
                        <i className="fas fa-sync-alt"></i>
                    </Button>
                </Tooltip>
            </div>
            <Table
                dataSource={[...listClassInSemester]}
                columns={columns}
                bordered
                title={() => ''}
                footer={() => ''}
            />
            <Modal
                visible={isOpenEditModal}
                // onOk={handleSubmit}
                onCancel={handleCancelEditModal}
                title="Edit Class"
                okText="Change"
                cancelText="Cancel"
                footer={null}
                width={1000}
            >
                <EditClassForm
                    data={currentEditClassData}
                    handleCancelEditModal={handleCancelEditModal}
                    updateClassService={updateClassService}
                />
            </Modal>
            <Modal
                visible={isOpenCreateClassModal}
                // onOk={handleSubmit}
                onCancel={handleCancelCreateClassModal}
                title="Tạo mới lớp học"
                footer={null}
                width={1000}
            >
                <CreateClassForm
                    semester={semester}
                    listClassInSemester={listClassInSemester}
                    handleCancelCreateClassModal={handleCancelCreateClassModal}
                    refreshData={fetchData}
                />
            </Modal>
            <Modal
                visible={isOpenStudentOfClassModal}
                // onOk={handleSubmit}
                onCancel={handleCancelStudentOfClassModal}
                title="Student Management"
                okText="Update"
                cancelText="Cancel"
                okButtonProps={{ style: { display: 'none' } }}
                width={1000}
            >
                <ManageStudentOfClass
                    data={currentStudentOfClassData}
                    updateClassService={updateClassService}
                    listAllStudent={listAllStudent}
                />
            </Modal>
        </>
    )
}
