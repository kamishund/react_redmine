import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom'
import {
  fetchAsyncDeleteTask,
  selectTasks,
  editTask,
  selectTask,
  selectSelectedTask,
  fetchAsyncGetTasks,
  fetchAsyncGetUsers,
  fetchAsyncGetProject,
  fetchAsyncCreateTask,
  fetchAsyncUpdateTask,
  selectEditedTask,
  selectUsers,
  selectProject,
  selectProgress,
  fetchAsyncCreateProject,
  selectFormOpen,
  selectProOpen,
  tformOpen,
  tproOpen,
  fformOpen,
  fproOpen,
  
} from "../features/task/taskSlice";
import { selectLoginUser, selectProfiles, } from "../features/auth/authSlice";
import { AppDispatch } from "../app/store";
import { initialState } from "../features/task/taskSlice";
import { SORT_STATE, READ_TASK } from "../features/types";
import { ParametricSelector } from "reselect";
import Layout from "../components/Layout"
import Modal from 'react-modal'

const customStyles = {
    content:{
        top:'50%',
        left:'50%',
        right:'auto',
        bottom: 'auto',
        marginRight:'-50%',
        transform:'translate(-50%, -50%)'
      }
}


const TaskList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const tasks = useSelector(selectTasks);
    const profiles = useSelector(selectProfiles);
    const select = useSelector(selectSelectedTask);
    const progress = useSelector(selectProgress);

  //   formn
    const users = useSelector(selectUsers);
    const formOpen = useSelector(selectFormOpen);
    const proOpen = useSelector(selectProOpen);
    const project = useSelector(selectProject);
    const editedTask = useSelector(selectEditedTask);
    const [inputText, setInputText] = useState("");

    const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(e.target.value);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value: string | number = e.target.value;
        const name = e.target.name;
        if (name === "estimate") {
          value = Number(value);
        }
        dispatch(editTask({ ...editedTask, [name]: value }));
      };

      const handleSelectRespChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        const value = e.target.value as number;
        dispatch(editTask({ ...editedTask, responsible: value }));
      };
      const handleSelectStatusChange = (
        e: React.ChangeEvent<{ value: unknown }>
      ) => {
        const value = e.target.value as string;
        dispatch(editTask({ ...editedTask, status: value }));
      };
      const handleSelectProChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        const value = e.target.value as number;
        dispatch(editTask({ ...editedTask, project: value }));
      };

      const handleSelectProgressChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        const value = e.target.value as string;
        dispatch(editTask({ ...editedTask, progress: value }));
      };

      let userOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.username}
        </option>
      ));
      let proOptions = project.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ));

    //   let progressOptions = progress.map((cat) => (
    //     <option key={cat.id} value={cat.id}>
    //       {cat.name}
    //     </option>
    //   ));

  
  
    // const conditionalSrc = (user: number) => {
    //   const loginProfile = profiles.filter(
    //     (prof) => prof.user_profile === user
    //   )[0];
    //   return loginProfile?.img !== null ? loginProfile?.img : `${process.env.REACT_APP_API_URL}/media/default/default.png`;
    // };
  
  
    return (
      <>       
         {/* <button onClick={()=>dispatch(tformOpen())}>Open Modal</button> */}
          <Modal
          isOpen={formOpen}
          onRequestClose={()=>dispatch(fformOpen())}
          style={customStyles}
          >
          <h2>{editedTask.id ? "編集" : "新規追加"}</h2>
          <form>

          <p>日数</p>
          <input 
          value={editedTask.estimate}
          onChange={handleInputChange} 
          name="estimate"
          type="number"
          />

          <p>タイトル</p>
          <input 
           type="text"
           name="task"
           value={editedTask.task}
           onChange={handleInputChange}
          />

          <p>説明</p>
          <input 
            type="text"
            name="description"
            value={editedTask.description}
            onChange={handleInputChange}
          />

        　<p>指示</p>
          <input 
           type="text"
           name="criteria"
           value={editedTask.criteria}
           onChange={handleInputChange}
          />

          <p>担当者</p>
          <select name="responsible"
           onChange={handleSelectRespChange}
           value={editedTask.responsible}>
               {userOptions}
          </select>

          <p>ステータス</p>
          <select 
            name="status"
            value={editedTask.status}
            onChange={handleSelectStatusChange}
           >
            <option value={1}>新規</option>
            <option value={2}>進行中</option>
            <option value={3}>終了</option>
          </select>

          <p>進行度</p>
          <select 
            name="progress"
            value={editedTask.progress}
            onChange={handleSelectProgressChange}
           >
            <option value={0}>0%</option>
            <option value={1}>10%</option>
            <option value={2}>20%</option>
            <option value={3}>30%</option>
            <option value={4}>40%</option>
            <option value={5}>50%</option>
            <option value={6}>60%</option>
            <option value={7}>70%</option>
            <option value={8}>80%</option>
            <option value={9}>90%</option>
            <option value={10}>100%</option>
          </select>

          <p>プロジェクト</p>
          <select name="project"
           onChange={handleSelectProChange}
           value={editedTask.project}>
              {proOptions}
          </select>


              
          </form>
          <button className="mr-4 mt-6 bg-blue-800 text-white p-2 rounded-md" onClick={()=>dispatch(tproOpen())}>NewProject</button>
          <button 
          className="bg-blue-800 text-white p-2 rounded-md"
            onClick={
                editedTask.id !== 0
                  ? () => {dispatch(fetchAsyncUpdateTask(editedTask));dispatch(fformOpen())}
                  : () => {dispatch(fetchAsyncCreateTask(editedTask));dispatch(fformOpen())}
              }
            >
              send
          </button>
                <Modal
                isOpen={proOpen}
                onRequestClose={()=>dispatch(fproOpen())}
                style={customStyles}
                >
                <h2>プロジェクトを追加する</h2>
                <form>
                    <input 
                    type="text"
                    value={inputText}
                    onChange={handleInputTextChange}
                    />
                     <button
                     className="bg-blue-800 text-white p-2 rounded-md"
                        onClick={() => {
                        dispatch(fetchAsyncCreateProject(inputText));
                        }}
                     >
                     SAVE
                    </button>
                </form>
                </Modal>
        
          </Modal>
      </>
    );
  };
  
  export default TaskList;