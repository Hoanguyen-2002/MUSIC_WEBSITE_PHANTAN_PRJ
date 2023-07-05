import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Input, Button, Modal, Form, message } from 'antd';
import CRUDService from '@/services/CRUDService';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

const EditSong = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOk = async() => {
        try {
          const values = await form.validateFields();
          console.log(values);
          await CRUDService.updateService('http://localhost:3000/song/update-song', values);
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
    </Form>
      </Modal>
    </>
  );
};

export default EditSong;