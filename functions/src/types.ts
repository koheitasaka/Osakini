export interface IUser {
  name: string;
  position: string;
  team: string;
}

export interface IUserInput {
  name: string;
  position: string;
  team: string;
  id: string;
}

export interface ITask {
  name: string;
  discription: string;
  isCompleted: boolean;
}

export interface ITaskData {
  name: string;
  discription: string;
  isCompleted: boolean;
  id: string;
}
