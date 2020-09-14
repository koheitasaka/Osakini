import * as admin from 'firebase-admin';
import key from '../admin-key.json';

const serviceAccount = key as admin.ServiceAccount;

export const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
