import admin from 'firebase-admin';

let firestoreInstance = null;

export const getFirestore = () => {
  if (firestoreInstance) {
    return firestoreInstance;
  }

  const {
    FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY,
    FIREBASE_DATABASE_URL
  } = process.env;

  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    return null;
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      }),
      databaseURL: FIREBASE_DATABASE_URL
    });
  }

  firestoreInstance = admin.firestore();
  return firestoreInstance;
};
