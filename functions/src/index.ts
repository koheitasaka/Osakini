import * as functions from 'firebase-functions';
import { app } from './admin';
import { ITask, ITaskData, IUser, IUserInput } from './types';

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
