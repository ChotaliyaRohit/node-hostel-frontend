"use client";

import { Form, Input, Button, DatePicker, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { useState } from "react";
import dayjs from "dayjs";

export default function AddStudentPage() {
  const [adharFile, setAdharFile] = useState<UploadFile | null>(null);
  const [studentFile, setStudentFile] = useState<UploadFile | null>(null);
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("dob", values.dob.format("YYYY-MM-DD"));

      if (adharFile?.originFileObj) {
        formData.append("adhar", adharFile.originFileObj);
      }
      if (studentFile?.originFileObj) {
        formData.append("student", studentFile.originFileObj);
      }

      const res = await fetch("/api/student/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        message.success("Student added successfully!");
        form.resetFields();
        setAdharFile(null);
        setStudentFile(null);
      } else {
        message.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to save student.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add Student</h1>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Student Name"
          name="name"
          rules={[{ required: true, message: "Please enter student name" }]}
        >
          <Input placeholder="Enter student name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Invalid email format" },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          name="dob"
          rules={[{ required: true, message: "Please select DOB" }]}
        >
          <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item label="Adhar Card" required>
          <Upload
            beforeUpload={() => false}
            maxCount={1}
            fileList={adharFile ? [adharFile] : []}
            onChange={({ file }) => setAdharFile(file)}
          >
        <Button>
            <UploadOutlined style={{ marginRight: 8 }} />
            Upload Adhar Card
        </Button>

          </Upload>
        </Form.Item>

        <Form.Item label="Student Photo" required>
          <Upload
            beforeUpload={() => false}
            maxCount={1}
            fileList={studentFile ? [studentFile] : []}
            onChange={({ file }) => setStudentFile(file)}
          >
            <Button icon={<UploadOutlined />}>Upload Student Photo</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
