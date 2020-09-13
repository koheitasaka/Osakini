import * as functions from 'firebase-functions';
import { app } from './admin';
import { IUserInput } from './types';

// // // Start writing Firebase Functions
// // // https://firebase.google.com/docs/functions/typescript
// //

const userExists = (context: functions.https.CallableContext) => {
  return Boolean(context.auth && context.auth.uid);
};

export const createUser = functions.https.onCall(
  async (data: IUserInput, context: functions.https.CallableContext) => {
    if (!userExists(context)) throw new Error('no user');
    try {
      const userRef = app
        .firestore()
        .collection('user')
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
