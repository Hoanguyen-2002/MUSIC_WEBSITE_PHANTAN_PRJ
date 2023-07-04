import React from 'react';
import { Space, Table, Tag, Input, Button, Modal, Form } from 'antd';
import type { FormInstance } from 'antd/es/form';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

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
    title: 'Artist',
    dataIndex: 'artist',
    key: 'artist',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Block',
    dataIndex: 'block',
    key: 'block',
  },
  {
    title: 'Gerne',
    dataIndex: 'gerne',
    key: 'gerne',
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
    name: 'Smells like teen spirit',
    artist: 'Nirvana',
    block: 'rock',
    gerne: 'grunge',
  },
  {
    key: '2',
    name: 'People help the people',
    artist: 'Birdy',
    block: 'rock',
    gerne: 'indie rock',
  },
  {
    key: '3',
    name: 'Heather',
    artist: 'Connan Gray',
    block: 'pop',
    gerne: 'folk',
  },
  {
    key: '4',
    name: 'Come as you are',
    artist: 'Nirvana',
    block: 'rock',
    gerne: 'grunge',
  },
];

const UserInfo: React.FC = () => {
  const formRef = React.useRef<FormInstance>(null);

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    formRef.current?.resetFields();
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
      Bang 1
      </div>
      <Table columns={columns} dataSource={data} />
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
      Bang 2
      </div>
      <Table columns={columns} dataSource={data} />
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
      Bang 3
      </div>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default UserInfo;