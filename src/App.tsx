import "antd/dist/reset.css";
import { Layout, Space, Col, FloatButton } from "antd";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//import Landing from "./components/Landing"
import * as AuthService from "./services/auth.service";
import UserT from "./types/user.type";
import Login from "./components/Login";
import Register from "./components/Register";
import EventBus from "./components/common/EventBus";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import About from "./components/About";
import DetailArticle from "./components/DetailArticle";
import Profile from "./components/Profile";
import FavPage from "./components/favpage";
import {
  LogoutOutlined,
  HomeOutlined,
  DashboardOutlined,
  InfoCircleOutlined,
  HeartFilled,
} from "@ant-design/icons";
import Copyright from "./components/Copyright";

const { Header, Content, Footer } = Layout;

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserT | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    EventBus.on("logout", logOut);

    return () => {
      EventBus.remove("logout", logOut);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <Router>
      <Layout className="min-h-100vh flex overflow-hidden">
        <Header className="flex text-white px-4">
          <div className="grow flex gap-4 items-center">
            <Link className="" to={"/"}>
              <img src="/src/assets/the_canine_shelter.png" alt="profile-img" />
            </Link>
            <Link to="/">
              <HomeOutlined className="text-2xl" />
            </Link>
            <Link to="/dashboard">
              <DashboardOutlined className="text-2xl" />
            </Link>
            <Link to="/about">
              <InfoCircleOutlined className="text-2xl" />
            </Link>
          </div>
          <div className="flex">
            {currentUser ? (
              <div>
                {" "}
                <Space>
                  <Link to={"/profile"}>{currentUser.username}</Link>
                  <Link to="/favpage">
                    <HeartFilled style={{ fontSize: "32px" }} />
                  </Link>
                  <a href="/" className="nav-link" onClick={logOut}>
                    {" "}
                    <LogoutOutlined style={{ fontSize: "32px" }} />
                  </a>
                </Space>
              </div>
            ) : (
              <div>
                <Space>
                  <Login />
                  <Link to="/register">Register</Link>
                </Space>
              </div>
            )}
          </div>
        </Header>
        <Content className="min-h-[34rem]">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/:aid" element={<DetailArticle />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/favpage" element={<FavPage />} />
          </Routes>
        </Content>
        <Footer className="flex justify-center items-center">
          <Copyright />
          <img
            className="w-10 h-10"
            src="/src/assets/dog_logo.png"
            alt="profile-img"
          />
        </Footer>
        <FloatButton.BackTop />
      </Layout>
    </Router>
  );
}
