import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import {
  getAnalytics,
  Analytics,
  isSupported,
  logEvent as firebaseLogEvent,
} from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp | undefined;
let analytics: Analytics | undefined;

export const initFirebase = (): FirebaseApp => {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  return app;
};

export const initAnalytics = async (): Promise<Analytics | undefined> => {
  if (typeof window === "undefined") return undefined;

  const supported = await isSupported();
  if (!supported) return undefined;

  if (!analytics) {
    const firebaseApp = initFirebase();
    analytics = getAnalytics(firebaseApp);
  }
  return analytics;
};

export const logEvent = async (
  eventName: string,
  eventParams?: Record<string, unknown>,
): Promise<void> => {
  const analyticsInstance = await initAnalytics();
  if (analyticsInstance) {
    firebaseLogEvent(analyticsInstance, eventName, eventParams);
  }
};

export { app, analytics };
