import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Input, Button, Modal, Form, message } from 'antd';
import Icon, { ExclamationCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import CRUDService from '@/services/CRUDService';
import EditSong from './EditSong';

interface DataType {
  name: string;
  artist: string;
  block: string;
  gerne: string;
}

const { Search } = Input;
const { confirm } = Modal;


const SongManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [form] = Form.useForm();
  const [dataSong, setDataSong] = useState([]);

  const handleEdit = (record: DataType) => {
    // Open the edit form for the corresponding record
    console.log(`Editing record with key`);
  };
  
  
  const handleDelete = (id: String) => {
    confirm({
      title: `Bạn muốn xóa bài hát này?`,
      icon: <ExclamationCircleOutlined />,
      cancelText: 'Hủy',
      okText: 'Xóa',
      okType: 'danger',
      onOk() {
        fetch(`http://localhost:3000/song/delete/${id}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Lỗi khi xóa');
            }
            message.success('Xóa thành công');
            getSongInfo();
          })
          .catch((error) => {
            message.error(error.message);
          });
      },
    });
  };
  
  const showEdit = () => {
    return (<EditSong/>);
  }
  const columns: ColumnsType<DataType> = [
    {
      title: 'id',
      dataIndex: '_id',
      key: 'id',
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
      title: 'Link',
      dataIndex: 'block',
      key: 'block',
      render: (text) => <a href={text}>link</a>,
    },
    {
      title: 'Gerne',
      dataIndex: 'genre',
      key: 'genre',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showEdit()}>Edit</Button>
          <Button type="primary" danger onClick={() => handleDelete(record._id)}>Delete</Button>
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
      getSongInfo();
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
      <Modal title="Thêm bài hát" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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