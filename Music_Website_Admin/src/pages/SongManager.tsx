import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Input, Button, Modal, Form } from 'antd';
import Icon, { ExclamationCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import CRUDService from '@/services/CRUDService';

interface DataType {
  name: string;
  artist: string;
  block: string;
  gerne: string;
}

const { Search } = Input;
const { confirm } = Modal;

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

const columns: ColumnsType<DataType> = [
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

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const handleEdit = (record: DataType) => {
  // Open the edit form for the corresponding record
  console.log(`Editing record with key ${record.name}`);
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
      handleDelete(record.name);
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

const SongManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [form] = Form.useForm();
  const [dataSong, setDataSong] = useState([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAdd = () => {
    // Implement logic to open modal or form for creating a new song
    console.log("Add button clicked");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const getSongInfo = async () => {
    try {
      const data = await CRUDService.getAllService('http://localhost:3000/song/get-all');
      console.log("data",data)
      setDataSong(data.songModels);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSongInfo();
  }, []);

  const handleOk = async() => {
    try {
      const values = await form.validateFields();
      console.log(values);
      await CRUDService.saveService('http://localhost:3000/song/add-song', values);
    } catch (error) {
      console.error(error);
    }
    handleCancel();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <Search placeholder="Search Song" onChange={handleSearch} style={{ marginBottom: 16, width: '50%' }} />
      <Button type="primary" onClick={showModal} style={{ marginLeft: 100, marginBottom: 16 }}>
        ADD
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form form={form}
      {...layout}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="artist" label="Artist" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="block" label="Block" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="genre" label="Gerne" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
      </Form.Item>
    </Form>
      </Modal>
      </div>
      <Table dataSource={dataSong} columns={columns} />
    </>
  );
};

export default SongManager;