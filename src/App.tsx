import React, { useEffect } from "react";

import { useDispatch } from "react-redux";

import {
  fetchAsyncGetTasks,
  fetchAsyncGetProject,

} from "./features/task/taskSlice";


import { AppDispatch } from "./app/store";
import TaskList from "./features/task/taskList";
import Layout from "./components/Layout";
const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();


  // const loginProfile = profiles.filter(
  //   (prof) => prof.user_profile === loginUser.id
  // )[0];

  // const Logout = () => {
  //   localStorage.removeItem("localJWT");
  //   window.location.href = "/";
  // };

  // const handlerEditPicture = () => {
  //   const fileInput = document.getElementById("imageInput");
  //   fileInput?.click();
  // };

  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetTasks());
      await dispatch(fetchAsyncGetProject());
    };
    fetchBootLoader();
  }, [dispatch]);
  return (
    <Layout>
      <TaskList />
    </Layout>
  );
}

export default App;
