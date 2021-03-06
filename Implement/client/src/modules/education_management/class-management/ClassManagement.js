import {
    Button,
    Input,
    message,
    Modal,
    Select,
    Space,
    Table,
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
    /* eslint-disable-next-line */
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
            title: 'Mã lớp',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Môn học',
            dataIndex: 'subjectName',
            key: 'subjectName',
        },
        {
            title: 'Kỳ học',
            dataIndex: 'semester',
            key: 'semester',
        },
        {
            title: 'Mã môn học',
            dataIndex: 'subjectCode',
            key: 'subjectCode',
        },
        {
            title: 'Thời gian',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Địa điểm ',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Số lượng đăng ký ',
            dataIndex: 'numberRegisteredStudent',
            key: 'numberRegisteredStudent',
        },
        {
            title: 'Số lượng sinh viên tối đa',
            dataIndex: 'maximum',
            key: 'maximum',
        },
        {
            title: 'Hành động',
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
                    <a onClick={() => handleOpenRemoveClassModal(record)}>
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

    const [isOpenRemoveClassModal, setIsOpenRemoveClassModal] = useState(false)
    const [currentRemoveClass, setCurrentRemoveClass] = useState(null)
    const handleOpenRemoveClassModal = (record) => {
        setCurrentRemoveClass(record)
        setIsOpenRemoveClassModal(true)
    }
    const handelCancelRemoveClassModal = () => {
        setIsOpenRemoveClassModal(false)
    }

    const handleRemoveClass = () => {
        deleteClassService(currentRemoveClass)
        handelCancelRemoveClassModal()
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
                key: i._id,
                code: i.code,
                subject: i.subjectId,
                subjectName: i.subjectId.name,
                subjectCode: i.subjectId.code,
                time: `Thứ ${i.time.day} - Ca: ${i.time.shift}`,
                position: i.position,
                students: i.students,
                numberRegisteredStudent: i.students.length,
                maximum: i.maximum,
                semester: i.semester,
                defaultTime: i.time,
            }))
            setListClass(_data)
            setListClassInSemester(
                _data.filter(
                    (i) => i?.semester?.toString() === semester?.toString()
                )
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
            message.error('Lấy danh sách sinh viên thất bại!')
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
            message.success('Cập nhật thông tin lớp học thành công!')
        } else {
            message.error('Cập nhật thông tin lớp học thất bại!')
        }
    }

    const deleteClassService = async (data = {}) => {
        const response = await sendRequest({
            url: 'http://localhost:4001/v1/training-department/class',
            method: RequestMethods.DELETE,
            data: data,
        })
        if (response) {
            fetchData()
            message.success('Hủy lớp thành công!')
        } else {
            message.error('Hủy lớp thất bại!')
        }
    }

    const [classCodeKeySearch, setClassCodeKeySearch] = useState('')
    const [subjectCodeKeySearch, setSubjectCodeKeySearch] = useState('')
    const handleChangeSubjectCodeKeySearch = (e) =>
        setSubjectCodeKeySearch(e.target.value)
    const handleChangeClassCodeKeySearch = (e) =>
        setClassCodeKeySearch(e.target.value)

    const handleSubjectCodeSearch = () => {
        let keyCode = new RegExp(`${subjectCodeKeySearch}`, 'gi')
        setListClassInSemester(
            listClass
                .filter((i) => i.semester.toString() === semester?.toString())
                .filter((i) => i.subjectCode.toString().match(keyCode))
        )
    }
    const handleClassCodeSearch = () => {
        let keyCode = new RegExp(`${classCodeKeySearch}`, 'gi')
        setListClassInSemester(
            listClass
                .filter((i) => i.semester.toString() === semester?.toString())
                .filter((i) => i.code.toString().match(keyCode))
        )
    }

    useEffect(() => {
        return (() => {
            fetchTimestamp()
            fetchStudentData()
            fetchData()
        })()
        /* eslint-disable-next-line */
    }, [])

    const [selectRowKey, setSelectRowKey] = useState([])
    const onSelectChange = (selectRowKey) => {
        setSelectRowKey(selectRowKey)
    }
    const rowSelection = {
        selectRowKey,
        onChange: onSelectChange,
    }
    return (
        <React.Fragment>
            <Title level={4} style={{margin: '0 10px 20px 20px'}}>Quản lý lớp học</Title>
            <div
                style={{
                    display: 'flex',
                    margin: '0 20px',
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
                <div>
                    <Button
                        style={{ marginRight: '10px' }}
                        disabled={!selectRowKey.length}
                        type="primary"
                        danger
                    >
                        Xóa các lớp đã chọn
                    </Button>
                    <Button
                        onClick={handleOpenCreateClassModal}
                        disabled={!semester}
                        type="primary"
                    >
                        Thêm lớp
                    </Button>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    margin: '10px 20px'
                }}
            >
                <Search
                    placeholder="Tìm kiếm mã lớp"
                    onSearch={handleClassCodeSearch}
                    onChange={handleChangeClassCodeKeySearch}
                />
                <Search
                    placeholder="Tìm kiếm mã môn học"
                    onSearch={handleSubjectCodeSearch}
                    onChange={handleChangeSubjectCodeKeySearch}
                />
            </div>
            <div style={{margin: '0 20px'}}>
                <Table
                    rowSelection={rowSelection}
                    dataSource={[...listClassInSemester]}
                    columns={columns}
                    bordered
                    title={() => ''}
                    footer={() => ''}
                />
            </div>
            <Modal
                visible={isOpenEditModal}
                onCancel={handleCancelEditModal}
                title="Chỉnh sửa thông tin lớp"
                footer={null}
                width={1000}
            >
                <EditClassForm
                    data={currentEditClassData}
                    handleCancelEditModal={handleCancelEditModal}
                    listClassInSemester={listClassInSemester}
                    updateClassService={updateClassService}
                />
            </Modal>
            <Modal
                visible={isOpenCreateClassModal}
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
                onCancel={handleCancelStudentOfClassModal}
                title="Quản lý sinh viên trong lớp"
                cancelText="Hủy bỏ"
                okButtonProps={{ style: { display: 'none' } }}
                width={1000}
            >
                <ManageStudentOfClass
                    data={currentStudentOfClassData}
                    updateClassService={updateClassService}
                    listAllStudent={listAllStudent.filter(i => i.status === 1)}
                />
            </Modal>
            <Modal
                title="Hủy lớp"
                visible={isOpenRemoveClassModal}
                onCancel={handelCancelRemoveClassModal}
                onOk={handleRemoveClass}
            >
                Xác nhận hủy lớp {currentRemoveClass?.code} (
                {currentRemoveClass?.subjectCode} -{' '}
                {currentRemoveClass?.subjectName})?
            </Modal>
        </React.Fragment>
    )
}
