import { CollectionReference, Firestore, Timestamp, getDocs, query, writeBatch } from "firebase/firestore";

export const convertToTimestamp = (dateString: string): Timestamp =>{
    
    const [dateStr, timeStr] = dateString.split(' ');
    const [month, day, year] = dateStr.split('/').map(Number);
    const [hour, minute, second] = timeStr.split(':').map(Number);
    const dateObj = new Date(year, month - 1, day, hour, minute, second);

    console.log(dateString, dateObj, Timestamp.fromDate(dateObj));
    return Timestamp.fromDate(dateObj);
}

// converts to a date only timestamp
export const convertToDate = (dateString: string): Timestamp =>{    
    const [month, day, year] = dateString.split('/').map(Number);
    const dateObj = new Date(year, month - 1, day);
    console.log(dateString, dateObj, Timestamp.fromDate(dateObj));
    return Timestamp.fromDate(dateObj);
}

export const convertToTimeOnly = (timeString: string): string =>{
    const [hour, minute, second] = timeString.split(':').map(Number);
    const dateObj = new Date(0, 0, 0, hour, minute, second);
    console.log(timeString, dateObj);
    return dateObj.toLocaleTimeString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric' });
}

export const deleteCollection = async (firestore: Firestore, collectionRef: CollectionReference) => {
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const batch = writeBatch(firestore);
    querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
    });
    await batch.commit();
}

