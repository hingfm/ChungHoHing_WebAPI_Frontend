import "antd/dist/reset.css";
import React from "react";
import EditForm from "./EditForm";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Spin, Row, Col, Card } from "antd";
import { api } from "./common/http-common";
import axios from "axios";
import {
  RollbackOutlined,
  LoadingOutlined,
  CloseOutlined // Changed for better visual representation
} from "@ant-design/icons";
import { getCurrentUser } from "../services/auth.service";

const DetailArticle = () => {
  const currentUser = getCurrentUser();
  const { aid } = useParams();
  const [article, setArticle] = React.useState({
    id: 0,
    title: "",
    alltext: "",
    summary: "",
    imageurl: "",
    authorid: 0,
    description: "",
    region: "",
    kinds: ""
  });
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios.get(`${api.uri}/articles/${aid}`)
      .then((res) => {
        setArticle(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching article details");
      });
  }, [aid]);

  const handleDelete = () => {
    axios.delete(`${api.uri}/articles/${aid}`, {
      headers: { Authorization: `Basic ${localStorage.getItem("aToken")}` },
    }).then(() => {
      alert("This article has been removed.");
      navigate("/");
      window.location.reload();
    }).catch(() => {
      alert("Failed to delete the article. Please check network connectivity.");
    });
  };

  if (loading) {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
    return <Spin indicator={antIcon} />;
  }

  return (
    <Row gutter={24} style={{ marginTop: '50px' }}> {/* Added top margin here */}
      <Col span={10}>
        <img
          alt="Article"
          src={article.imageurl}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </Col>
      <Col span={14}>
        <Card
          title={article.title}
          actions={[
            currentUser &&
            currentUser.role === "admin" &&
            currentUser.id === article.authorid && (
              <EditForm isNew={false} aid={aid} />
            ),
            currentUser &&
            currentUser.region == article.region && (
            <Button icon={<CloseOutlined />} onClick={handleDelete} danger>Delete</Button>
            ),
            <Button icon={<RollbackOutlined />} onClick={() => navigate(-1)}>Back</Button>
          ]}
        >
          <p><strong>About:</strong> {article.alltext}</p>
          <p><strong>Summary:</strong> {article.summary}</p>
          <p><strong>Details:</strong> {article.description}</p>
          <p><strong>Region:</strong> {article.region}</p>
          <p><strong>Breed:</strong> {article.kinds}</p>
        </Card>
      </Col>
    </Row>
  );
};

export default DetailArticle;
