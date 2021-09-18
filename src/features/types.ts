/*authSlice.ts*/
export interface LOGIN_USER {
    id: number;
    username: string;
  }
  export interface FILE extends Blob {
    readonly lastModified: number;
    readonly name: string;
  }
  export interface PROFILE {
    id: number;
    user_profile: number;
    img: string | null;
  }
  export interface POST_PROFILE {
    id: number;
    img: File | null;
  }
  export interface CRED {
    username: string;
    password: string;
  }
  export interface JWT {
    refresh: string;
    access: string;
  }
  export interface USER {
    id: number;
    username: string;
  }
  export interface AUTH_STATE {
    isLoginView: boolean;
    loginUser: LOGIN_USER;
    profiles: PROFILE[];
  }
  /*taskSlice.ts*/
  export interface READ_TASK {
    id: number;
    task: string;
    description: string;
    criteria: string;
    status: string;
    status_name: string;
    project: number;
    project_name: string;
    progress: string;
    progress_name: string;
    estimate: number;
    responsible: number;
    responsible_username: string;
    owner: number;
    owner_username: string;
    created_at: string;
    updated_at: string;
  }
  export interface POST_TASK {
    id: number;
    task: string;
    description: string;
    criteria: string;
    status: string;
    estimate: number;
    responsible: number;
    project:number,
    progress: string,
    
  }
  export interface PROJECT {
    id: number;
    name: string;
  }
  export interface TASK_STATE {
    tasks: READ_TASK[];
    editedTask: POST_TASK;
    selectedTask: READ_TASK;
    users: USER[];
    project: PROJECT[];
    progress:PROJECT[];
    formOpen:boolean,
    proOpen:boolean,

  }
  /*TaskList.tsx*/
  export interface SORT_STATE {
    rows: READ_TASK[];
    order: "desc" | "asc";
    activeKey: string;
  }