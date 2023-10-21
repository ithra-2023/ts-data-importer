import { Timestamp } from "firebase/firestore";

interface fb_data {
    entity: string;
    title: string;
    category: string;
    start_date: string;
    end_date: string;
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
    start_date: Timestamp;
    end_date: Timestamp;
    start_time: string;
    end_time: string;
    language: string[];
    city: string;
    area: string;
    ll: string;
}

export type { fb_data, fb_post };