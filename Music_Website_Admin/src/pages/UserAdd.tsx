import React from 'react';
import { Button, Form, Input } from 'antd';
import type { FormInstance } from 'antd/es/form';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const SongAdd: React.FC = () => {
  const formRef = React.useRef<FormInstance>(null);

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    formRef.current?.resetFields();
  };

  return (
    <Form
      {...layout}
      ref={formRef}
      name="control-ref"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="key" label="Key" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
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
      <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" style={{marginLeft: 100}} htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" style={{marginLeft: 16}} onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SongAdd;