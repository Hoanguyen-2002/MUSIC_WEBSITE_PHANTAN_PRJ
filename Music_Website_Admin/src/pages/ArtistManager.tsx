import React, { useState } from 'react';
import { Space, Table, Tag, Input, Button, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  name: string;
  access: string;
}

const { Search } = Input;
const { confirm } = Modal;

const columns: ColumnsType<DataType> = [
  {
    title: 'Key',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Access',
    dataIndex: 'access',
    key: 'access',
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
    access: '1',
  },
  {
    key: '2',
    name: 'Tran Quang Thang',
    access: '1',
  },
  {
    key: '3',
    name: 'Nguyen Viet Hoa',
    access: '1',
  },
  {
    key: '4',
    name: 'Bui Trung Kien',
    access: '1',
  },
];

const UserManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (record: DataType) => {
    // Open the edit form for the corresponding record
    console.log(`Editing record with key ${record.key}`);
  };

  const handleDelete = (key: string) => {
    // Delete the corresponding record
    console.log(`Deleting record with key ${key}`);
  };

  const showDeleteConfirm = (record: DataType) => {
    confirm({
      title: `Are you sure you want to delete ${record.name}?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDelete(record.key);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const filteredData = data.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ||  item.access.toLowerCase().includes(searchTerm.toLowerCase())
      ||  item.key.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <>
      <Search placeholder="Search Singer" onChange={handleSearch} style={{ marginBottom: 16, width: '50%' }} />
      <Table columns={columns} dataSource={filteredData} />
    </>
  );
};

export default UserManager;