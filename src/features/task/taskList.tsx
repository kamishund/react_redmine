import React, { useState, useEffect ,memo} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncDeleteTask,
  selectTasks,
  editTask,
  selectTask,
} from "./taskSlice";
import { selectLoginUser, selectProfiles } from "../auth/authSlice";
import { AppDispatch } from "../../app/store";
import { 
  initialState , 
  tformOpen,
  tproOpen,
  fformOpen,
  fproOpen
} from "./taskSlice";
import { SORT_STATE, READ_TASK } from "../types";
import Form from "../../components/Form";
const TaskList: React.FC =memo( () => {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const loginUser = useSelector(selectLoginUser);
  const profiles = useSelector(selectProfiles);
  const columns = tasks[0] && Object.keys(tasks[0]);
  const [state, setState] = useState<SORT_STATE>({
    rows: tasks,
    order: "desc",
    activeKey: "",
  });

  const handleClickSortColumn = (column: keyof READ_TASK) => {
    const isDesc = column === state.activeKey && state.order === "desc";
    const newOrder = isDesc ? "asc" : "desc";
    const sortedRows = Array.from(state.rows).sort((a, b) => {
      if (a[column] > b[column]) {
        return newOrder === "asc" ? 1 : -1;
      } else if (a[column] < b[column]) {
        return newOrder === "asc" ? -1 : 1;
      } else {
        return 0;
      }
    });

    setState({
      rows: sortedRows,
      order: newOrder,
      activeKey: column,
    });
  };

  useEffect(() => {
    setState((state) => ({
      ...state,
      rows: tasks,
    }));
  }, [tasks]);


  const conditionalSrc = (user: number) => {
    const loginProfile = profiles.filter(
      (prof) => prof.user_profile === user
    )[0];
    return loginProfile?.img !== null ? loginProfile?.img : `${process.env.REACT_APP_API_URL}/media/default/default.png`;
  };

  const renderSwitch = (statusName: string) => {
    switch (statusName) {
      case "Not started":
        return (
          <span className="">
            {statusName}
          </span>
        );
      case "On going":
        return (
          <span className="">
            {statusName}
          </span>
        );
      case "Done":
        return (
          <span className="">
            {statusName}
          </span>
        );
      default:
        return (
            <span className="">
              {statusName}
            </span>
          );
    }
  };

  return (
    <>
    <div className="text-center "> 
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-auto ml-auto my-8 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" 
        onClick={() => {
          dispatch(
            editTask({
              id: 0,
              task: "",
              description: "",
              criteria: "",
              responsible: loginUser.id,
              status: "1",
              project: 1,
              progress:"0",
              estimate: 0,
            })
          );
          dispatch(selectTask(initialState.selectedTask));
          dispatch(tformOpen());

          
        }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
     </svg>
    </div>

    {tasks[0]?.task && (
        <table className="table-auto mr-auto ml-auto">
            <thead className="bg-blue-400">
                <tr>
                {columns.map((column, colIndex)=>
                    (column === "task" ||
                    column === "status" ||
                    column === "project_name" ||
                    column === "progress" ||
                    column === "estimate" ||
                    column === "responsible" ||
                    column === "owner") &&(
                        <th key={colIndex} onClick={() => handleClickSortColumn(column)} className="px-4 py-2 cursor-pointer border">
                            {column}
                        </th>
                    )
                )}
                </tr>
            </thead>
            <tbody>
            {state.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {Object.keys(row).map(
                  (key, colIndex) =>
                    (key === "task" ||
                      key === "status_name" ||
                      key === "project_name" ||
                      key === "progress_name" ||
                      key === "estimate") && (
                      <td
                        className="px-4 py-2 border cursor-pointer"
                        key={`${rowIndex}+${colIndex}`}
                        onClick={() => {
                          // dispatch(selectTask(row));
                          // dispatch(editTask(initialState.editedTask));
                          window.location.href = `tasks/${row.id}`;
                        }}
                      >
                        {key === "status_name" ? (
                          renderSwitch(row[key])
                        ) : (
                          <span>{row[key]}</span>
                        )}
                      </td>
                    )
                )}
                    <td className="px-4 py-2 border cursor-pointer">
                        <img src={conditionalSrc(row["responsible"])} alt="" className="h-10 w-10 rounded-full object-cover cursor-pointer"/>
                        {row["responsible_username"]}
                    </td>
                    <td className="px-4 py-2 border cursor-pointer">
                        <img src={conditionalSrc(row["owner"])} alt="" className="h-10 w-10 rounded-full object-cover cursor-pointer"/>
                        {row["owner_username"]}
                    </td>
                </tr>

            ))}
            </tbody>
        </table>
    )}

    <Form />
    </>
  );
});

export default TaskList;