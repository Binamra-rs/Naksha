import { collection, addDoc, Timestamp } from "firebase/firestore";

import { db } from './YOUR_FIREBASE_DB_PATH'; 

/**
 * * @param {object} markerData - Contains position, type, and desc.
 * @returns {object} - Object containing success status and the document ID.
 */
const saveMarkerToDB = async (markerData) => {
    try {
        const docRef = await addDoc(collection(db, "markers"), {
           
            lat: markerData.position.lat,
            lng: markerData.position.lng,
            
            
            type: markerData.type,
            desc: markerData.desc,
            
        
            timestamp: Timestamp.now()
        });
        
        console.log("Document successfully written with ID: ", docRef.id);
        return { success: true, id: docRef.id };
    } catch (e) {
        console.error("Error adding document: ", e);
        
        throw new Error("Database save failed: " + e.message);
    }
};

export { saveMarkerToDB };