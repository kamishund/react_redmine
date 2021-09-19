import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom'
import {
  fetchAsyncDeleteTask,
  selectTasks,
  editTask,
  selectTask,
  fetchAsyncGetTasks,
  fetchAsyncGetProject,
  tformOpen,
  
} from "../task/taskSlice";
import { selectLoginUser} from "../auth/authSlice";
import { AppDispatch } from "../../app/store";
import {  READ_TASK } from "../types";
import Layout from "../../components/Layout"
import Form from "../../components/Form";



interface ParamTypes {
    id: string
  }

const TaskList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const user = useSelector(selectLoginUser);
  const { id} = useParams<ParamTypes>();
  const filted =  tasks.filter((t) => t.id.toString() == id)


  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetTasks());
      await dispatch(fetchAsyncGetProject());

     
    };
    
    fetchBootLoader();
  }, [dispatch]);



  // const conditionalSrc = (user: number) => {
  //   const loginProfile = profiles.filter(
  //     (prof) => prof.user_profile === user
  //   )[0];
  //   return loginProfile?.img !== null ? loginProfile?.img : `${process.env.REACT_APP_API_URL}/media/default/default.png`;
  // };

  const setPut =async (row:READ_TASK)=>{
    await dispatch(selectTask(row));
    await dispatch(editTask(row));
  }


  return (
    <Layout>       
         <div className="max-w-5xl bg-blue-200 mr-auto ml-auto p-12">
         <p className="font-semibold text-3xl"> {filted[0]?.task}</p>
         <p className="mt-4"> 作成者：{filted[0]?.owner_username}</p>
         <p className=""> ステータス：{filted[0]?.status_name}</p>
         <p className=""> 進行度：{filted[0]?.progress_name}</p>
         <p className=""> 対象プロジェクト：{filted[0]?.project_name}</p>
         <p className=""> 日数：{filted[0]?.estimate}日</p>
         <p className=""> 作成日：{filted[0]?.created_at}</p>
         <p className=""> 更新日：{filted[0]?.updated_at}</p>

         <p className="mt-4">説明：{filted[0]?.description}</p>

         <p className="mt-4"> 現在の担当者：{filted[0]?.responsible_username}</p>
         <p className=""> 指示：{filted[0]?.criteria}</p>

        
         
         {
           filted[0]?.owner==user.id&&(
            <div className="flex mt-6">
            <button onClick={()=>{setPut(filted[0]); dispatch(tformOpen());}} className="mr-3 bg-blue-800 text-white p-2 rounded-md">編集</button>
            <button 
                onClick={()=>{ dispatch(fetchAsyncDeleteTask(filted[0]?.id));
                window.location.href = "/tasks";}} 
                className="bg-red-400 text-white p-2 rounded-md"
                >
                消去
            </button>
         </div>
           )
         }

<button onClick={()=>window.location.href = "/tasks"} className="mr-3 bg-blue-800 text-white p-2 rounded-md mt-8">戻る</button>
         
         <Form/>

         

        </div>
    </Layout>
  );
};

export default TaskList;