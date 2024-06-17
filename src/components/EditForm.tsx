import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Modal, Typography, Select } from "antd";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { api } from "./common/http-common";
import { getCurrentUser } from "../services/auth.service";

const { Title } = Typography;
const { TextArea } = Input;

interface EditFormProps {
  isNew: boolean;
  aid?: string; // Article ID is optional if it's a new article creation
}

const EditForm: React.FC<EditFormProps> = ({ isNew, aid }) => {
  const navigate = useNavigate();
  const [articleData, setArticleData] = useState({
    title: "",
    alltext: "",
    summary: "",
    description: "",
    imageurl: "",
  });
  const [regions, setRegions] = useState<Array<any>>([]);
  const [kinds, setKinds] = useState<Array<any>>([]);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    axios.get(`${api.uri}/regions`).then((resp) => {
      setRegions(resp.data);
    });
    axios.get(`${api.uri}/kinds`).then((resp) => {
      setKinds(resp.data);
    });

    if (!isNew && aid) {
      axios.get(`${api.uri}/articles/${aid}`).then((res) => {
        setArticleData(res.data);
      });
    }
  }, [isNew, aid]);

  const handleFormSubmit = (values: any) => {
    const postArticle = { ...values, authorid: getCurrentUser().id };
    const url = `${api.uri}/articles${isNew ? '' : '/' + aid}`;
    const method = isNew ? axios.post : axios.put;

    method(url, postArticle, {
      headers: { Authorization: `Basic ${localStorage.getItem("aToken")}` },
    }).then((res) => {
      alert(`Article ${isNew ? 'created' : 'updated'}`);
      navigate("/");
      window.location.reload();
    }).catch((err) => {
      console.error("Error submitting the article:", err);
      alert("Failed to process the article");
    });
  };

  return (
    <>
      <Button icon={<EditOutlined />} onClick={() => setIsShow(true)} />
      <Modal
        open={isShow}
        onCancel={() => setIsShow(false)}
        title={isNew ? "Create New Article" : "Update Article"}
        footer={[]}
      >
        <Form
          name="article"
          onFinish={handleFormSubmit}
          initialValues={articleData}
        >
          <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please input the title" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="alltext" label="About me" rules={[{ required: true, message: "Please input the article content" }]}>
            <TextArea rows={2} />
          </Form.Item>
          <Form.Item name="summary" label="Summary">
            <TextArea rows={2} />
          </Form.Item>
          <Form.Item name="description" label="Detail Description">
            <TextArea rows={2} />
          </Form.Item>
          <Form.Item name="imageurl" label="ImageURL">
            <Input />
          </Form.Item>
          <Form.Item
            name="region"
            label="Region"
            rules={[{ required: true, message: "Please select your region" }]}
          >
            <Select
              options={regions.map((r) => ({ label: r.region, value: r.region }))}
            />
          </Form.Item>
          <Form.Item name="kinds" label="Kinds">
            <Select
              options={kinds.map((k) => ({ label: k.kind, value: k.kind }))}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditForm;
