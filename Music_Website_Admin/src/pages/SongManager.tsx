import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  name: string;
  email: string;
  password: string;
  access: string;
  phone: string;
}

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

const UserManager: React.FC = () => <Table columns={columns} dataSource={data} />;

export default UserManager;