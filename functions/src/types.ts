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

export interface IReport {
  comment: string;
  date: string;
  isSubmited: boolean;
  time: number;
  userId: string;
}

export interface IReportData {
  comment: string;
  date: string;
  id: string;
  isSubmited: boolean;
  time: number;
  userId: string;
}

export interface IDailyTaskData {
  userId: string;
  id: string;
  discription: string;
  name: string;
  time: number;
}

export interface IDailyTask {
  id: string;
  discription: string;
  name: string;
  time: number;
}
