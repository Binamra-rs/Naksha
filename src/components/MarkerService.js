
import { collection, addDoc, Timestamp, getDocs } from "firebase/firestore";

import { db } from '../firebase'; 

/**
 * * @param {object} markerData 
 * @returns {object} 
 */
const saveMarkerToDB = async (markerData) => {
    try {
        const docRef = await addDoc(collection(db, "markers"), {

            lat: markerData.position.lat,
            long: markerData.position.lng,


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

/**
 * Fetch all markers from Firebase
 * @returns {array} Array of markers with id and data
 */
const fetchMarkersFromDB = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "markers"));
        const markers = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log("Raw marker data from Firebase:", data); 
            
            const lng = data.long !== undefined ? data.long : data.lng;
            
            if (data.lat !== undefined && lng !== undefined) {
                markers.push({
                    id: doc.id,
                    position: {
                        lat: data.lat,
                        lng: lng
                    },
                    type: data.type,
                    desc: data.desc,
                    timestamp: data.timestamp
                });
            } else {
                console.warn("Marker missing coordinates:", data);
            }
        });
        return markers;
    } catch (e) {
        console.error("Error fetching markers: ", e);
        throw new Error("Database fetch failed: " + e.message);
    }
};

export { saveMarkerToDB, fetchMarkersFromDB };
