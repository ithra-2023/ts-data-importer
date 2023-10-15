import 'dotenv/config';

import {
	FirebaseOptions,
	initializeApp,
	FirebaseApp,
} from "firebase/app";

import { 
	getFirestore, 
	initializeFirestore, 
	addDoc, 
	collection
} from "firebase/firestore";

import data from "./data/events.json"

import { fb_data, fb_post } from "./types";

import { convertToTimestamp, deleteCollection } from "./utils";

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
	await deleteCollection(firestore, collectionRef);
	let target_object: fb_post;
    for (const item of data as fb_data[]) {
		target_object = {
			entity: item.entity,
			title: item.title,
			category: item.category,
			start_time: convertToTimestamp(item.start_time.toString()),
			end_time: convertToTimestamp(item.end_time.toString()),
			language: item.language,
			city: item.city,
			area: item.area,
			ll: item.ll
		};
        await addDoc(collectionRef, target_object);
    }
	process.exit();
}

run();