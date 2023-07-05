import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Modal, Form } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import CRUDService from '@/services/CRUDService';

interface DataType {
  name: string;
  email: string;
  password: string;
  access: string;
  detail: string;
  phone: string;
}

const { Search } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const handleNameClick = (record: DataType) => {
  console.log(`Name clicked for record with key ${record.name}`);
  window.location.href = `http://localhost:8000/user/user-activity/${record._id}`;
};

const UserManager: React.FC = () => {
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState("");
  const [dataUser, setDataUser] = useState([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };


  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async() => {
    try {
      const values = await form.validateFields();
      console.log(values);
      await CRUDService.saveService('http://localhost:3000/user/register', values);
      getUserInfo();
    } catch (error) {
      console.error(error);
    }
    handleCancel();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getUserInfo = async () => {
    try {
      const data = await CRUDService.getAllService('http://localhost:3000/user/get-all');
      console.log("data",data)
      setDataUser(data.accountModels);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <Button type="link" onClick={() => handleNameClick(record)}>
          {record.name}
        </Button>
      )
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
  ];

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <Search placeholder="Search User" onChange={handleSearch} style={{ marginBottom: 16, width: '50%' }} />
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
      <Form.Item name="email" label="Email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="access" label="Access" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="detail" label="Detail" rules={[{ required: true }]}>
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
      <Table columns={columns} dataSource={dataUser} />
    </>
  );
};

export default UserManager;