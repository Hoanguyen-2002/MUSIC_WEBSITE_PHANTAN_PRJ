import React, { useState } from 'react';
import { Space, Table, Tag, Input, Button, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  name: string;
  artist: string;
  block: string;
  gerne: string;
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

const SongManager: React.FC = () => {
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
      ||  item.key.toLowerCase().includes(searchTerm.toLowerCase())
      ||  item.artist.toLowerCase().includes(searchTerm.toLowerCase())
      ||  item.block.toLowerCase().includes(searchTerm.toLowerCase())
      ||  item.gerne.toLowerCase().includes(searchTerm.toLowerCase()))
  });

  return (
    <>
      <Search placeholder="Search Song" onChange={handleSearch} style={{ marginBottom: 16, width: '50%' }} />
      <Table columns={columns} dataSource={filteredData} />
    </>
  );
};

export default SongManager;