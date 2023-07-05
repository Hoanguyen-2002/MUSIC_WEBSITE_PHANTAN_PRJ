// import React from 'react';
// import { Space, Table, Tag, Input, Button, Modal, Form } from 'antd';
// import type { FormInstance } from 'antd/es/form';
// import type { ColumnsType } from 'antd/es/table';

// interface DataType {
//   name: string;
//   artist: string;
//   block: string;
//   gerne: string;
// }

// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 },
// };

// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 },
// };

// const columns: ColumnsType<DataType> = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name',
//     render: (text) => <a>{text}</a>,
//   },
//   {
//     title: 'Artist',
//     dataIndex: 'artist',
//     key: 'artist',
//     render: (text) => <a>{text}</a>,
//   },
//   {
//     title: 'Block',
//     dataIndex: 'block',
//     key: 'block',
//   },
//   {
//     title: 'Gerne',
//     dataIndex: 'gerne',
//     key: 'gerne',
//   },
// ];

// const data: DataType[] = [
//   {
//     name: 'Smells like teen spirit',
//     artist: 'Nirvana',
//     block: 'rock',
//     gerne: 'grunge',
//   },
//   {
//     name: 'People help the people',
//     artist: 'Birdy',
//     block: 'rock',
//     gerne: 'indie rock',
//   },
//   {
//     name: 'Heather',
//     artist: 'Connan Gray',
//     block: 'pop',
//     gerne: 'folk',
//   },
//   {
//     name: 'Come as you are',
//     artist: 'Nirvana',
//     block: 'rock',
//     gerne: 'grunge',
//   },
// ];

// const UserDetail: React.FC = () => {
//   const formRef = React.useRef<FormInstance>(null);

//   const onFinish = (values: any) => {
//     console.log(values);
//   };

//   const onReset = () => {
//     formRef.current?.resetFields();
//   };

//   return (
//     <>
//       <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
//       Danh sách bài hát yêu thích
//       </div>
//       <Table columns={columns} dataSource={data} />
//       <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
//       Danh sách nghệ sĩ yêu thích
//       </div>
//       <Table columns={columns} dataSource={data} />
//       <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
//       Danh sách playlist yêu thích
//       </div>
//       <Table columns={columns} dataSource={data} />
//     </>
//   );
// };

// export default UserDetail;