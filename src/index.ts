import 'dotenv/config';
import {
	FirebaseOptions,
	initializeApp,
	FirebaseApp,
} from "firebase/app";
import { Timestamp, getFirestore, initializeFirestore, addDoc, setDoc, doc, collection } from "firebase/firestore";
import data from "./data/events.json"
import { fb_data } from "./types";

const $config = process.env;

const firebaseConfig: FirebaseOptions = {
	apiKey: $config.GOOGLE_API_KEY,
	authDomain: $config.GOOGLE_AUTH_DOMAIN,
	projectId: $config.GOOGLE_PROJECT_ID,
	storageBucket: $config.GOOGLE_STORAGE_BUCKET,
	messagingSenderId: $config.GOOGLE_MESSAGING_SENDER_ID,
	appId: $config.GOOGLE_APP_ID,
	measurementId: $config.GOOGLE_MEASUREMENT_ID,
};

// Initialize Firebase if it hasn't been already
let firebaseApp: FirebaseApp;

firebaseApp = initializeApp(firebaseConfig);

initializeFirestore(firebaseApp, {
	experimentalForceLongPolling: true,
});

const firestore = getFirestore(firebaseApp);

const collectionRef = collection(firestore, "events");

const run = async () => {
    for (const item of data as fb_data[]) {
        item.start_time = Timestamp.fromDate(new Date(data[0].start_time));
        item.end_time = Timestamp.fromDate(new Date(data[0].end_time));
        await addDoc(collectionRef, item);
    }
}

run();