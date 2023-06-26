import React, { useState } from 'react';
import { Space, Table, Tag, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  name: string;
  access: string;
}

const { Search } = Input;

const columns: ColumnsType<DataType> = [
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
        <a>Invite {record.name}</a>
        <a>Delete</a>
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

  const filteredData = data.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <Search placeholder="Search User" onChange={handleSearch} style={{ marginBottom: 16 }} />
      <Table columns={columns} dataSource={filteredData} />
    </>
  );
};

export default UserManager;