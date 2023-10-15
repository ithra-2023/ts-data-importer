import { Timestamp } from "firebase/firestore";

interface fb_data {
    entity: string;
    title: string;
    category: string;
    start_time: string | number | Timestamp;
    end_time: string | number | Timestamp;
    language: string[];
    city: string;
    area: string;
    ll: string;
}

export type { fb_data };