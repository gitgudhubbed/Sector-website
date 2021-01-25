import * as functions from 'firebase-functions';
import admin = require('firebase-admin');
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import * as util from 'util';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript


const app = admin.initializeApp();
const fireStore = app.firestore();

export const getEvents_v0 = functions.https.onCall(async (data, context) => {
   //const app = admin.initializeApp();
   //const fireStore = app.firestore();
   const userId = data;
   if (userId) {
      console.log(`getting events for ${userId}`);
      const userDoc = await fireStore.doc(`Users/${userId}`).get();
      const userData = userDoc.data();
      console.log(userData); 
      if(!userData){
         console.log('no Events');
         return [];
      }  
      const userEvents = userData.userEvents;
      const fetchPromises: Promise<DocumentSnapshot> [] = [];
      userEvents.forEach((eventId: String) => {
         console.log(`getting data for event ${eventId}`);
         const nextPromise = fireStore.doc(`Events/${eventId}`).get();
         fetchPromises.push(nextPromise);
      });
      const snapshots = await Promise.all(fetchPromises);
      const responseArray = snapshots.map((snapshot) => { return snapshot.data()});
      console.log('fecthed' + (util.inspect(responseArray)));
      return responseArray;

   } else{
      console.log('No user ID');
      return [];
   }
});

export const getEvents_v1 = functions.https.onCall(async (data, context) => {
   //const app = admin.initializeApp();
   //const fireStore = app.firestore();
   const userId = data.uid;
   if (userId) {
      console.log(`getting events for ${userId}`);
      const userDoc = await fireStore.doc(`Users/${userId}`).get();
      const userData = userDoc.data();
      console.log(userData); 
      if(!userData){
         console.log('no Events');
         return [];
      }  
      const userEvents = userData.userEvents;
      const fetchPromises: Promise<DocumentSnapshot> [] = [];
      userEvents.forEach((eventId: String) => {
         console.log(`getting data for event ${eventId}`);
         const nextPromise = fireStore.doc(`Events/${eventId}`).get();
         fetchPromises.push(nextPromise);
      });
      const snapshots = await Promise.all(fetchPromises);
      const responseArray = snapshots.map((snapshot) => { return snapshot.data()});
      console.log('fecthed' + (util.inspect(responseArray)));
      return responseArray;

   } else{
      console.log('No user ID');
      return [];
   }
});

export const getEvents_old_v0 = functions.https.onRequest(async (request, response) => {
      const userId = request.query.uid;
      //const app = admin.initializeApp();
      //const fireStore = app.firestore();
      if (userId){
         console.log(`getting events for ${userId}`);
         const userDoc = await fireStore.doc(`Users/${userId}`).get();
         const userData = userDoc.data();
         console.log(userData); 
         if(!userData){
            response.send('No events');
            return;
         }  
         const userEvents = userData.userEvents;
         const fetchPromises: Promise<DocumentSnapshot> [] = [];
         userEvents.forEach((eventId: String) => {
            console.log(`getting data for event ${eventId}`);
            const nextPromise = fireStore.doc(`Events/${eventId}`).get();
            fetchPromises.push(nextPromise);
         });
         const snapshots = await Promise.all(fetchPromises);
         const responseArray = snapshots.map((snapshot) => { return snapshot.data()});
         response.send('fecthed' + (util.inspect(responseArray)));
   
      } else{
         response.send('Check logs');
      }
});
