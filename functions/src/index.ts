import * as functions from 'firebase-functions';
import { app } from './admin';
import {
  IDailyTaskData,
  IReport,
  ITask,
  ITaskData,
  IUser,
  IUserInput,
} from './types';

// utils
const userExists = (context: functions.https.CallableContext) => {
  return Boolean(context.auth && context.auth.uid);
};

// User
export const insertUser = functions.https.onCall(
  async (data: IUser, context: functions.https.CallableContext) => {
    if (!userExists(context)) throw new Error('no user');
    try {
      const userRef = app
        .firestore()
        .collection('users')
        .doc(data.name);
      await userRef.set({
        name: data.name,
        position: data.position,
        team: data.team,
      });
      return 'success';
    } catch (error) {
      return error.message;
    }
  },
);

export const updateUser = functions.https.onCall(
  async (data: IUserInput, context: functions.https.CallableContext) => {
    if (!userExists(context)) throw new Error('no user');
    try {
      const userRef = app
        .firestore()
        .collection('users')
        .doc(data.id);
      await userRef.set({
        name: data.name,
        position: data.position,
        team: data.team,
      });
      return 'success';
    } catch (error) {
      return error.message;
    }
  },
);

export const fetchUser = functions.https.onCall(
  async (uid: string, context: functions.https.CallableContext) => {
    if (!userExists(context)) throw new Error('no user');
    try {
      const userRef = await app
        .firestore()
        .collection('users')
        .doc(uid)
        .get();
      if (userRef.exists) {
        return userRef.data();
      } else {
        return {
          name: uid,
          position: '未設定',
          team: '未設定',
        };
      }
    } catch (error) {
      console.log('エラー');
      return error.message;
    }
  },
);

// Task
export const insertTask = functions.https.onCall(
  async (data: ITask, context: functions.https.CallableContext) => {
    if (!userExists(context)) throw new Error('no user');
    try {
      await app
        .firestore()
        .collection('tasks')
        .add(data);
      return 'success';
    } catch (error) {
      console.log(error.message);
      return 'error';
    }
  },
);

export const fetchTasks = functions.https.onCall(
  async (data: any, context: functions.https.CallableContext) => {
    if (!userExists(context)) throw new Error('no user');
    try {
      const tasksRef = await app
        .firestore()
        .collection('tasks')
        .get();

      const tasks = tasksRef.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        discription: doc.data().discription,
        isCompleted: doc.data().isCompleted,
      }));
      return tasks;
    } catch (error) {
      console.log(error.message);
      return 'error';
    }
  },
);

export const fetchTask = functions.https.onCall(
  async (id: string, context: functions.https.CallableContext) => {
    if (!userExists(context)) throw new Error('no user');
    try {
      const taskRef = app
        .firestore()
        .collection('tasks')
        .doc(id)
        .get();
      const task = (await taskRef).data() as ITask;
      return task;
    } catch (error) {
      console.log(error.message);
      return 'error';
    }
  },
);

export const updateTask = functions.https.onCall(
  async (data: ITaskData, context: functions.https.CallableContext) => {
    if (!userExists(context)) throw new Error('no user');
    try {
      const tasksRef = app
        .firestore()
        .collection('tasks')
        .doc(data.id);
      await tasksRef.set({
        name: data.name,
        discription: data.discription,
        isCompleted: data.isCompleted,
      });
      return 'success';
    } catch (error) {
      console.log(error.message);
      return 'error';
    }
  },
);

export const deleteTask = functions.https.onCall(
  async (id: string, context: functions.https.CallableContext) => {
    if (!userExists(context)) throw new Error('no user');
    try {
      await app
        .firestore()
        .collection('tasks')
        .doc(id)
        .delete();
      return 'success';
    } catch (error) {
      console.log(error.message);
      return 'error';
    }
  },
);

// Report
export const insertReport = functions.https.onCall(
  async (data: IReport, context: functions.https.CallableContext) => {
    if (!userExists(context)) throw new Error('no user');
    try {
      const reportRef = app
        .firestore()
        .collection('reports')
        .doc();
      const report = {
        ...data,
        date: new Date(data.date),
      };
      await reportRef.set(report);
      return 'success';
    } catch (error) {
      console.log(error.message);
      return 'error';
    }
  },
);

export const fetchReports = functions.https.onCall(
  async (data: any, context: functions.https.CallableContext) => {
    if (!userExists(context)) throw new Error('no user');
    try {
      const reportsRef = await app
        .firestore()
        .collection('reports')
        .get();
      const reports = reportsRef.docs.map(doc => ({
        id: doc.id,
        comment: doc.data().comment,
        date: doc.data().date,
        isSubmited: doc.data().isSubmited,
        time: doc.data().time,
        userId: doc.data().userId,
      }));
      return reports;
    } catch (error) {
      console.log(error.message);
      return 'error';
    }
  },
);

// DailyTask
export const insertDailyTask = functions.https.onCall(
  async (data: IDailyTaskData, context: functions.https.CallableContext) => {
    if (!userExists(context)) throw new Error('no user');
    try {
      const collectinoPath = `users/${data.userId}/daily-tasks`;
      const dailyTaskRef = app
        .firestore()
        .collection(collectinoPath)
        .doc();
      await dailyTaskRef.set(data);
      return 'success';
    } catch (error) {
      console.log(error.message);
      return 'error';
    }
  },
);
