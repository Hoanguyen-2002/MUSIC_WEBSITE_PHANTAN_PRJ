import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Input, Button, Modal, Form, message } from 'antd';
import Icon, { ExclamationCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import CRUDService from '@/services/CRUDService';

interface DataType {
  name: string;
  link: string;
  cover: string;
  thumbnail: string;
}

const { Search } = Input;
const { confirm } = Modal;

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

const ArtistManager: React.FC = () => {
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState("");
  const [dataArtist, setDataArtist] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (id: String) => {
    confirm({
      title: `Bạn muốn xóa ca sĩ này?`,
      icon: <ExclamationCircleOutlined />,
      cancelText: 'Hủy',
      okText: 'Xóa',
      okType: 'danger',
      onOk() {
        fetch(`http://localhost:3000/artist/delete/${id}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Lỗi khi xóa');
            }
            message.success('Xóa thành công');
            getArtistInfo();
          })
          .catch((error) => {
            message.error(error.message);
          });
      },
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async() => {
    try {
      const values = await form.validateFields();
      console.log(values);
      await CRUDService.saveService('http://localhost:3000/artist/add-artist', values);
      getArtistInfo();
    } catch (error) {
      console.error(error);
    }
    handleCancel();
  };

  const getArtistInfo = async () => {
    try {
      const data = await CRUDService.getAllService('http://localhost:3000/artist/get-all');
      console.log("data",data)
      setDataArtist(data.artistModels);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArtistInfo();
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      render: (text) => <a href={text}>Chi tiết</a>,
    },
    {
      title: 'Cover',
      dataIndex: 'cover',
      key: 'cover',
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (text) => <a href={text}>link</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="primary" danger onClick={() => handleDelete(record._id)}>Delete</Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <Search placeholder="Search Artist" onChange={handleSearch} style={{ marginBottom: 16, width: '50%' }} />
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
      <Form.Item name="link" label="Link" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="cover" label="Cover" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="thumbnail" label="Thumbnail" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Form>
      </Modal>
      </div>
      <Table columns={columns} dataSource={dataArtist} />
    </>
  );
};

export default ArtistManager;