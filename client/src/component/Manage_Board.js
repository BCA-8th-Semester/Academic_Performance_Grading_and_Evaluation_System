import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Dropdown, Menu, Button } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Modal, Select, Input, Form } from "antd";

const ManageBoard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const boardMenu = (
    <Menu>
      <Menu.Item key="1" icon={<EditOutlined />}>
        Edit
      </Menu.Item>
      <Menu.Item key="2" icon={<DeleteOutlined />} danger>
        Delete
      </Menu.Item>
    </Menu>
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleAddBoard = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const handleSubmit = (values) => {
    // TODO: Add board creation logic here
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar - Desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Sidebar - Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-30 md:hidden transition-opacity duration-300 ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar - Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 z-50 md:hidden transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "16rem", height: "100vh" }}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full md:ml-64 p-4 sm:p-6">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden mb-4 p-2 rounded bg-white shadow"
          onClick={() => setSidebarOpen(true)}
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Breadcrumb */}
        <div className="mb-2 text-sm text-gray-500 flex items-center gap-2 flex-wrap">
          <button className="text-blue-600 hover:underline">&#60; Back</button>
          <span>/</span>
          <span>Boards</span>
        
         
        </div>

        {/* Header */}
        <div className="rounded-t-lg bg-gradient-to-r from-slate-600 to-gray-400 p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="text-white font-bold text-lg">
              Bachelor's Degree
            </div>
            <div className="flex items-center gap-2 mt-1">
             
              <span className="text-white text-sm">Abinash Shrestha</span>
            </div>
          
          </div>
          <Button icon={<EllipsisOutlined />} />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-4 mb-4 px-1 text-sm">
          <button className="text-blue-700 font-semibold border-b-2 border-blue-700 pb-1">
            Sub-boards{" "}
            <span className="ml-1 bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
              1
            </span>
          </button>
          <button className="text-gray-600">
            Courses{" "}
            <span className="ml-1 bg-gray-200 px-2 py-0.5 rounded text-xs">
              0
            </span>
          </button>
       
          <button className="text-gray-600">
            Users{" "}
            <span className="ml-1 bg-gray-200 px-2 py-0.5 rounded text-xs">
              0
            </span>
          </button>
        </div>

        {/* Board Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Add Board Card */}
          <div
            className="w-full h-40 bg-white border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition"
            onClick={handleAddBoard}
          >
            <span className="text-3xl text-gray-400">+</span>
            <span className="text-gray-500 mt-2">Add board</span>
          </div>

          {/* Board Card */}
          <div className="w-full h-40 bg-white rounded-lg shadow-md p-4 flex flex-col justify-between relative">
            <div>
              <div className="flex justify-between items-start">
                <div className="font-semibold text-gray-800">
                  Bachelor's Degree
                </div>
                <Dropdown overlay={boardMenu} trigger={["click"]}>
                  <Button
                    type="text"
                    icon={<EllipsisOutlined />}
                    className="absolute top-2 right-2"
                  />
                </Dropdown>
              </div>
              <div className="flex items-center gap-2 mt-2">
                
                <span className="text-xs text-gray-600">
                  Abinash Shrestha
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add Board Modal */}
      <Modal
        title="Add board"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ head: "Abinash Shrestha (Admin) (abinash.shrestha@sumsnepal.com)" }}
        >
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter board name" }]}> <Input placeholder="Name" /> </Form.Item>
          <Form.Item label="Head of board" name="head"> <Select> <Select.Option value="Abinash Shrestha (Admin) (abinash.shrestha@sumsnepal.com)">Abinash Shrestha (Admin) (abinash.shrestha@sumsnepal.com)</Select.Option> {/* Add more options as needed */} </Select> </Form.Item>
          <Form.Item label="Parent board" name="parent"> <Select placeholder="Parent board"> <Select.Option value="">None</Select.Option> {/* Add parent board options dynamically */} </Select> </Form.Item>
          <Form.Item label="Description" name="description"> <Input.TextArea placeholder="Description" rows={3} /> </Form.Item>
          <Form.Item> <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded float-right">Submit</button> </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageBoard;
