import { CollectionReference, Firestore, Timestamp, getDocs, query, writeBatch } from "firebase/firestore";

export const convertToTimestamp = (dateString: string): Timestamp =>{
    
    const [dateStr, timeStr] = dateString.split(' ');
    const [month, day, year] = dateStr.split('/').map(Number);
    const [hour, minute, second] = timeStr.split(':').map(Number);
    const dateObj = new Date(year, month - 1, day, hour, minute, second);

    console.log(dateString, dateObj, Timestamp.fromDate(dateObj));
    return Timestamp.fromDate(dateObj);
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

