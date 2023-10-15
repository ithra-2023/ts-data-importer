import { Timestamp } from "firebase/firestore";

interface fb_data {
    entity: string;
    title: string;
    category: string;
    start_time: string;
    end_time: string;
    language: string[];
    city: string;
    area: string;
    ll: string;
}

interface fb_post {
    entity: string;
    title: string;
    category: string;
    start_time: Timestamp;
    end_time: Timestamp;
    language: string[];
    city: string;
    area: string;
    ll: string;
}

export type { fb_data, fb_post };