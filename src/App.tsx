import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import About from "./pages/About";
import Info from "./pages/Info";
import Dictio from "./pages/Dictio";
import Login from "./pages/Login";
import Layout from "./layout/index";
import { RootStore } from "./store/modules/reducer";
// import { AppDispatch } from "./store/index";
// import { getUserData } from "./store/modules/data_action/user";
import "./index.css";

function App() {
  // const dispatch:AppDispatch = useDispatch();
  const user = useSelector((state: { base: RootStore }) => {
    return state.base.user.user;
  });

  // function setUserData(){
  //   const token:(string|null) = localStorage.getItem('token');
  //   if(token !== null){
  //     dispatch(getUserData(token));
  //   }
  // }

  return (
    <>
      <Routes>
        {/* <Route path="/login" element={user.id === 0 ?<Layout><Login /></Layout> : <Navigate to="/" replace />} />
        <Route path="/" element={user.id !== 0 ?<Layout><Home /></Layout>:<Navigate to="/login" replace />} />
        <Route path="/" element={user.id !== 0 ?<Layout><Home /></Layout>:<Navigate to="/login" replace />} />
        <Route path="/about" element={user.id !== 0 ?<Layout><About /></Layout>:<Navigate to="/login" replace />} />
        <Route path="/info" element={user.id !== 0 ?<Layout><Info /></Layout>:<Navigate to="/login" replace />} /> */}
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/info"
          element={
            <Layout>
              <Info />
            </Layout>
          }
        />
        <Route
          path="/dictio"
          element={
            <Layout>
              <Dictio />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
