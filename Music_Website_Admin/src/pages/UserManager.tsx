import React, { useState } from 'react';
import { Space, Table, Tag, Input, Button, Modal, Form } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  name: string;
  email: string;
  password: string;
  access: string;
  phone: string;
}

const { Search } = Input;
const { confirm } = Modal;

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Password',
    dataIndex: 'password',
    key: 'password',
  },
  {
    title: 'Access',
    dataIndex: 'access',
    key: 'access',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
        <Button type="primary" danger onClick={() => showDeleteConfirm(record)}>Delete</Button>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'Vu Duc Duy',
    email: 'duy.vd207668@sis.hust.edu.vn',
    password: '123',
    access: '1',
    phone: '0912345123'
  },
  {
    key: '2',
    name: 'Tran Quang Thang',
    email: 'thang.tq207701@sis.hust.edu.vn',
    password: '123',
    access: '1',
    phone: '0965287395'
  },
  {
    key: '3',
    name: 'Nguyen Viet Hoa',
    email: 'hoa.nv207673@sis.hust.edu.vn',
    password: '123',
    access: '1',
    phone: '0917822851',
  },
  {
    key: '4',
    name: 'Bui Trung Kien',
    email: 'kien.bt207710@sis.hust.edu.vn',
    password: '123',
    access: '1',
    phone: '0911198640',
  },
];

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const UserManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (record: DataType) => {
    // Open the edit form for the corresponding record
    //console.log(`Editing record with key ${record.key}`);
  };

  const handleDelete = (key: string) => {
    // Delete the corresponding record
    //console.log(`Deleting record with key ${key}`);
  };

  const showDeleteConfirm = (record: DataType) => {
    // confirm({
    //   title: `Are you sure you want to delete ${record.name}?`,
    //   icon: <ExclamationCircleOutlined />,
    //   okText: 'Yes',
    //   okType: 'danger',
    //   cancelText: 'No',
    //   onOk() {
    //     handleDelete(record.key);
    //   },
    //   onCancel() {
    //     console.log('Cancel');
    //   },
    // });
  };

  const filteredData = data.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ||  item.key.toLowerCase().includes(searchTerm.toLowerCase())
      ||  item.email.toLowerCase().includes(searchTerm.toLowerCase())
      ||  item.password.toLowerCase().includes(searchTerm.toLowerCase())
      ||  item.access.toLowerCase().includes(searchTerm.toLowerCase())
      ||  item.phone.toLowerCase().includes(searchTerm.toLowerCase()))
  });

  const handleAdd = () => {
    // Implement logic to open modal or form for creating a new song
    console.log("Add button clicked");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <Search placeholder="Search User" onChange={handleSearch} style={{ marginBottom: 16, width: '50%' }} />
      <Button type="primary" onClick={showModal} style={{ marginLeft: 100, marginBottom: 16 }}>
        Add
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form
      {...layout}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="key" label="Key" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="access" label="Access" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
      </Form.Item>
    </Form>
      </Modal>
      </div>
      <Table columns={columns} dataSource={filteredData} />
    </>
  );
};

export default UserManager;