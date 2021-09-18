import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    selectLoginUser,
    selectProfiles,
    fetchAsyncGetMyProf,
    fetchAsyncGetProfs,
    fetchAsyncUpdateProf,
} from "../features/auth/authSlice";

import {
    fetchAsyncGetUsers,
  } from "../features/task/taskSlice";


import { AppDispatch } from "../app/store";

const App: React.FC = ({children}) => {
    const dispatch: AppDispatch = useDispatch();
    const loginUser = useSelector(selectLoginUser);
    const profiles = useSelector(selectProfiles);

    useEffect(() => {
        const fetchBootLoader = async () => {
          await dispatch(fetchAsyncGetMyProf());
          await dispatch(fetchAsyncGetUsers());
          await dispatch(fetchAsyncGetProfs());
        };
        fetchBootLoader();
      }, [dispatch]);

    const loginProfile = profiles.filter(
      (prof) => prof.user_profile === loginUser.id
    )[0];

    const Logout = () => {
        localStorage.removeItem("localJWT");
        window.location.href = "/";
      };

      const handlerEditPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput?.click();
      };
    
  return (
    <>
        <header className="h-24 bg-blue-900 flex items-center text-white px-4">
        <div>
          <p>ログイン中：{loginUser.username}</p>
        </div>
        <div onClick={handlerEditPicture}>
          <img alt="avatar"
               src={loginProfile?.img !== null ? loginProfile?.img : `${process.env.REACT_APP_API_URL}/media/default/default.png` }
               className="h-16 w-16 rounded-full object-cover ml-3 cursor-pointer"
           />
        </div>
        <input
          type="file"
          id="imageInput"
          hidden={true}
          onChange={(e) => {
            dispatch(
              fetchAsyncUpdateProf({
                id: loginProfile.id,
                img: e.target.files !== null ? e.target.files[0] : null,
              })
            );
          }}
        />
        <button className="ml-3" onClick={Logout}>ログアウト</button>
      </header>

      {children}

      
    </>
  );
}

export default App;
